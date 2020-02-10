import TodoItem from './TodoItem';
import React from 'react';

class TodoList extends React.Component {
    render() {
        return (
            <ul> {
                this.props.items.map(item => (
                    <TodoItem key={item.id} id={item.id} text={item.text} completed={item.done} onItemCompleted={this.props.onItemCompleted} onDeleteItem={this.props.onDeleteItem} onchangeItem={this.props.onchangeItem} onedit={this.props.onedit} />
                ))
            }
            </ul>);
    }
}

export default TodoList;
