const todos = (state = [], action) => {
    switch (action.type) {

        case "TOGGLE_TODO":
            return state.map(t => {
                if (state.id !== action.id)
                    return state;
                return {
                    ...state,
                    completed: !state.completed
                };
            });

        case 'NEW_ADDED':
            return [...action.data];

        default:
            return state;
    }
};

export default todos;
