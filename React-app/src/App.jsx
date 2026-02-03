import { useState } from 'react'
import reactLogo from './assets/react.svg'
import transflowerLogo from './assets/transflower.jpeg'
import roseImage from './assets/rose.jpeg'   
import './App.css'
import Counter from "./Counter";
import MentorData from "./components/MentorData.jsx"
import TestData  from './components/TestData.jsx'    
import MentorDashbord from './components/Dashbord/MentorDashbord.jsx' 
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

      <h2>Flowers  🌸</h2>
       <img src={roseImage} className="image " alt="rose image" />
      <h3> {flower.name} </h3>
      <p> Color: {flower.color} </p>
      <p> Price: ${flower.price} </p>

      <h2>Counter Component</h2>
      <Counter />
      <h2>MentorData</h2>
        < MentorData/>
        <MentorDashbord/>

       <h2>TEST DATA</h2>
       <TestData/>
    </>
  )
}

export default App
