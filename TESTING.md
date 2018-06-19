# Testing Guide


Since the codebase is cleanly separated into various parts like Style Guide presentational components, reducers, action creators, containers, pages etc., we now have the ability to test each part in isolation. 

We'll go over the different kinds of testing and how it applies.

## Unit Testing Reducers & Action Creators

Since reducers and action creators are just plain functions, we can test them in isolation by providing some sample arguments to the functions, and asserting that the outputs are as expected.

As an example, let us consider ther reducer `entityList`. This reducer, and related action creators are located in the file `src/app/common/reducers/entityList.js`. Here are the contents of the file:

```javascript
export const SET_ENTITY_LIST = "@app/common/SET_ENTITY_LIST";
export const CLEAR_ENTITY_LIST = "@app/common/CLEAR_ENTITY_LIST";

const entityList = (state = [], { type, payload }) => {
  switch (type) {
    case SET_ENTITY_LIST:
      return payload;
    case CLEAR_ENTITY_LIST:
      return [];
    default:
      return state;
  }
};

export default entityList;

export const setEntityList = list => ({
  type: SET_ENTITY_LIST,
  payload: list
});

export const clearEntityList = () => ({
  type: CLEAR_ENTITY_LIST
});
```

Let's create a folder `__tests__` inside `src/app/common/reducers`. This folder will contain all test files for the source files under `src/app/common/reducers`. Inside `__tests__`, we'll create a file `entityList.test.js`, which will contain the test cases for the functions in `entityList.js`. This pattern will be followed across the application. Test files will be colocated with the source files, inside a folder called `__tests__`, and will have the same name as the source file, but with the extension `.test.js`, instead of `.js`.

We'll start by writing test cases for the action creators `setEntityList` and `clearEntityList`. First, let's import the required functions and create some sample data.

```javascript
import entityList, {
  setEntityList,
  clearEntityList,
  SET_ENTITY_LIST,
  CLEAR_ENTITY_LIST
} from "../entityList";

const sampleEntities = [
  { id: 1, name: 'Entity 1' },
  { id: 2, name: 'Entity 2' },
  { id: 3, name: 'Entity 3' },
];
```

Now, let's save the file and run the command `npm run test`. It should show the following error:

```
 FAIL  src/app/common/reducers/__tests__/entityList.test.js
  ● Test suite failed to run

    Your test suite must contain at least one test.
```

This is because we haven't added any tests yet. Let's add a test case for `setEntityList`:

```javascript
describe("setEntityList", () => {
  it("creates an action with type SET_ENTITY_LIST", () => {
    expect(setEntityList(sampleEntities)).toEqual({});
  });
});
```

Every test file follows the above structure: there are one or more `describe` blocks, one for each function or React component, and several `it` blocks, one for each test case. Assertions are tested using the `expect` function provided by Jest.

As soon as we save the file with the new changes, the terminal output changes to the following:
```
 FAIL  src/app/common/reducers/__tests__/entityList.test.js
  ● setEntityList › creates an action with type SET_ENTITY_LIST

    expect(received).toEqual(expected)

    Expected value to equal:
      {}
    Received:
      {"payload": [{"id": 1, "name": "Entity 1"}, {"id": 2, "name": "Entity 2"}, {"id": 3, "name": "Entity 3"}], "type": "@app/common/SET_ENTITY_LIST"}

    Difference:

    - Expected
    + Received

    -Object {}
    +Object {
    +  "payload": Array [
    +    Object {
    +      "id": 1,
    +      "name": "Entity 1",
    +    },
    +    Object {
    +      "id": 2,
    +      "name": "Entity 2",
    +    },
    +    Object {
    +      "id": 3,
    +      "name": "Entity 3",
    +    },
    +  ],
    +  "type": "@app/common/SET_ENTITY_LIST",
    +}
```

Our test failed, and the output shows us exactly why: the output of `setEntityList(sampleEntities)` does not match the expected output, which we have currently set to `{}`. This is fine, because the expected output should actually be an action with type `SET_ENTITY_LIST` and payload `sampleEntities`. 

Let's update the test case to test for the right output:

```javascript
describe("setEntityList", () => {
  it("creates an action with type SET_ENTITY_LIST", () => {
    const expectedOutput = {
      type: SET_ENTITY_LIST,
      payload: sampleEntities
    };
    expect(setEntityList(sampleEntities)).toEqual(expectedOutput);
  });
});
```

Upon the saving the file, the terminal output changes to show that the test has passed. With this, we have successfully unit-tested the action creator `setEntityList`, and we can be confident that it will work correctly wherever it is used.

Similar to `setEntityList`, we can write a test case to ensure that the action creator `clearEntityList` is working properly:

```javascript
describe("clearEntityList", () => {
  it("creates an action with type CLEAR_ENTITY_LIST", () => {
    const expectedOutput = {
      type: CLEAR_ENTITY_LIST
    };
    expect(clearEntityList()).toEqual(expectedOutput);
  });
});
```

We have successfully verified that the action creators `setEntityList` and `clearEntityList` are working properly. We can now use them to test the reducer `entityList` as follows:

```javascript
describe("entityList", () => {
  it("sets the initial state to []", () => {
    const initialState = entityList(undefined, { type: 'DOESNT_MATTER' });
    expect(initialState).toEqual([]);
  });

  it("sets the list of entities using SET_ENTITY_LIST", () => {
    const action = setEntityList(sampleEntities);
    expect(entityList([], action)).toEqual(sampleEntities);
  });

  it("clears the list of entities using CLEAR_ENTITY_LIST", () => {
    const action = clearEntityList();
    expect(entityList(sampleEntities, action)).toEqual([]);
  });
});
```

Unlike `setEntityList` and `clearEntityList`, we needed three test cases to test the behavior of `entityList`. We could have put all three assertions inside a single `it` block, but that would make for a poor test case. A unit test should test exactly one behavior. When the test fails, it should be immediately clear what went wrong.

Now we have a comprehensive test suite for the reducer `entityList` and related action creators. We'll follow this approach for writing unit tests across the codebase. Here is the summary:

1. Create one test file for every source file. Place it in the directory `__tests__` next to the source file, and give it the extension `.test.js`.

2. Create one `describe` block for each function or React component being tested. Inside each `describe` block, create several `it` blocks, one for each test case.

3. Run `npm run test` to view the test results in real time. Tests are automatically re-run every time any file is modified and saved.

3. Inside `it` blocks, test assertions using `expect` and matchers like `toEqual`. First, write failing assertions to verify that the test case is actually being executed, then fix it to make the test pass.

Apart from testing reducers and action creators, unit tests can also be used to test any standalone or utility functions that are pure i.e. functions that do not have any side effects (like modifying global variables, making network requests, modifying local storage).