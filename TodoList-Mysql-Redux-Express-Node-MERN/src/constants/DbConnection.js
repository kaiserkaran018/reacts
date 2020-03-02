import axios from 'axios';

export const userPost = async (props) => {
    try {
        console.log(props);
        const id = props[0];
        const user_name = props[1];
        const dispatch = props[2];
        const res = await axios.post('http://localhost:8080/user_Data', {
            "id": id,
            "name": user_name
        });
        const validation = await axios.get(`http://localhost:8080/user_Validation?id=${id}`);
        if (user_name === validation.data[0].user_Name) {
            dispatch({ type: 'NEW_ADDED', data: res.data });
            return res.data;
        } else {
            alert(`Not an Valid User....`);
        }
    } catch (error) {
        alert('error', error);
    }
    return (null);
}

export const todoPost = async (props) => {
    try {
        const id = props[0];
        const message = props[1];
        const dispatch = props[2];
        const res = await axios.post('http://localhost:8080/user_Details', {
            "id": id,
            "message": message
        });
        dispatch({ type: 'NEW_ADDED', data: res.data })
        return res.data;
    } catch (error) {
        alert('error', error);
    }
    return (null);
}

export const updateComplete = async (props) => {
    try {
        let todo_Id = props[0];
        let is_Completed = props[1];
        let user_Id = props[2];
        let dispatch = props[3];
        let res = await axios.post('http://localhost:8080/is_Completed', {
            "todo_Id": todo_Id,
            "is_Completed": is_Completed,
            "user_Id": user_Id
        })
        dispatch({ type: 'NEW_ADDED', data: res.data });

    }
    catch (error) {
        alert(error);
    }
}

export const todoUpdate = async (props) => {
    try {
        console.log(props);
        let todo_Id = props[0];
        let user_Id = props[1];
        let message = props[2];
        let dispatch = props[3];
        let res = await axios.put('http://localhost:8080/todo_Update', {
            "todo_Id": todo_Id,
            "user_Id": user_Id,
            "message": message
        })
        dispatch({ type: 'NEW_ADDED', data: res.data });
    } catch (error) {
        alert(error);
    }
}

export const updateDelete = async (props) => {
    try {
        console.log('in dbconnection', props);
        let todo_Id = props[0];
        let user_Id = props[1];
        let dispatch = props[2];
        let res = await axios.delete(`http://localhost:8080/user_Todo_Delete?id=${todo_Id}&user_id=${user_Id}`);
        dispatch({ type: 'NEW_ADDED', data: res.data });
        console.log('is_Completed', res);

    }
    catch (error) {
        alert(error);
    }
}

