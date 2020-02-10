import React from "react";
import TodoList from './TodoList';
import "./App.css";

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          id: 156768168,
          text: "hai"
        }
      ],
      text: ""
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.markItemCompleted = this.markItemCompleted.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
  }

  handleTextChange(event) {
    this.setState({ text: event.target.value });
  }

  handleAddItem(event) {
    event.preventDefault();
    var newItem = {
      id: Date.now(),
      text: this.state.text,
      done: false
    };
    console.log(newItem.id);
    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      text: ""
    }));
  }

  markItemCompleted(itemId) {
    var updatedItems = this.state.items.map(item => {
      if (itemId === item.id) {
        item.done = !item.done;
      }
      return item;
    });
    this.setState({
      items: [].concat(updatedItems)
    });
  }

  handleDeleteItem(itemId) {
    var updatedItems = this.state.items.filter(item => {
      return item.id !== itemId;
    });
    this.setState({
      items: [].concat(updatedItems)
    });
  }

  render() {
    return (<div className="App">
      <h3 className="App-header">(: MY TO-DO LIST :)</h3>
      <div className="Head-Content">
        Remember Your Daily Work By To-do :)(:
      </div>
      <form>
        <div>
          <input type="text" placeholder="Enter new to-do task...." onChange={this.handleTextChange} value={this.state.text} />
          <button className="addButton" onClick={this.handleAddItem} disabled={!this.state.text}> + </button>
        </div>
      </form>
      <div className="listTodo">
        <TodoList items={this.state.items} onItemCompleted={this.markItemCompleted} onDeleteItem={this.handleDeleteItem} />
      </div>
    </div>);
  }
}

export default TodoApp;
