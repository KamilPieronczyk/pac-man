import React, {useEffect, useState} from 'react'
import styled, {keyframes} from 'styled-components'
import config from '../config/gameConfig'

export default function PacMan(props) {
  const [deg, setDeg] = useState(0)
  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)
  let direction = 'right'
  let prevKey = 0
  let lTop = top
  let lLeft = left
  const {speed, height, width, PacManSize} = config

  useEffect(()=>{
    document.addEventListener('keydown', keydown)
    switch(direction){
      case 'right': setDeg(0); break;
      case 'left': setDeg(180);break;
      case 'up': setDeg(270);break;
      case 'down': setDeg(90);break;
      default: break;
    }
    console.log('deg')
    props.subscribe(()=>{
      borderCollisionDetect()
      move()
    })
    return () => {
      document.removeEventListener('keydown', keydown)
    }
  },[direction])

  const keydown = (event) => {
    if(prevKey === event.keyCode) return;
    switch(event.keyCode){
      case 37: direction = 'left'; break
      case 38: direction = 'up'; break
      case 39: direction = 'right'; break
      case 40: direction = 'down'; break
      case 32: direction = null; break
      default: break;
    }
    prevKey = event.keyCode
  }

  const move = () => {
    switch(direction){
      case 'left': setLeft(left => left-speed); lLeft = lLeft - speed; break;
      case 'right': setLeft(right => right+speed); lLeft = lLeft + speed; break;
      case 'up': setTop(top=>top-speed); lTop = lTop - speed; break;
      case 'down': setTop(top=>top+speed); lTop = lTop + speed; break;
      default: break
    }
  }

  const borderCollisionDetect = () => {
    if(lTop < 0) direction = 'down'
    if(lLeft < 0) direction = 'right'
    if(height-PacManSize <= lTop) direction = 'up'
    if(width-PacManSize <= lLeft) direction = 'left'
    prevKey=0
  }

  return (
    <Container {...props} deg={deg} style={{top, left}}>
      <PacManTop />
      <PacManBottom />
    </Container>
  )
}
const Container = styled.div.attrs(props=>({
  style: {
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



