import React from 'react';
import styled from 'styled-components'
import Game from './game/Game'
import GameEngine from './game/GameEngine'

function App() {
  return (
    <Container>
      <GameEngine framesPerSec={60}>
        <Game />
      </GameEngine>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #011a24;
  color: #fff;
`

export default App;
