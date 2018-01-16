import React from 'react';

function HoursInput(props) {
  return (
      <tr>
        <td></td>
        <td></td>
        <td>
          <div class="form-group">
            <select class="form-control input" id="morning" onChange={() => launchMorning(props)}>
              {displayMorning(props.morning)}
            </select>
          </div>
        </td>
        <td>
          <div class="form-group">
            <select class="form-control input" id="afternoon" onChange={() => launchAfternoon(props)}>
              {displayAfternoon(props.afternoon)}
            </select>
          </div>
        </td>
      </tr>
  )
}

function launchMorning(props){
  const myValue = document.getElementById("morning").value;
  {props.handleInputMorning(myValue)};
}

function launchAfternoon(props){
  const myValue = document.getElementById("afternoon").value;
  {props.handleInputAfternoon(myValue)};
}

function displayMorning(selected){
  return ["5", "6", "7", "8", "9", "10", "11", "12"].map(hour => {
    if(hour !== selected){
      return(
        <option value={hour}>{hour}h</option>
      )
    } else {
      return(
        <option value={hour} selected>{hour}h</option>
      )
    }
  })
}

function displayAfternoon(selected){
  return ["13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"].map(hour => {
    if(hour !== selected){
      return(
        <option value={hour}>{hour}h</option>
      )
    } else {
      return(
        <option value={hour} selected>{hour}h</option>
      )
    }
  })
}

export default HoursInput;
