import React, {useEffect, useState, useCallback} from 'react'
import styled, {keyframes} from 'styled-components'
import config from '../config/gameConfig'
import {useObjects, useOnFrameReload} from '../hooks'

export default function PacMan(props) {
  const [deg, setDeg] = useState(0)
  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)
  const [direction, setDirection] = useState('')
  const objects = useObjects('PacMan')
  let prevKey = 0
  const {speed, height, width, PacManSize} = config

  useEffect(()=>{
    let pacMan = objects.getObject('PacMan')
    pacMan.height = 30
    pacMan.weight = 30
    document.addEventListener('keydown', keydown)
    return () => {
      document.removeEventListener('keydown', keydown)
    }
  },[])

  useEffect(()=>{
    rotate()
  },[direction])

  useOnFrameReload(()=>{
    move()
    borderCollisionDetect()
  })

  const rotate = () => {
    switch(direction){
      case 'right': setDeg(0); break;
      case 'left': setDeg(180);break;
      case 'up': setDeg(270);break;
      case 'down': setDeg(90);break;
      default: break;
    }
  }

  const keydown = (event) => {
    if(prevKey === event.keyCode) return;
    switch(event.keyCode){
      case 37: setDirection('left'); break
      case 38: setDirection('up'); break
      case 39: setDirection('right'); break
      case 40: setDirection('down'); break
      case 32: setDirection(null); break
      default: break;
    }
    prevKey = event.keyCode
  }

  const move = useCallback(() => {
    switch(direction){
      case 'left': setLeft(left => left-speed); objects.getObject('PacMan').left = left; break;
      case 'right': setLeft(right => right+speed); objects.getObject('PacMan').left = left; break;
      case 'up': setTop(top=>top-speed); objects.getObject('PacMan').top = top; break;
      case 'down': setTop(top=>top+speed); objects.getObject('PacMan').top = top; break;
      default: break
    }
  },[top, left, direction])

  const borderCollisionDetect = useCallback(() => {
    if(top < 0) setDirection('down')
    if(left < 0) setDirection('right')
    if(height-PacManSize <= top) setDirection('up')
    if(width-PacManSize <= left) setDirection('left')
    prevKey=0
  },[top,left])

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



