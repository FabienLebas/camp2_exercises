import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      formSubmitted: false
    };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.handleUserName(this.state.value);
    this.setState({
      ...this.state,
      formSubmitted: true
    })
  };

  render() {
    console.log(this.props);
    if(this.state.formSubmitted){
      return(
        <Redirect to="/chat"></Redirect>
      );
    } else {
      return(
      <div>
        <header className="App-header">
          <h1 className="App-title">Slacky</h1>
        </header>
        <form className="Login" onSubmit={this.handleSubmit}>
          <div>
            Please choose a login name
          </div>
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.value}
          />
        <button type="submit">Log in</button>
        </form>
      </div>
      )
    }
  }
}

export default Login;
