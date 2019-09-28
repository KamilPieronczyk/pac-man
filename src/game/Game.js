import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import PacMan from '../components/PacMan'
import DotsTable from '../components/DotsTable'

export default function Game() {
  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)
  const [direction, setDirection] = useState('')
  let prevKey = 0
  let lTop = top
  let lLeft = left
  const speed = 2
  const height = 720
  const width = 1200
  const PacManSize = 30

  useEffect(()=>{
    const listener = document.addEventListener('keydown', keydown)
    const interval = setInterval(() => {
      borderCollisionDetect()
      move()
    }, 1000/60);
    return () => {
      document.removeEventListener('keydown', keydown)
      clearInterval(interval)
    }
  },[direction])

  const keydown = (event) => {
    if(prevKey == event.keyCode) return;
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
  console.log('container rendered');

  return (
    <Container>
      <PacMan top={top} left={left} direction={direction} />
      <DotsTable />
    </Container>
  )
}

const Container = styled.div`
  width:1200px;
  height: 720px;
  border: #ccc 2px solid;
  position: relative;
`
