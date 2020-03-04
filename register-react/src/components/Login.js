import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Index from './index';
import LoginSuccessful from './LoginSuccessful';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            password: '',
            logined: true,
            loginSuccess: false,
            changeOver: null
        }
    }

    handleTextChanges = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleReset = (e) => {
        e.preventDefault();
        this.setState({
            userName: '',
            password: ''
        })
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            loginSuccess: false,
            changeOver: true,
            logined: false
        })
    }

    handleLogin = async (e) => {
        e.preventDefault();
        let userName = this.state.userName;
        let password = this.state.password;
        const loginCheck = await axios.get(`http://localhost:8080/user_Login?userName=${userName}&password=${password}`);
        console.log(loginCheck);
        if (loginCheck.data !== true) {
            if (loginCheck.data === false) {
                alert('Wrong Password!!!');
                this.setState({
                    logined: true,
                    loginSuccess: false,
                    changeOver: null
                })
            } else {
                let userId = loginCheck.data[0].userId;
                let userName = loginCheck.data[0].userName;
                let mailId = loginCheck.data[0].userMailId;
                let phoneNumber = loginCheck.data[0].userPhonNumber;
                this.setState({
                    logined: false,
                    loginSuccess: true,
                    userId: userId,
                    userName: userName,
                    mailId: mailId,
                    phoneNumber: phoneNumber
                })
            }
        } else {
            alert('Enter Valid Email You Registered');
        }
    }

    render() {
        return (
            <div>
                {
                    (this.state.logined) ?
                        (
                            <div>
                                <div className="head">
                                    Login Page
                                </div>
                                <div className="midContent">
                                    <form className="registerForm" onSubmit={this.handleLogin}>
                                        <input type="text" name="userName" placeholder="Enter User Name" value={this.state.userName} onChange={this.handleTextChanges} required /><br /><br />
                                        <input type="password" name="password" placeholder="Enter Password" value={this.state.password} onChange={this.handleTextChanges} required /><br /><br />
                                        <button>Submit</button>
                                        <button onClick={this.handleReset}>Reset</button>
                                        <button onClick={this.handleChange}>Home</button>
                                    </form>
                                </div>
                            </div>
                        )
                        :
                        (
                            null
                        )
                }
                {
                    (this.state.loginSuccess) ?
                        (
                            <div>
                                <LoginSuccessful userId={this.state.userId} userName={this.state.userName} mailId={this.state.mailId} phoneNumber={this.state.phoneNumber} />
                            </div>
                        )
                        :
                        (
                            null
                        )
                }
                {
                    (this.state.changeOver) ?
                        (
                            <div>
                                <Index />
                            </div>
                        )
                        :
                        (
                            null
                        )
                }
            </div>
        )
    }
}
