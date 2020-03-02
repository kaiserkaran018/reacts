import { connect } from 'react-redux';
import TodoList from '../components/TodoList';

function mapStateToProps(state) {
    return {
        todos: state,
        view: false
    }
};

function mapDispatchToProps(dispatch) {
    return {
        onTodoClick: todo_Id => dispatch({ type: "TOGGLE_TODO", todo_Id })
    }
};

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default VisibleTodoList;
