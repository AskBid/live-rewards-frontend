import React from 'react'
import MovingText from 'react-moving-text'
 
const MovingInstructions = ({textElement}) => {

  return (
    <MovingText
      type="shakeVertical"
      duration="8000ms"
      delay="2s"
      direction="normal"
      timing="linear"
      iteration="5"
      fillMode="none"
      className='w-100 text-primary text-center position-absolute'
      style={{fontSize:'0.8em'}}>
      {textElement}
    </MovingText>
  )
}

export default MovingInstructions
