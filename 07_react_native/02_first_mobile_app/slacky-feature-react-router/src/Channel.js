import React, { Component } from "react";

class Channel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessage: ""
    };
  }

  handleChange = event => {
    this.setState({ newMessage: event.target.value });
  };

  componentDidUpdate() {
    // https://reactjs.org/docs/react-component.html#componentdidupdate
    // This will make the list of messages scroll to the bottom each time
    // the component update, that way, the last message will always be visible
    this.messageListDiv.scrollTop = this.messageListDiv.scrollHeight;
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.sendMessage(this.state.newMessage, this.props.channel);
    this.setState({ newMessage: "" });
  };

  render() {
    return (
      <div className="Channel">
        <div
          className="Chat-messages"
          ref={(node) => {
            // refs allows you to have a reference to an element of the DOM
            // You should use this parcimoniously and don't change the DOM or React
            // will go crazy
            // See https://reactjs.org/docs/refs-and-the-dom.html
            this.messageListDiv = node;
          }}
        >
          {this.props.messages
            .filter(message => message.channel === this.props.channel)
            .map((message, index) =>
              (
                <div className="message-container" key={index}>
                  <span className="author">{message.userName}</span>
                  <span className="message">{message.message}</span>
                </div>
              )
          )}
        </div>
        <div className="Chat-form">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.newMessage}
              onChange={this.handleChange}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Channel;
