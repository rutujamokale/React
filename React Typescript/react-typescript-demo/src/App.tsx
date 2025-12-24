import './App.css';
import { Greet } from './components/Greet';
import { Person } from './components/Person';
import { PersonList } from './components/PersonList';

function App() {
  const personName = {
    first: 'Rutuja',
    last: 'Mokale'
  }

  const nameList =[
    {
      first: 'Rutuja',
      last: 'Mokale'
    },
    {
      first: 'Rushi',
      last: 'Mokale'
    },
    {
      first: 'Rohan',
      last: 'Mokale'
    },
  ]

  return (
    <div className="App">
      <Greet name="Rutuja" age={23} isloggedin={true} />
      <Person name={personName} />
      <PersonList names={nameList} />
    </div>
  )
}

export default App;
