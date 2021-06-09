import { Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { addUser } from '../redux/actions/userActions';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles(() => ({
   textfield: {
       width: '250px',
       marginBottom:'10px'
   },
   button: {
       width:'150px'
   }
  }));



function AddUser() {

    const classes = useStyles();
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [website, setwebsite] = useState('')
    const dispatch = useDispatch();
    let history = useHistory();

    function addUserHandler() {
        if(name==='' || email==="" || website==="")
            return;
        dispatch(addUser({id: uuidv4(), name,email,website}));
        history.push('/');
    }

    return (
        <div className="d-flex justify-content-center">
        <div className="d-flex flex-column mt-5">
            <TextField className={classes.textfield} value={name} onChange={(e)=>setname(e.target.value)} label="Name" />
            <TextField className={classes.textfield} value={email} onChange={(e)=>setemail(e.target.value)} label="Email" />
            <TextField  className={classes.textfield} value={website} onChange={(e)=>setwebsite(e.target.value)} label="website" />
            <Button variant="contained" color="primary" className={classes.button} onClick={addUserHandler}>Add USER</Button>
        </div>

        </div>
    )
}

export default AddUser
