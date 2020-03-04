import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import RegisterSuccess from './RegisterSuccess';
import Index from './index';

export default class App extends Component {
    constructor() {
        super()
        this.state = {
            userName: '',
            password: '',
            confirmPassword: '',
            mailId: '',
            phoneNumber: '',
            editing: true,
            registered: false,
            changeOver: null
        }
    }

    handleTextChanges = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleReset = (e) => {
        e.preventDefault();
        this.setState({
            userName: '',
            password: '',
            confirmPassword: '',
            mailId: '',
            phoneNumber: ''
        })
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            changeOver: true,
            registered: false,
            editing: false
        })
    }

    handleRegisterSubmit = async (e) => {
        e.preventDefault();
        let userName = this.state.userName;
        let password = this.state.password;
        let confirmPassword = this.state.confirmPassword;
        let mailId = this.state.mailId;
        let phoneNumber = this.state.phoneNumber;
        let validate = '^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]'
        if (mailId.match(validate)) {
            if (password === confirmPassword) {
                const isEmailExist = await axios.get(`http://localhost:8080/user_Mail_Check?mailId=${mailId}`);
                if (isEmailExist.data.length === 0) {
                    await axios.post('http://localhost:8080/user_Details_Post', {
                        "userName": userName,
                        "password": password,
                        "mailId": mailId,
                        "phoneNumber": phoneNumber
                    });
                    this.setState({
                        userName: userName,
                        mailId: mailId,
                        editing: false,
                        registered: true
                    })
                } else if (isEmailExist.data[0].userMailId === mailId) {
                    alert('Email Already Exists');
                    this.setState({
                        mailId: ''
                    })
                }
            } else {
                alert('Password & Confirm Password Mismatch');
                this.setState({
                    password: '',
                    confirmPassword: ''
                })
            }
        } else {
            alert('Enter Valid Mail id');
        }
    }

    render() {
        return (
            <div>
                {
                    (this.state.editing) ?
                        (
                            <div>
                                <div className="head">
                                    Register Page
                            </div>
                                <div className="midContent">
                                    <form onSubmit={this.handleRegisterSubmit}>
                                        <input type="text" name="userName" placeholder="Enter User Name" value={this.state.userName} onChange={this.handleTextChanges} required /><br /><br />
                                        <input type="password" name="password" placeholder="Enter Password" value={this.state.password} onChange={this.handleTextChanges} required /><br /><br />
                                        <input type="password" name="confirmPassword" placeholder="Enter Confirm Password" value={this.state.confirmPassword} onChange={this.handleTextChanges} required /><br /><br />
                                        <input type="mail" name="mailId" placeholder="Enter Mail Id" value={this.state.mailId} onChange={this.handleTextChanges} required /><br /><br />
                                        <input type="number" name="phoneNumber" placeholder="Enter Phone Number" value={this.state.phoneNumber} onChange={this.handleTextChanges} required /><br /><br />
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
                    (this.state.registered) ?
                        (
                            <div>
                                <RegisterSuccess userName={this.state.userName} mailId={this.state.mailId} />
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
