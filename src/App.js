import { useEffect, useState } from "react";
import axios from 'axios'

const Filter = ({handler}) => {
  return(
    <div>
      filter shown with <input value={handler[0]} onChange={handler[1]} />
    </div>
    
  )
}

const PersonForm = ({handler}) => {
  const [newName, setNewName] = useState(''),
        [newNumber, setNewNumber] = useState('')

  const handleChangeName = (e) => setNewName(e.target.value)
  const handleChangeNumber = (e) => setNewNumber(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()
    if(newName !== '')
      if(handler[0].filter(f => f.name.toLowerCase().includes(newName.toLowerCase())).length === 0){
        handler[1](handler[0].concat({ name: newName, number: newNumber })) 
      }else window.alert(`${newName} is already added to phonebook`)
    setNewName('')
    setNewNumber('')
  }

  return(
    <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleChangeName} value={newName}/><br/>
          number: <input onChange={handleChangeNumber} value={newNumber} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
  )
}

const Persons = ({handler}) => {
  return(
    <div>
      {handler[0].filter(a => a.name.toLowerCase().includes(handler[1].toLowerCase())).map(a => <p key={a.name}>{a.name} {a.number}</p>)}
    </div>
  )
}

function App() {
  const [persons, setPersons] = useState([]),       
       [seula, setSeula] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(res => setPersons(res.data))
  }, [])

  const handleChangeFilter = (e) => setSeula(e.target.value)

  // 
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handler={[seula, handleChangeFilter]} />
      <h2>add a new</h2>
      <PersonForm handler={[persons, setPersons]} />
      <h2>Numbers</h2>
      <Persons handler={[persons, seula]} />
    </div>
  );
}

export default App;
