import React from 'react';

function DisplayRow(props) {
  return props.board[props.row].map((cell, columnIndex) => (
    <td key={cell + columnIndex} onClick = {() => props.handleInput(props.row, columnIndex)}>{cell}</td>
  ));
}

export default DisplayRow;
