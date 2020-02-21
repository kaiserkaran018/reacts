import React from 'react';
import './App.css';

const UserName = (props) => {
    const username = props.username;
    return (
        <div className="lister">
            {username ? username.map((name) => (
                <h4 key={name.userid}>Welcome {name.username} </h4>
            )) : null
            }
        </div>
    )
}

export default UserName;