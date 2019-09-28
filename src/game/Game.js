import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import PacMan from '../components/PacMan'
import DotsTable from '../components/DotsTable'
import config from '../config/gameConfig'

export default function Game() {
  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)
  const [direction, setDirection] = useState('')
  const [dotsArray, setDotsArray] = useState(Array(24*40).fill(true))
  const [dotsCount, setDotsCount] = useState(0)
  let prevKey = 0
  let lTop = top
  let lLeft = left
  const {speed, height, width, PacManSize} = config

  useEffect(()=>{
    document.addEventListener('keydown', keydown)
    const interval = setInterval(() => {
      borderCollisionDetect()
      dotsEatenDetect()
      move()
    }, 1000/60);
    return () => {
      document.removeEventListener('keydown', keydown)
      clearInterval(interval)
    }
  },[direction])

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
    if(lTop < 0) setDirection('down')
    if(lLeft < 0) setDirection('right')
    if(height-PacManSize <= lTop) setDirection('up')
    if(width-PacManSize <= lLeft) setDirection('left')
    prevKey=0
  }

  const dotsEatenDetect = () => {
    let dotRow = Math.floor((lTop + 15) / 30)
    let dotCol = Math.floor((lLeft + 15) / 30)
    let dotBox = dotRow * 40 + dotCol
    if(dotsArray[dotBox]){
      console.log(lTop-(dotRow * 30), lLeft - (dotCol * 30), lTop, dotRow, lLeft, dotCol)
      if(lTop-(dotRow * 30) < 8 && lLeft - (dotCol * 30) < 12){
        setDotsArray(array => {
          array[dotBox] = false
          return array
        })
        setDotsCount(dotsCount => dotsCount + 1)
      }
    }
  }

  return (
    <Container>
      <PacMan top={top} left={left} direction={direction} />
      <DotsTable dots={dotsArray} count={dotsCount} />
    </Container>
  )
}

const Container = styled.div`
  width:1200px;
  height: 720px;
  border: #ccc 2px solid;
  position: relative;
`
