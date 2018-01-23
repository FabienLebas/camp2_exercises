import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.handleUserName(this.state.value);
  };

  render() {
    return (
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
    );
  }
}

export default Login;
