import React from 'react'
import "./Rating.css"
 const Rating = ({source,value}) => {
  return (
    <div className="rating">
      <div className="rating-value">{value}</div>
      <div className="rating-factor-name">{source}</div>
    </div>
  )
}

export default Rating;
