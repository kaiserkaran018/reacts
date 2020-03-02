import './index.css';
import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import todos from './reducers/todos';
import { Provider } from "react-redux";
import TodoApp from './components/TodoApp';

export default ReactDOM.render(
    (
        <Provider store={createStore(todos)}>
            <TodoApp />
        </Provider>
    ),
    document.getElementById("root")
);

