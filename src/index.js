import * as ReactDOM from 'react-dom/client'
import App from './App'
import React from 'react'

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

root.render(<App />)

if (module.hot) {
    module.hot.accept()
  }