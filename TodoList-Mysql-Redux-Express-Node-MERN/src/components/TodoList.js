import React, { Component } from 'react';
import * as DbConnection from '../constants/DbConnection';
import { connect } from 'react-redux';
import '../index.css';

class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleCompleted = async (props) => {
        let id = props[0];
        let is_Completed = props[1];
        let user_Id = props[2];
        let passArray = [];
        passArray.push(id, is_Completed, user_Id, this.props.dispatch);
        await DbConnection.updateComplete(passArray);
    }

    handleDelete = async (props) => {
        let todo_Id = props[0];
        let user_Id = props[1]
        let passArray = [todo_Id, user_Id, this.props.dispatch];
        await DbConnection.updateDelete(passArray);
    }

    handleEdit = (props) => {
        console.log('in props', props);
        let id = props[0];
        let todoEdit = props[1];
        this.setState({
            id: id,
            todoEdit: todoEdit
        })
    }

    handleChange = (e) => {
        let todoEdit = e.target.value;
        this.setState({
            todoEdit: todoEdit
        });
    }

    handleDone = async (props) => {
        let todo_Id = props[0];
        let user_Id = props[1];
        let message = this.state.todoEdit;
        let passArray = [todo_Id, user_Id, message, this.props.dispatch];
        await DbConnection.todoUpdate(passArray);
        console.log(passArray);
        console.log('done', props);
        console.log('iddd', todo_Id, user_Id);
        this.setState({
            id: null
        })
    }

    render() {

        return (
            <div>
                <ul>
                    {
                        this.props.todos.map(todo => {
                            if (this.state.id !== todo.todo_Id)
                                return (
                                    <li key={todo.todo_Id}>
                                        <input type="checkbox" onClick={() => { this.handleCompleted([todo.todo_Id, todo.is_Completed, todo.user_Id]) }} />
                                        <label style={{ textDecoration: todo.is_Completed ? "line-through" : "none" }}>
                                            {
                                                todo.message
                                            }
                                        </label>
                                        <button onClick={() => { this.handleEdit([todo.todo_Id, todo.message]) }}>Edit</button>
                                        <button onClick={() => { this.handleDelete([todo.todo_Id, todo.user_Id]) }}>Delete</button>
                                    </li>)
                            else return (
                                <div key={todo.todo_Id}>
                                    <input type="text" value={this.state.todoEdit} onChange={this.handleChange} />
                                    <button onClick={() => { this.handleDone([todo.todo_Id, todo.user_Id]) }}>Done</button>
                                </div>
                            )
                        })}
                </ul>
            </div >
        )
    }
}

export default connect()(TodoList);


//<input type="text" value={todo.message} onChange={() => { this.handleChange(todo.todo_Id) }} />



// <div style={{ display: !this.state.editing ? "none" : '' }} >
    // <label style={{ textDecoration: todo.is_Completed ? "line-through" : "none" }}>
       // {
         //   todo.message
        //}
    //</label>
//</div>
    //<div style={{ display: this.state.editing ? "none" : '' }}>
        //<input type="text" value={todo.message} onChange={() => { this.handleChange(todo.todo_Id) }} />
        //<button onClick={() => { this.handleDone(todo.todo_Id) }}>Done</button>
    //</div>

