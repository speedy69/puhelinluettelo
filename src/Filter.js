const Filter = ({handler}) => {
    return(
      <div>
        filter shown with <input value={handler[0]} onChange={handler[1]} />
      </div>
      
    )
  }
export default Filter