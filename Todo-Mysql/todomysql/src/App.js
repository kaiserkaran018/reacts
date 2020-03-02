import React, { Component } from 'react';
import UserName from './UserName';
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
      userid: '',
      resUser: ''
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
      name: name
    });

    const res = await axios.get(`http://localhost:8080/data?id=${userid}`);
    const resUser = await axios.get(`http://localhost:8080/userdetials?id=${this.state.userid}`);
    const loginname = resUser.data[0].username;
    if (loginname === name) {
      this.setState({
        editing: !this.state.editing,
        res: res.data,
        id: '',
        username: '',
        text: '',
        userid: userid,
        resUser: resUser.data
      });
    } else {
      alert('Enter Valid User Name');
    }

  }

  handleAddTodo = async (e) => {

    e.preventDefault();
    const message = e.target.elements.message.value;
    const userid = this.state.userid;

    const res = await axios.post('http://localhost:8080/usertodo', {
      "userid": userid,
      "message": message
    });
    this.setState({
      text: '',
      userid: userid,
      message: message,
      res: res.data
    });

  }

  LogOff = () => {
    this.setState({
      editing: true
    })
  }

  handleTextChange = (e) => {
    e.preventDefault();
    this.setState({ text: e.target.value });
  }

  handleTextChangeId = (e) => {
    e.preventDefault();
    this.setState({ id: e.target.value });
  }

  handleTextChangeUsername = (e) => {
    e.preventDefault();
    this.setState({ username: e.target.value });
  }

  render() {

    document.title = 'Todo';

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
          <h1>Todo</h1>
          <h6>Remenber Your Daily Task By Todo :)</h6>
          <form onSubmit={this.handleClick}>
            <input type="number" name="id" value={this.state.id} onChange={this.handleTextChangeId} placeholder="Enter ID" required /><br />
            <input type="text" name="name" value={this.state.username} onChange={this.handleTextChangeUsername} placeholder="Enter User Name" required /> <br />
            <button>Search ID</button>
          </form>
        </div>
        <div style={view}>
          <h2>Todo List</h2>
          <UserName username={this.state.resUser} />
          <input className="logoffbtn" type="submit" value="LogOff" onClick={this.LogOff} />
          <form onSubmit={this.handleAddTodo}>
            <input type="text" name="message" value={this.state.text} onChange={this.handleTextChange} placeholder="Enter Your Todo Message" required />
            <button>Add Todo</button><br />
            <List tododata={this.state.res} />
          </form>
        </div>
      </div>
    )
  }
}

export default App;
