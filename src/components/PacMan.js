import React, {useEffect, useState} from 'react'
import styled, {keyframes} from 'styled-components'

export default function PacMan(props) {
  const [deg, setDeg] = useState(0)

  useEffect(()=>{
    switch(props.direction){
      case 'right': setDeg(0); break;
      case 'left': setDeg(180);break;
      case 'up': setDeg(270);break;
      case 'down': setDeg(90);break;
      default: break;
    }
  },[props.direction])

  return (
    <Container {...props} deg={deg}>
      <PacManTop />
      <PacManBottom />
    </Container>
  )
}
const Container = styled.div.attrs(props=>({
  style: {
    top: props.top,
    left: props.left,
  transform: `rotate(${props.deg}deg)`
  }
}))`
  position: absolute;
  z-index: 2;
`
const spin1 = keyframes`
	0%  {transform: rotate(0deg);}
	50% {transform: rotate(-35deg);}
`
const spin2 = keyframes`
	0%  {transform: rotate(0deg);}
	50% {transform: rotate(35deg);}
`
const PacManTop = styled.div`
  background-color: yellow;
  height: 15px;
  width: 30px;
  border-radius: 15px 15px 0 0;
  animation: ${spin1} 0.5s infinite linear;
`
const PacManBottom = styled.div`
  background-color: yellow;
  height: 15px;
  width: 30px;
  border-radius: 0 0 15px 15px;
  animation: ${spin2} 0.5s infinite linear;
`



