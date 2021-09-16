function Select(props) {
    return   <option value={props.name.keyName} >
                  {props.name.keyValue}
             </option> 
  }

export {Select}