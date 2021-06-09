import { FETCH_USERS_ERROR, FETCH_USERS_SUCCESS, FETCH_USERS_REQUEST, ADD_USER, DELETE_USER, UPDATE_USER, DELETE_MULTIPLE_USER } from '../actionTypes/userActionTypes';

const fetchUsersRequest = () => ({
    type: FETCH_USERS_REQUEST
});

const fetchUsersSuccess = (users) => ({
    type: FETCH_USERS_SUCCESS,
    payload: users
});

const fetchUsersError = (error) => ({
    type: FETCH_USERS_ERROR,
    payload: error
});

const fetchUsers = () => {
    return function (dispatch) {
        dispatch(fetchUsersRequest);
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(res => {
                let users = res.map(user => ({ id:user.id, name: user.name, email: user.email, website: user.website }))
                dispatch(fetchUsersSuccess(users));
            }).catch(err => {
                console.log("djfbs");
                dispatch(fetchUsersError(err.message));
            })
    }
}

export const addUser = (user) => ({
    type: ADD_USER,
    payload: user
})

export const deleteUser = (id) => ({
    type: DELETE_USER,
    payload: id
})

export const updateUser = (user) => ({
    type: UPDATE_USER,
    payload: user
})

export const deleteMultipleUser = (ids) => ({
    type: DELETE_MULTIPLE_USER,
    payload: ids
})

export default fetchUsers;