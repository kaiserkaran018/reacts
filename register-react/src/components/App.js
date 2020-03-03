import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import RegisterSuccess from './RegisterSuccess';

export default class App extends Component {
    constructor() {
        super()
        this.state = {
            userName: '',
            password: '',
            confirmPassword: '',
            mailId: '',
            phoneNumber: '',
            editing: true
        }
    }

    handleUserName = (e) => {
        e.preventDefault();
        this.setState({
            userName: e.target.value
        })
    }

    handlePassword = (e) => {
        e.preventDefault();
        this.setState({
            password: e.target.value
        })
    }

    handleConfirmPassword = (e) => {
        e.preventDefault();
        this.setState({
            confirmPassword: e.target.value
        })
    }

    handleMailId = (e) => {
        e.preventDefault();
        this.setState({
            mailId: e.target.value
        })
    }

    handlePhoneNumber = (e) => {
        e.preventDefault();
        this.setState({
            phoneNumber: e.target.value
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

    handleRegisterSubmit = async (e) => {
        e.preventDefault();
        let userName = this.state.userName;
        let password = this.state.password;
        let confirmPassword = this.state.confirmPassword;
        let mailId = this.state.mailId;
        let phoneNumber = this.state.phoneNumber;
        if (password === confirmPassword) {
            const isEmailExist = await axios.get(`http://localhost:8080/user_Mail_Check?mailId=${mailId}`);
            console.log('is Email ', isEmailExist);
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
                    editing: false
                })
            } else if (isEmailExist.data[0].userMailId === mailId) {
                alert('Email Already Exists');
            }
        } else {
            alert('Password & Confirm Password Mismatch');
            this.setState({
                password: '',
                confirmPassword: ''
            })
        }
    }

    render() {
        return (
            <div>
                {(this.state.editing)
                    ?
                    (<div>
                        <div className="head">
                            Register Page
                    </div>
                        <div className="form">
                            <form className="registerForm" onSubmit={this.handleRegisterSubmit}>
                                <input type="text" name="userName" placeholder="Enter User Name" value={this.state.userName} onChange={this.handleUserName} required /><br /><br />
                                <input type="password" name="password" placeholder="Enter Password" value={this.state.password} onChange={this.handlePassword} required /><br /><br />
                                <input type="password" name="confirmPassword" placeholder="Enter Confirm Password" value={this.state.confirmPassword} onChange={this.handleConfirmPassword} required /><br /><br />
                                <input type="mail" name="mailId" placeholder="Enter Mail Id" value={this.state.mailId} onChange={this.handleMailId} required /><br /><br />
                                <input type="number" name="phoneNumber" placeholder="Enter Phone Number" value={this.state.phoneNumber} onChange={this.handlePhoneNumber} required /><br /><br />
                                <button>Submit</button>
                                <button onClick={this.handleReset}>Reset</button>
                            </form>
                        </div>
                    </div>)
                    :
                    (<div>
                        <RegisterSuccess userName={this.state.userName} mailId={this.state.mailId} />
                    </div>)
                }
            </div>
        )
    }
}
