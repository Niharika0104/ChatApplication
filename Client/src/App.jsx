import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-textarea/styles.css"; 
import ChatInterface from './Components/ChatInterface'

function App() {

console.log(import.meta.env.VITE_OPENAI_API_KEY)
  return (
    <>
     
     <CopilotKit publicApiKey={import.meta.env.VITE_OPENAI_API_KEY}>
     <ChatInterface/>
    </CopilotKit>
     
    </>
  )
}

export default App
