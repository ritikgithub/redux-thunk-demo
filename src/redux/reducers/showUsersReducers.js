import { SHOW_USERS, SHOW_POSTS } from '../actionTypes/showUsersActionTypes';
const initialState = {
    showUsers: true
}

const showUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_USERS:
            return {
                ...state,
                showUsers: true
            }
        case SHOW_POSTS:
            return {
                ...state,
                showUsers: false
            }
        default:
            return {
                ...state
            }
    }
}

export default showUserReducer;