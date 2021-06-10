import { Button } from '@material-ui/core';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import fetchPosts, { deleteMultiplePost } from '../redux/actions/postAction';
import _ from "lodash";

function Posts(props) {

    const postState = useSelector(state => state.postState);
    const dispatch = useDispatch();

    const [postIdsToBeDeleted, setpostIdsToBeDeleted] = useState({});
    const [filteredPosts, setfilteredPosts] = useState(postState.posts);

    useEffect(() => {
        setfilteredPosts(postState.posts)
    }, [postState])

    const checkboxChangehandler = (e) => {
        setpostIdsToBeDeleted({
            ...postIdsToBeDeleted,
            [e.target.name]: e.target.checked
        })
    }

    const multipleDeleteHandler = () => {
        let idsObj = postIdsToBeDeleted;
        let ids = [];
        for (let key in idsObj) {
            if (idsObj[key]) {
                ids.push(key);
            }
        }
        dispatch(deleteMultiplePost(ids));
        setpostIdsToBeDeleted({})
    }

    const searchHandler = _.debounce((e) => {
        let filtered = postState.posts.filter(post => post.title.includes(e.target.value));
        setfilteredPosts(filtered);
    }, 1000)

    return (
        postState.loading ? <div className="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
        </div> : postState.error ? <div className="danger"> {postState.error} </div> :
            <div>
                <div className="h4 text-center">Posts</div>
                <div className="text-center mt-4">
                    <input type="search" placeholder="Search User" onChange={searchHandler}></input>
                </div>
                <div className="h4 text-center mt-4">
                    <Button variant="contained" onClick={multipleDeleteHandler}>Delete Multiple</Button>
                </div>
                <div className="h4 text-center mt-4">
                    <Link to='/addpost'>ADD POST</Link>
                </div>
                <div className="d-flex flex-wrap justify-content-around">

                    {filteredPosts.map(post => (

                        <div key={post.id} class="card m-2" style={{ width: "18rem" }}>
                            <div class="card-body">
                                <h5 class="card-title">{post.title}</h5>
                                <p class="card-text">{post.body}</p>
                                <input type="checkbox" className="form-check-input" name={post.id} onChange={checkboxChangehandler} />
                            </div>
                        </div>))
                    }
                </div>

            </div>

    )

}




export default Posts
