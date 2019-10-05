import React, {memo,useState, useEffect} from 'react'
import styled from 'styled-components'
import PacMan from '../components/PacMan'
import DotsTable from '../components/DotsTable'
import config from '../config/gameConfig'
import Enemy from '../components/Enemy'
import {useCollisionDetect, useObjects, useOnFrameReload} from '../hooks'

export default memo(() => {
  const objects = useObjects()

  useOnFrameReload(()=>{
    checkEnemyTouched(objects.getObject('PacMan').positionArray, objects.objects['Ghosts'])
  })

  // const dotsEatenDetect = (pacManPos) => {
  //   let [top, left] = pacManPos
  //   let dotRow = Math.floor((top + 15) / 30)
  //   let dotCol = Math.floor((left + 15) / 30)
  //   let dotBox = dotRow * 40 + dotCol
  //   if(dotsArray[dotBox]){
  //     if(top-(dotRow * 30) < 8 && left - (dotCol * 30) < 12){
  //       setDotsArray(array => {
  //         array[dotBox] = false
  //         return array
  //       })
  //       setDotsCount(dotsCount => dotsCount + 1)
  //     }
  //   }
  // }

  const checkEnemyTouched = (pacManPos, enemy) =>{
    let [pacManTop, pacManLeft] = pacManPos
    enemy.forEach( ({top, left}) => {
      if(Math.abs(pacManTop-top) < 30 && Math.abs(pacManLeft-left) < 30)
      //clearInterval(interval)
      console.log('Collision detected')
      return;
    })
  }

  return (
    <Container>
      <PacMan />
      {/* <DotsTable /> */}
      <Enemy color="red" id={1} />
      <Enemy color="orange" id={2} />
      <Enemy color="green" id={3} />
      <Enemy color="blue" id={4} />
      <Enemy color="white" id={5} />
      <Enemy color="purple" id={6} />
    </Container>
  )
}, true)

const Container = styled.div`
  width:1200px;
  height: 720px;
  border: #ccc 2px solid;
  position: relative;
`
