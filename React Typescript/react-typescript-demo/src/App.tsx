import './App.css';
import { Button } from './components/Button';
import { Greet } from './components/Greet';
import { Heading } from './components/Heading';
import { Oscar } from './components/Oscar';
import { Person } from './components/Person';
import { PersonList } from './components/PersonList';
import{Status}from './components/Status';



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
      <Status status='success'/>
      <Heading>Placeholder text</Heading>
      <Oscar>Oscar goes to Leonardo DiCaprio!</Oscar>
      <Button 
      handleClick={(event,id)=>{
        return console.log("button clicked",event);
      }
    }
      />
    </div>
  )
}

export default App;
