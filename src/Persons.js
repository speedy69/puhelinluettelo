const Persons = ({handler}) => {
    return(
      <table>
        <tbody>
          {handler[0].filter(a => a.name.toLowerCase()
            .includes(handler[1].toLowerCase()))
            .map(a => <tr key={a.id}>
                <td>{a.name}</td>
                <td>{a.number}</td>
                <td><button id={a.id} name={a.name} onClick={handler[2]} >delete</button></td>
                </tr>)}
        </tbody>
      </table>
    )
  }

export default Persons