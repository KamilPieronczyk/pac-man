import React, {memo} from 'react'
import styled from 'styled-components'
import Dot from './Dot'

export default memo(() => {
  const table = []
  const createDots = () => {
    for (let i = 0; i < 24*40; i++) {
      table.push(<Dot />)
    }
    return table
  }
  console.log('table rendered')
  return (
    <Container>
      {createDots()}
    </Container>
  )
})

const Container = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(40, 30px);
  grid-gap: 0;
`
