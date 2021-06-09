import { Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { addPost } from '../redux/actions/postAction';
import { useHistory } from 'react-router';

const useStyles = makeStyles(() => ({
   textfield: {
       width: '250px',
       marginBottom:'10px'
   },
   button: {
       width:'150px'
   }
  }));



function AddPost() {

    const classes = useStyles();
    const [title, settitle] = useState('');
    const [body, setbody] = useState('');
    const dispatch = useDispatch();
    let history = useHistory();

    function addPostHandler() {
        if(title==='' || body==="")
            return;
        dispatch(addPost({title,body}));
        history.push('/');
    }

    return (
        <div className="d-flex justify-content-center">
        <div className="d-flex flex-column mt-5">
            <TextField className={classes.textfield} value={title} onChange={(e)=>settitle(e.target.value)} label="Title" />
            <TextField className={classes.textfield} value={body} onChange={(e)=>setbody(e.target.value)} label="Body" />
            <Button variant="contained" color="primary" className={classes.button} onClick={addPostHandler}>Add Post</Button>
        </div>

        </div>
    )
}

export default AddPost
