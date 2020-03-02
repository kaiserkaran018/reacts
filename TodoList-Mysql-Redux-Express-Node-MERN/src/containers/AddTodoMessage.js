import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as DbConnection from '../constants/DbConnection';

class AddTodoMessage extends Component {
    constructor(props) {
        super(props);
        console.log('in message props', props);
        this.state = {

        }
    }
    render() {
        let message;
        return (
            <div>
                <form>
                    <input ref={node => (message = node)} placeholder="Enter Message" required /><br />
                    <button onClick={async (e) => {
                        e.preventDefault();
                        let passArray = [this.props.id, message.value, this.props.dispatch];
                        message.value = "";
                        await DbConnection.todoPost(passArray);
                    }} > Add Todo</button>
                </form>
            </div>
        )
    }
}

export default connect()(AddTodoMessage);
