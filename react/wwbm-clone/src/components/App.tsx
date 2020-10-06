import React, { useState } from 'react'
import logo from '../images/hand.svg'

// Styles
import './App.css'
export interface StartGameProps {
  phrase?: string
}

function onStart() {
  console.log('start!')
}

export function App({
  phrase = 'Who wants to be a millionaire?',
}: StartGameProps) {
  return (
    <div className="App-background ">
      <div className="wrapper">
        <div className="App-logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="App-header">
          {phrase}
        </div>
        <div className="App-button">
          <button type="button" className="App-button" onClick={onStart}>Start</button>
        </div>
      </div>
    </div>
  )
}
