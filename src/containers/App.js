import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Counting down: 5",
      timer: 5,
      running: true,
      restart: false
    };
  }

  decreaseTimer = () => {
    let running = true;

    if (!this.state.timer) {
      setTimeout(_ => this.setState({
        restart: true
      }), 2000);
      running = false;
    }

    if (!this.state.running || this.state.restart)
      running = false;

    if (!running)
      return;

    this.timerTimeout = setTimeout(_ => this.setState({
      timer: --this.state.timer,
      text: (this.state.timer && `Counting down: ${this.state.timer}`) || 'Hello world!'
    }), 1000);
  }

  startStop = () => {
    this.state.running && clearTimeout(this.timerTimeout);
    this.setState({
      running: !this.state.running
    });
  }

  restart = () => {
    this.setState({
      running: true,
      restart: false,
      timer: 5,
      text: 'Counting down: 5'
    });
  }

  render = () => {
    this.decreaseTimer();
    return (
      <div>
        <p>{this.state.text}</p>
        {this.state.timer ? <button onClick={this.startStop}>{this.state.running ? 'Stop!' : 'Start'}</button> : null}
        {this.state.restart ? <button onClick={this.restart}>Restart?</button> : null}
      </div>
    )
  };
}