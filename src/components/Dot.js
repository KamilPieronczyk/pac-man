import React, {memo} from 'react'
import styled from 'styled-components'

export default memo((props) => {
  return (
    <Container width={30} height={30}>
      {props.visible ? <_Dot /> : null}
    </Container>
  )
})

const Container = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props=>props.width}px;
  height: ${props=>props.height}px;
`

const _Dot = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 2.5px;
  background-color: orange;
`
