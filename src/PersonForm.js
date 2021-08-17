const PersonForm = ({handler}) => {
    const [handleChangeName,handleChangeNumber, handleSubmit, newName, newNumber] = handler
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
export default PersonForm