import React, {memo} from 'react'
import styled from 'styled-components'
import Dot from './Dot'

export default memo((props) => {
  const table = []
  const createDots = () => {
    for (let i = 0; i < 24*40; i++) {
      table.push(<Dot visible={props.dots[i]} />)
    }
    return table
  }
  return (
    <Container>
      {createDots()}
    </Container>
  )
}, (prevProps, nextProps) => {
  return prevProps.count === nextProps.count
})

const Container = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(40, 30px);
  grid-gap: 0;
`
