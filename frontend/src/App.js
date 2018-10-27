import React, { Component } from 'react';
import { subscribeMsgs, sendMsg } from './Socket';
import logo from './logo.svg';
import './App.css';
import threeEntryPoint from './threejs/threeEntryPoint';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {msgLst : []};

    subscribeMsgs((msg) => {       
      this.setState({
        msgLst : this.state.msgLst.concat(<li>{msg}</li>)
      });
    });
  }

  handleSubmit(e) {
    sendMsg(this.input.value);
    this.input.value = '';
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <ul>{this.state.msgLst}</ul>
        <form onSubmit={e => this.handleSubmit(e)}>
          <input ref={e => this.input = e} autoComplete={"off"} /><button>Send</button>
        </form>
      </div>
    );
  }
}

export default App;
