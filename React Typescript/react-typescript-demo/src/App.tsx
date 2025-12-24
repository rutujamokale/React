import './App.css';
import { Greet } from './components/Greet';
import { Person } from './components/Person';

function App() {
  const personName = {
    first: 'Rutuja',
    last: 'Mokale'
  }

  return (
    <div className="App">
      <Greet name="Rutuja" age={23} isloggedin={true} />
      <Person name={personName} />
    </div>
  )
}

export default App;
