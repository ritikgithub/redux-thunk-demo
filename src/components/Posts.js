import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Posts(props) {

    const postState = useSelector(state => state.postState);
        const [posts, setPosts] = useState(postState.posts);
    return (
        postState.loading ? <div className="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
        </div> : postState.error ? <div className="danger"> {postState.error} </div> :
            <div>
                <div className="h4 text-center">Posts</div>
                <div className="h4 text-center mt-4">
                    <Link to='/addpost'>ADD POST</Link>
                </div>
                <div className="d-flex flex-wrap justify-content-around">

                    {postState.posts.map(post => (

                        <div class="card m-2" style={{ width: "18rem" }}>
                            <div class="card-body">
                                <h5 class="card-title">{post.title}</h5>
                                <p class="card-text">{post.body}</p>
                            </div>
                        </div>))
                    }
                </div>
               
            </div>

    )

}




export default Posts
