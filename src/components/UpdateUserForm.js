import { Button, TextField } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { updateUser } from '../redux/actions/userActions';


const useStyles = makeStyles(() => ({
   textfield: {
       width: '250px',
       marginBottom:'10px'
   },
   button: {
       width:'150px'
   }
  }));



function UpdateUserForm(props) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const {updatedName, updatedEmail,updatedWebsite, updatedUserId} = props.user;
    const {updateDetails} = props;

    function updateuserHandler() {
        if(updatedName==='' || updatedEmail==="" || updatedWebsite==="")
            return;
        dispatch(updateUser({id: updatedUserId, updatedName,updatedEmail,updatedWebsite}));
        alert("User details Updated Successfully!!");
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="d-flex flex-column">
                <TextField className={classes.textfield} value={updatedName} onChange={(e)=>updateDetails('updatedName', e.target.value)} label="UpdatedName" />
                <TextField className={classes.textfield} value={updatedEmail} onChange={(e)=>updateDetails('updatedEmail', e.target.value)} label="UpdatedEmail" />
                <TextField  className={classes.textfield} value={updatedWebsite} onChange={(e)=>updateDetails('updatedWebsite', e.target.value)} label="UpdatedWebsite" />
                <Button variant="contained" color="primary" className={classes.button} onClick={updateuserHandler}>UPDATE USER</Button>
            </div>
        </div>
    )
}

export default UpdateUserForm
