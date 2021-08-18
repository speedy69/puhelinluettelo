import { useEffect, useState } from "react";
import { changeData, delData, getData, postData } from './axios'
import Persons from './Persons'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Notification from './Notification'

function App() {
  const [persons, setPersons] = useState([])    
  const [seula, setSeula] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('normal')

  useEffect(() => {
    getData().then(res => setPersons(res))
  }, [])

  const handleChangeFilter = (e) => setSeula(e.target.value)
  const handleChangeName = (e) => setNewName(e.target.value)
  const handleChangeNumber = (e) => setNewNumber(e.target.value)
  const freeze = () => {
    setTimeout(() =>{
      setMessage(null)
    }, 4000)
  }

 /*--------- Lisatään listaan ------------*/
  const handleSubmit = (e) => {
    e.preventDefault()
    if(newName.trim() !== ''){
      if(newNumber.trim() !== ''){
        let alradyInList = false
        let person = persons.filter(hnklo => hnklo.name.toLowerCase() === newName.toLowerCase())

        if(person.length === 1){
          alradyInList = true
          person = person[0]
        }
        
        if(!alradyInList){
          postData({ name: newName, number: newNumber}).then(res => {
            if(res.status === 201){
              setPersons(persons.concat(res.data))
              setMessageType('normal')
              setMessage(`Added ${newName}`)
              freeze()
            }
          })
        }else{
          if(window.confirm(`${newName} is already added to phonebook,\nreplace the old number with a new one?`)){
            person.number = newNumber.trim()

            changeData(person).then(res => {
              if(res.status === 204){
                setMessageType('normal')
                setMessage(`Changed ${newName}´s number`)
                freeze()
              }
            }).catch(e => {
              setMessageType('error')
              setMessage(`Information of ${newName} has already been removed from server`)
              getData().then(res => setPersons(res))
              freeze()
            })
          }
        }
      }else{
        window.alert('You should give a number too')
        return
      } 
    }
    setNewName('')
    setNewNumber('')
  }

/*------------ Poistetaan listasta-----------------------*/
  const handleDelete = e => {
    const name = e.target.name
    const id = Number(e.target.id)
    if(window.confirm(`Delete ${name} ?`)){
      const temp = persons.filter(f => f.id !== id)
      delData(id).then((res) => {
        if(res.status === 204){        
          setPersons(temp)
          setMessage(`Deleted ${name}`)
          freeze()
        }
      }).catch(e => {
        setMessageType('error')
        setMessage(`${name} is alrady deleted from phonebook!`)
        setPersons(temp)
        freeze()
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />
      <Filter handler={[seula, handleChangeFilter]} />
      <h2>add a new</h2>
      <PersonForm handler={[handleChangeName, handleChangeNumber, handleSubmit, newName, newNumber]} />
      <h2>Numbers</h2>
      <Persons handler={[persons, seula, handleDelete]} />
    </div>
  );
}

export default App;
