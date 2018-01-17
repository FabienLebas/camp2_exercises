import React from 'react';

function Login(props){
  if(props.username===""){
    return(
      <div>
        <h1 className="display-4">Hello!</h1>
        <p className="lead">Welcome to Slacky. Here you will be able to chat with your friends.</p>
        <hr className="my-4"/>
        <p>Please enter your username</p>
        <div className="form-inline">
          <div className="form-group mb-2">
            <input type="text" className="form-control" id="myUsername"/>
          </div>
          <button onClick={() => launchLogin(props)} className="btn btn-primary mb-2">Submit</button>
        </div>
      </div>
    );
  } else {
    return(
      <div>
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="/">Slacky</a>
          <p>Connected as {props.username}</p>
          <i onClick={() => logOut(props)} className="fa fa-power-off" aria-hidden="true"></i>
        </nav>
      </div>
    );
  }
}

function launchLogin(props){
  const user = document.getElementById("myUsername").value;
  return props.handleLogin(user);
}

function logOut(props){
  {props.handleLogOut(props.username)};
}

export default Login;
