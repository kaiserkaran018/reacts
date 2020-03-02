import React from 'react';
import './App.css';

const List = (props) => {
    const tododata = props.tododata;
    return (
        <div className="lister">
            {tododata ? tododata.map((elements) => (
                <ul key={elements.todoid}>
                    <li> <input type="checkbox" />{elements.todomessages}</li><br />
                </ul>
            )) : 'No Data For This ID'
            }
        </div>
    )
}

export default List;
