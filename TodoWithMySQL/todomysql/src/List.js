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

// const List = (props) => {
//     const tododata = props.tododata;
//     const todoid = props.todoid;
//     console.log(tododata, todoid);
//     return (
//         <div className="lister">
//             {tododata ? tododata.map((elements) => (
//                 <ul key={elements.id}>
//                     <span> todo-id : </span> {elements.id} <br />
//                     <span> todo-message : </span>
//                     {elements.message}<br /><br />
//                 </ul>
//             )) : 'No Data For This ID'
//             }
//         </div>
//     )
// }
