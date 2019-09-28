import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import PacMan from '../components/PacMan'
import DotsTable from '../components/DotsTable'
import config from '../config/gameConfig'
import Enemy from '../components/Enemy'

export default function Game() {
  const [dotsArray, setDotsArray] = useState(Array(24*40).fill(true))
  const [dotsCount, setDotsCount] = useState(0)
  let callbacks = []
  let pacmanCallback = ()=>{}

  useEffect(()=>{
    const interval = setInterval(() => {
      callbacks.forEach(fun => fun())
      pacmanCallback()
      //dotsEatenDetect()
    }, 1000/60);
    return () => {
      clearInterval(interval)
    }
  })

  // const dotsEatenDetect = () => {
  //   let dotRow = Math.floor((lTop + 15) / 30)
  //   let dotCol = Math.floor((lLeft + 15) / 30)
  //   let dotBox = dotRow * 40 + dotCol
  //   if(dotsArray[dotBox]){
  //     if(lTop-(dotRow * 30) < 8 && lLeft - (dotCol * 30) < 12){
  //       setDotsArray(array => {
  //         array[dotBox] = false
  //         return array
  //       })
  //       setDotsCount(dotsCount => dotsCount + 1)
  //     }
  //   }
  // }

  function subscribe (callback) {
    callbacks.push(callback)
  }

  function registerPacMan(callback){
    pacmanCallback = callback
  }

  return (
    <Container>
      <PacMan register={registerPacMan} />
      <DotsTable dots={dotsArray} count={dotsCount} />
      <Enemy color="red" subscribe={subscribe} />
      <Enemy color="orange" subscribe={subscribe} />
      <Enemy color="green" subscribe={subscribe} />
      <Enemy color="blue" subscribe={subscribe} />
      <Enemy color="white" subscribe={subscribe} />
    </Container>
  )
}

const Container = styled.div`
  width:1200px;
  height: 720px;
  border: #ccc 2px solid;
  position: relative;
`
