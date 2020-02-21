import React, { Component } from 'react';
import axios from 'axios'
import List from './List';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      username: '',
      editing: true,
      text: '',
      userid: ''
    }
  }

  handleClick = async (e) => {

    e.preventDefault();
    const userid = e.target.elements.id.value;
    const name = e.target.elements.name.value;

    await axios.post('http://localhost:8080/userlogin', {
      "userid": userid,
      "name": name
    });
    this.setState({
      userid: userid,
      editing: !this.state.editing,
      name: name
    });

    const res = await axios.get(`http://localhost:8080/data?id=${userid}`);
    this.setState({
      res: res.data.result,
      id: '',
      username: ''
    });

  }

  handleAddTodo = async (e) => {

    e.preventDefault();
    const message = e.target.elements.message.value;
    const userid = this.state.userid;

    await axios.post('http://localhost:8080/usertodo', {
      "userid": userid,
      "message": message
    });

    const res = await axios.get(`http://localhost:8080/data?id=${this.state.userid}`);
    this.setState({
      text: '',
      userid: userid,
      message: message,
      res: res.data.result
    });

  }

  LogOff = () => {
    this.setState({
      editing: true
    })
  }

  handleTextChange(e) {
    e.preventDefault();
    this.setState({ text: e.target.value });
  }

  handleTextChangeId(e) {
    e.preventDefault();
    this.setState({ id: e.target.value });
  }

  handleTextChangeUsername(e) {
    e.preventDefault();
    this.setState({ username: e.target.value });
  }

  render() {

    document.title = 'Todo';

    // const data = this.state.res;
    const view = {};
    const hide = {};

    if (this.state.editing) {
      view.display = 'none';
    }

    if (!this.state.editing) {
      hide.display = 'none';
    }

    return (
      <div className="App">
        <div style={hide}>
          <form onSubmit={this.handleClick}>
            <input type="number" name="id" value={this.state.id} onChange={this.handleTextChangeId.bind(this)} placeholder="Enter ID" required /><br />
            <input type="text" name="name" value={this.state.username} onChange={this.handleTextChangeUsername.bind(this)} placeholder="Enter User Name" required /> <br />
            <button>Search ID</button>
          </form>
        </div>
        <div style={view}>
          <h2>Todo List</h2>
          {this.state.name ? <h4> Welcome {this.state.name}</h4> : null} <input className="logoffbtn" type="submit" value="LogOff" onClick={this.LogOff} />
          <form onSubmit={this.handleAddTodo}>
            <input type="text" name="message" value={this.state.text} onChange={this.handleTextChange.bind(this)} placeholder="Enter Your Todo Message" required />
            <button>Add Todo</button><br />
            <List tododata={this.state.res} />
          </form>
        </div>
      </div>
    )
  }
}

export default App;
