import { FETCH_POSTS_ERROR, FETCH_POSTS_SUCCESS, FETCH_POSTS_REQUEST , ADD_POST, DELETE_MULTIPLE_POST} from '../actionTypes/postActionTypes';

const fetchPostsRequest = () => ({
    type: FETCH_POSTS_REQUEST
});

const fetchPostsSuccess = (users) => ({
    type: FETCH_POSTS_SUCCESS,
    payload: users
});

const fetchPostsError = (error) => ({
    type: FETCH_POSTS_ERROR,
    payload: error
});

const fetchPosts = () => {
    return function (dispatch) {
        dispatch(fetchPostsRequest);
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(res => res.json())
            .then(res => {
                dispatch(fetchPostsSuccess(res.map(post=>({id: post.id, title: post.title, body: post.body}))));
            }).catch(err=> {
                dispatch(fetchPostsError(err.message));
            })
    }
}

export const addPost = (post) => ({
    type: ADD_POST,
    payload: post
})

export const deleteMultiplePost = (ids) => ({
    type: DELETE_MULTIPLE_POST,
    payload: ids
})


export default fetchPosts;