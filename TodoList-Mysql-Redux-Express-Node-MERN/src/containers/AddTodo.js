import React, { Component } from 'react'
import { connect } from 'react-redux';
import AddTodoMessage from './AddTodoMessage';
import * as DbConnection from '../constants/DbConnection';

class AddTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: true,
            id: null
        }
    }

    handleLogin = async (e) => {
        e.preventDefault();
        let id = e.target.elements.id.value;
        let user_Name = e.target.elements.user_Name.value;
        let passArray = [id, user_Name, this.props.dispatch];
        await DbConnection.userPost(passArray);
        this.setState({
            id: id,
            editing: false
        })
    }

    // handleLogOff = (e) => {
    //     e.preventDefault();
    //     this.setState({
    //         editing: true,
    //     })
    // }

    render() {
        let view_Todo = {};
        let add_Todo = {};

        if (this.state.editing) {
            add_Todo.display = 'none';
        } else {
            view_Todo.display = 'none';
        }

        return (
            <div>
                <div style={view_Todo}>
                    <form onSubmit={this.handleLogin}>
                        <input name="id" placeholder="Enter id" type="number" required /><br />
                        <input type="text" name="user_Name" placeholder="Enter User Name" required /><br />
                        <button>Login User</button>
                    </form>
                </div>
                <div style={add_Todo}>
                    {console.log('prop id', this.state.id)}
                    {/* <button onClick={this.handleLogOff}>LogOff</button> */}
                    <AddTodoMessage id={this.state.id} />
                </div>
            </div >
        )
    }
}

export default connect()(AddTodo);
