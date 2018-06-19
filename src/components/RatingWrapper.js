import React from 'react'
import './Rating.css'
 const RatingWrapper=  ({children}) => {
  return (
    <div className="rating-wrapper">
      {children}
    </div>
  )
}
export default RatingWrapper;
