import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import PacMan from '../components/PacMan'
import DotsTable from '../components/DotsTable'
import config from '../config/gameConfig'
import Enemy from '../components/Enemy'

export default function Game() {
  const [dotsArray, setDotsArray] = useState(Array(24*40).fill(true))
  const [dotsCount, setDotsCount] = useState(0)
  const pacManPos = Array(2)
  const enemyPos = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]
  let callbacks = []
  let pacmanCallback = ()=>{}

  useEffect(()=>{
    const interval = setInterval(() => {
      callbacks.forEach(fun => fun())
      pacmanCallback()
      dotsEatenDetect()
      checkEnemyTouched(interval)
    }, 1000/60);
    return () => {
      clearInterval(interval)
    }
  },[])

  const dotsEatenDetect = () => {
    let [lTop, lLeft] = pacManPos
    let dotRow = Math.floor((lTop + 15) / 30)
    let dotCol = Math.floor((lLeft + 15) / 30)
    let dotBox = dotRow * 40 + dotCol
    if(dotsArray[dotBox]){
      if(lTop-(dotRow * 30) < 8 && lLeft - (dotCol * 30) < 12){
        setDotsArray(array => {
          array[dotBox] = false
          return array
        })
        setDotsCount(dotsCount => dotsCount + 1)
      }
    }
  }

  const checkEnemyTouched = (interval) =>{
    let [pacManTop, pacManLeft] = pacManPos
    enemyPos.forEach( ([top, left]) => {
      if(Math.abs(pacManTop-top) < 30 && Math.abs(pacManLeft-left) < 30)
      clearInterval(interval)
      return;
    })
  }

  function subscribe (callback) {
    callbacks.push(callback)
  }

  function registerPacMan(callback){
    pacmanCallback = callback
  }

  function unregisterPacMan(){
    pacmanCallback = ()=>{}
  }

  return (
    <Container>
      <PacMan register={registerPacMan} unregister={unregisterPacMan} pos={pacManPos}/>
      <DotsTable dots={dotsArray} count={dotsCount} />
      <Enemy color="red" subscribe={subscribe} pos={enemyPos[0]} />
      <Enemy color="orange" subscribe={subscribe} pos={enemyPos[1]} />
      <Enemy color="green" subscribe={subscribe} pos={enemyPos[2]}/>
      <Enemy color="blue" subscribe={subscribe} pos={enemyPos[3]}/>
      <Enemy color="white" subscribe={subscribe} pos={enemyPos[4]}/>
      <Enemy color="purple" subscribe={subscribe} pos={enemyPos[5]}/>
    </Container>
  )
}

const Container = styled.div`
  width:1200px;
  height: 720px;
  border: #ccc 2px solid;
  position: relative;
`
