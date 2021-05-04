import React from 'react'
import MovingText from 'react-moving-text'
 
const MovingInstructions = () => {
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
      <b>&uarr; Enter</b> one of your <b>receiving address</b> to see your <b>rewards</b>.
      <br/>
      Below are the rewards of a Random wallet &darr; 
    </MovingText>
  )
}

export default MovingInstructions
