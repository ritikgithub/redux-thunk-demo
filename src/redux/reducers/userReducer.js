import * as actionsTypes from '../actionTypes/userActionTypes';

const initialState = {
    loading: false,
    users: [],
    error: ''
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionsTypes.FETCH_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload,
                loading: false,
                error: ''
            }

        case actionsTypes.FETCH_USERS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
                users:[]
            }
        
        case actionsTypes.ADD_USER:
            return {
                ...state,
                users: [...state.users,action.payload]
            }
        case actionsTypes.DELETE_USER:
            let users = state.users.filter(user=>user.id!==action.payload)
            return {
                ...state,
                users: users
            }
        case actionsTypes.UPDATE_USER:
            let allUsers = [...state.users];
           let userIndex =  allUsers.findIndex(user=>user.id===action.payload.id) 
           allUsers[userIndex].name = action.payload.updatedName;
           allUsers[userIndex].email = action.payload.updatedEmail;
           allUsers[userIndex].website = action.payload.updatedWebsite;
           return {
               ...state,
               users: allUsers
           }
        case actionsTypes.DELETE_MULTIPLE_USER:
            let filteredUsers = state.users.filter(user => !action.payload.includes(user.id.toString()));
            return {
                ...state,
                users: filteredUsers
            }
        default:
            return state
    }
}

export default userReducer;