import React from 'react';

function Chat(props){
  if(props.username !== ""){
    return(
      <div>
        <div className="card">
        {displayOldMessages(props)}
        </div>
        <div className="form-group mb-2">
          <input type="text" className="form-control" id="myMessage" placeholder="..."/>
        </div>
        <button onClick={()=>send(props)} className="btn btn-primary mb-2">Send</button>
      </div>
    );
  } else {
    return(
      <div></div>
    )
  }
}

function send(props){
  const message = document.getElementById("myMessage").value;
  props.handleMyMessage({
    from:props.username,
    message:message,
    id:props.messages.length + 1
  });
  document.getElementById("myMessage").value = "";
}

function displayOldMessages(props){
  if(props.messages !== []){
    return props.messages.map(message => display1Message(message, props));
  }
}

function display1Message(message, props){
  if(message.from === props.username){
    return(
      <div key={message.id} className="me">
        <p>{message.message}</p>
      </div>
    );
  } else {
    return(
      <div key={message.id} className="other">
        <p>{message.from}: {message.message}</p>
      </div>
    );
  }
}

export default Chat;
