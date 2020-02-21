import React from "react";
import TodoList from './TodoList';
import "./App.css";
import Button from "./Button";

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
    }

    handleTextChange = (event) => {
        event.preventDefault();
        this.setState({ text: event.target.value });
    }

    handleAddItem = (e) => {
        e.preventDefault();
        var newItem = {
            id: Date.now(),
            text: this.state.text,
            done: false
        };
        console.log(newItem.id);
        if (this.state.text) {
            this.setState(prevState => ({
                items: prevState.items.concat(newItem),
                text: ""
            }));
        }
    }

    markItemCompleted = (itemId) => {
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

    handleDeleteItem = (itemId) => {
        var updatedItems = this.state.items.filter(item => {
            return item.id !== itemId;
        });
        this.setState({
            items: [].concat(updatedItems)
        });
    }

    render() {
        return (<div className="App">   {/* Main PAge Display */}
            <h3 className="App-header">(: MY TO-DO LIST :)</h3>
            <div className="Head-Content">
                Remember Your Daily Work By To-do :)(:
        </div>
            <form>
                <div>
                    <input type="text" placeholder="Enter new to-do task...." onChange={this.handleTextChange} value={this.state.text} />
                    <Button onClick={this.handleAddItem}> + </Button>     {/* Button Component Call */}
                </div>
            </form>
            <div className="listTodo">
                <TodoList items={this.state.items} onItemCompleted={this.markItemCompleted} onDeleteItem={this.handleDeleteItem} />
            </div>
        </div>);
    }
}

export default TodoApp;



// <button className="addButton" onClick={this.handleAddItem} disabled={!this.state.text}> + </button>
