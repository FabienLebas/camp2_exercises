import React from 'react';

function TempInput(props) {
  return (
    <div>
      <tr>
        <td className="form-group">Température min</td>
        <td>
          <select class="form-control input" id="min" onChange={() => launchMin(props)}>
            {displayMin(props.min)}
          </select>
        </td>
      </tr>
      <tr>
        <td className="form-group">Température max</td>
        <td>
          <select class="form-control input" id="max" onChange={() => launchMax(props)}>
            {displayMax(props.max)}
          </select>
        </td>
      </tr>
    </div>
  )
}

function launchMin(props){
  const myValue = document.getElementById("min").value;
  {props.handleInputTempMin(myValue)};
}

function launchMax(props){
  const myValue = document.getElementById("max").value;
  {props.handleInputTempMax(myValue)};
}

function displayMin(selected){
  return [-10, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(temp => {//j'en suis la
    if(temp !== selected){
      return(
        <option value={temp}>{temp}°</option>
      )
    } else {
      return(
        <option value={temp} selected>{temp}°</option>
      )
    }
  })
}

function displayMax(selected){
  return [23, 24, 25, 26, 27, 28, 29, 30, 50].map(temp => {
    if(temp !== selected){
      return(
        <option value={temp}>{temp}°</option>
      )
    } else {
      return(
        <option value={temp} selected>{temp}°</option>
      )
    }
  })
}

export default TempInput;
