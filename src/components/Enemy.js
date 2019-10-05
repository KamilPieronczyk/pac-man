import React, {memo, useState,useEffect, useCallback} from 'react'
import {useObjects, useOnFrameReload} from '../hooks'
import styled from 'styled-components'
import config from '../config/gameConfig'

export default memo((props) => {
  const directions = ['left', 'right', 'up', 'down']
  const name = 'Ghost' + props.id
  const objects = useObjects(name, 'Ghosts')
  const [top, setTop] = useState(Math.floor((Math.random() * 690) / 30)*30)
  const [left, setLeft] = useState(Math.floor((Math.random() * 1170) / 30)*30)
  const [direction, setDirection] = useState('')
  const {height, width, PacManSize} = config
  const speed = 3

  useEffect(()=>{
    changeDirection()
  },[])

  useOnFrameReload(()=>{
    move()
    borderCollisionDetect()
  })

  const randomDirection = () => {
    return directions[Math.floor(Math.random()*4-0.01)]
  }

  const changeDirection = () => {
    setDirection(randomDirection())
    setTimeout(() => {
      changeDirection()
    }, Math.floor(Math.random()*10000));
  }

  const move = useCallback(() => {
    switch(direction){
      case 'left': setLeft(left => left-speed); objects.getObject(name, 'Ghosts').left = left; break;
      case 'right': setLeft(right => right+speed); objects.getObject(name, 'Ghosts').left = left; break;
      case 'up': setTop(top=>top-speed); objects.getObject(name, 'Ghosts').top = top; break;
      case 'down': setTop(top=>top+speed); objects.getObject(name, 'Ghosts').top = top; break;
      default: break
    }
  },[top,left,direction])

  const borderCollisionDetect = useCallback(() => {
    if(top < 0) setDirection('down')
    if(left < 0) setDirection('right')
    if(height-PacManSize <= top) setDirection('up')
    if(width-PacManSize <= left) setDirection('left')
  },[top, left])

  return (
    <Container style={{top, left}} color={props.color} />
  )
})

const Container = styled.div`
  position: absolute;
  display: block;
  height: 30px;
  width: 30px;
  border-radius: 15px 15px 0 0;
  background-color: ${props => props.color};
  z-index: 2;
`
