import React, { Component } from 'react';
import './App.css';

export default class LoginSuccessful extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: props.userId,
            userName: props.userName,
            mailId: props.mailId,
            phoneNumber: props.phoneNumber
        }
    }
    render() {
        return (
            <div>
                {
                    <div className="displayContent">
                        <form>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>
                                            user Id
                                        </th>
                                        <td>
                                            {this.state.userId}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            User Name
                                        </th>
                                        <td>
                                            {this.state.userName}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            Mail-Id
                                        </th>
                                        <td>
                                            {this.state.mailId}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            Phone Number
                                        </th>
                                        <td>
                                            {this.state.phoneNumber}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                }
            </div>
        )
    }
}
