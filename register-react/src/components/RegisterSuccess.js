import React, { Component } from 'react'

export default class RegisterSuccess extends Component {
    constructor(props) {
        super(props)
        console.log(props);
        this.state = {
            userName: this.props.userName,
            mailId: this.props.mailId
        }
    }
    render() {
        return (
            <div><br />
                Register Success !!!!!<br /><br />
                Hi {this.state.userName} your user name is {this.state.mailId}
            </div>
        )
    }
}
