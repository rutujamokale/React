import { useState } from 'react'
import reactLogo from './assets/react.svg'
import transflowerLogo from './assets/transflower.jpeg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const flower = {
    name: "rose",
    color: "red",
    price: 10
  }

  return (
    <>
      <div>
        <a href="https://transflowerlearning.com/" target="_blank">
          <img src={transflowerLogo} className="logo" alt="Transflower logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React</h1>

      <div className="card">
        <button onClick={() => setCount(count + 1)}>
          count is {count}
        </button>
        <p>Tap your potential!</p>
      </div>

      <p className="read-the-docs">
        Click on the logos to learn more
      </p>

      <h2>Flowers List 🌸</h2>
      <h3> {flower.name} </h3>
      <p> Color: {flower.color} </p>
      <p> Price: ${flower.price} </p>
    </>
  )
}

export default App
