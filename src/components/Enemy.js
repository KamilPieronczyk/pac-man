import React, {memo, useState,useEffect} from 'react'
import styled from 'styled-components'
import config from '../config/gameConfig'

export default memo((props) => {
  const directions = ['left', 'right', 'up', 'down']
  let direction = ''
  const [top, setTop] = useState(Math.floor((Math.random() * 690) / 30)*30)
  const [left, setLeft] = useState(Math.floor((Math.random() * 1170) / 30)*30)
  let lTop = top
  let lLeft = left
  const {height, width, PacManSize} = config
  const speed = 3
  useEffect(()=>{
    props.subscribe(()=>{
      move()
      borderCollisionDetect()
    })
    changeDirection()
  },[direction])

  const randomDirection = () => {
    return directions[Math.floor(Math.random()*4-0.01)]
  }

  const changeDirection = () => {
    direction = randomDirection()
    setTimeout(() => {
      changeDirection()
    }, Math.floor(Math.random()*10000));
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
  }

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
