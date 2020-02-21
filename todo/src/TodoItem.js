import React from "react";
import "./App.css";
import Button from './Button';

class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { editing: false }
    }

    componentDidMount = () => {
        this.setState({ textChange: this.props.text })
    }

    markCompleted = () => {
        this.props.onItemCompleted(this.props.id);
    }

    deleteItem = () => {
        this.props.onDeleteItem(this.props.id);
    }

    handleEdit = (e) => {
        var textChange = e.target.value;
        this.setState({ textChange: textChange });
    }

    handleEditing = () => {
        this.setState({ editing: true });
    }

    handleKey = (e) => {
        if (e.keyCode === 13) {
            this.setState({ editing: false });
        }
    }

    handleKeyDone = () => {
        this.setState({ editing: false });
    }

    render() {
        var itemClass = (this.props.completed ? "done" : "none");

        var view = {};
        var edit = {};

        if (this.state.editing) {
            view.display = 'none';
        } else {
            edit.display = 'none';
        }

        return (
            <li className={itemClass}>
                <div style={view}>
                    <input type="checkbox" onChange={this.markCompleted} />
                    <label>
                        {
                            this.state.textChange
                        }
                    </label>
                    <Button onClick={this.deleteItem}> - </Button>
                    <Button onClick={this.handleEditing}> Edit </Button>
                </div>
                <div style={edit}>
                    <input type="text" onChange={this.handleEdit} onKeyDownCapture={this.handleKey} className="text" value={this.state.textChange} />
                    <Button onClick={this.handleKeyDone}> Done </Button>
                </div>
            </li>
        );
    }
}

export default TodoItem


// <button type="button" onClick={this.handleKeyDone}> Done </button>
// <button type="button" className="deleteButton" onClick={this.deleteItem}> - </button> 
// <button type="button" onClick={this.handleEditing}> Edit </button>
