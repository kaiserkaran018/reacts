import React, { Component } from 'react';
import App from './App';
import './App.css'
import Login from './Login';

export default class index extends Component {
    constructor() {
        super()
        this.state = {
            pass: null,
            changeOver: true
        }
    }
    handleRegister = (e) => {
        e.preventDefault();
        this.setState({
            pass: true,
            changeOver: false
        })
    }

    handleLogin = (e) => {
        e.preventDefault();
        this.setState({
            pass: false,
            changeOver: false
        })
    }

    render() {
        return (
            <div>
                {
                    (this.state.changeOver) ?
                        (
                            <div>
                                <div className="head">
                                    Home Page
                                </div>
                                <div className="midContent">
                                    Click Register if you doesn't have an account
                                    <br /><br />
                                    <button onClick={this.handleRegister} >Register</button>
                                    <br /><br /><br />
                                    Click Login if you already have an account
                                    <br /><br />
                                    <button onClick={this.handleLogin} >Login</button>
                                </div>
                            </div>
                        )
                        :
                        (
                            <div>
                                {
                                    (this.state.pass) ?
                                        (
                                            <App />
                                        )
                                        :
                                        (
                                            <Login />
                                        )
                                }
                            </div>
                        )
                }
            </div>
        )
    }
}
