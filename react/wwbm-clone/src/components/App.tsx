import * as React from 'react'
import './App.css'
import logo from '../images/hand.svg'
export interface StartGameProps {
  phrase?: string
}

export function App({
  phrase = 'Who wants to be a millionaire?',
}: StartGameProps) {
  return (
    <div>
      <header className="App-header">
        {phrase}
      </header>
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  )
}
