import React, { Component } from 'react';
import Login from './Login';
import './App.css';

export default class RegisterSuccess extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: this.props.userName,
            mailId: this.props.mailId,
            login: true
        }
    }
    handleMoveToLogin = (e) => {
        e.preventDefault();
        this.setState({
            login: false
        })
    }
    render() {
        return (
            <div>
                {
                    (this.state.login) ?
                        (
                            <div>
                                <div className="head">
                                    Register Success Page
                                </div>
                                <div className="midContent">
                                    <div className="registerSuccess">Register Success !!!!!</div><br /><br />
                                    Hi {this.state.userName} your user name is {this.state.mailId}<br />
                                    <button onClick={this.handleMoveToLogin}>Login</button>
                                </div>
                            </div>
                        )
                        :
                        (
                            <div>
                                <Login userName={this.state.userName} mailId={this.state.mailId} />
                            </div>
                        )
                }
            </div>
        )
    }
}
