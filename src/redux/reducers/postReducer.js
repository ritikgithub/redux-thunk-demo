import * as actionsTypes from '../actionTypes/postActionTypes';

const initialState = {
    loading: false,
    posts: [],
    error: ''
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.FETCH_POSTS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case actionsTypes.FETCH_POSTS_SUCCESS:
            return {
                posts: action.payload,
                loading: false,
                error: ''
            }

        case actionsTypes.FETCH_POSTS_ERROR:
            return {
                loading: false,
                error: action.payload,
                posts: []
            }
        case actionsTypes.ADD_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload]
            }
        default:
            return {
                ...state
            }
    }
}

export default postReducer;