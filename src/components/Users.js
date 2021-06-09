import { Link } from "react-router-dom";
import { Component } from "react";
import { connect } from 'react-redux'
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import { deleteMultipleUser, deleteUser } from "../redux/actions/userActions";
import Modal from "./Modal";
import UpdateUserForm from "./UpdateUserForm";
import { Button } from "@material-ui/core";
import _ from "lodash";
class Users extends Component {
    constructor(props) {
        console.log(props);
        super(props);
        this.state = {
            updatedName: '',
            updatedEmail: '',
            updatedWebsite: '',
            updatedUserId: '',
            userIdsToBeDeleted: {},
            filteredUsers:this.props.users
        }
    } 

    // static getDerivedStateFromProps(nextProps, prevState) {
       
    //       return ({ filteredUsers: nextProps.users });
    //   }
    
    deletehandler = (id) => {
        this.props.deleteUser(id);
    }

    updatehandler = (user) => {
        this.setState({
            updatedName: user.name,
            updatedEmail: user.email,
            updatedWebsite: user.website,
            updatedUserId: user.id
        })
    }

    updateDetails = (key, value) => {
        this.setState({ [key]: value })
    }

    checkboxChangehandler = (e) => {
        this.setState({
            userIdsToBeDeleted: {
                ...this.state.userIdsToBeDeleted,
                [e.target.name]: e.target.checked
            }
        })
    }

    multipleDeleteHandler = () => {
        let idsObj = this.state.userIdsToBeDeleted;
        let ids = [];
        for (let key in idsObj) {
            if (idsObj[key]) {
                ids.push(key);
            }
        }
        this.props.deleteMultipleUser(ids);
        this.setState({
            userIdsToBeDeleted: {}
        });
    }

    searchHandler =  _.debounce((e)=> {
            console.log("I am executed");
            let filtered = this.props.users.filter(user=> user.name.includes(e.target.value));
            this.setState({
                filteredUsers:filtered
            })
        },1000)
    

    render() {
        console.log(this.props);
        console.log(this.state.filteredUsers);
        console.log("Users rerenders");
        return (
            this.props.loading ? <div className="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div> : this.props.error ? <div className="danger"> {this.props.error} </div> :
                <div>
                    <div className="h4 text-center">Users</div>
                    <div className="text-center mt-4">
                        <input type="search" placeholder="Search User" onChange={this.searchHandler}></input>
                    </div>
                    <div className="h4 text-center mt-4">
                        <Button variant="contained" onClick={this.multipleDeleteHandler}>Delete Multiple</Button>
                    </div>
                    <div className="h4 text-center mt-4">
                        <Link to='/adduser'>ADD USER</Link>
                    </div>
                    <div className="d-flex flex-wrap justify-content-around">
                        {this.state.filteredUsers.map(user => (
                            <div key={user.id} class="card m-2" style={{ width: "18rem" }}>
                                <div class="card-body">
                                    <div className="d-flex justify-content-between">
                                        <h5 class="card-title">{user.name}</h5>
                                        <div className="d-flex">
                                            <div style={{ cursor: 'pointer' }} onClick={() => this.deletehandler(user.id)}><CloseIcon /></div>
                                            {/* <div style={{ cursor: 'pointer' }} onClick={() => this.updatehandler(user)}> */}
                                            <div style={{ cursor: 'pointer' }} data-toggle="modal" data-target="#exampleModal" onClick={() => this.updatehandler(user)}>
                                                <EditIcon />
                                            </div>
                                            {/* </div> */}
                                        </div>
                                    </div>
                                    <h6 class="card-subtitle mb-2 text-muted">{user.email}</h6>
                                    <p class="card-text">{user.website}</p>
                                    <input type="checkbox" className="form-check-input" name={user.id} onChange={this.checkboxChangehandler} />
                                </div>
                            </div>))
                        }
                    </div>


                    <Modal>
                        <UpdateUserForm user={this.state} updateDetails={this.updateDetails} />
                    </Modal>
                </div>
        )

    }
}

const mapStateToProps = ({ userState }) => {
    return { ...userState }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteUser: (id) => dispatch(deleteUser(id)),
        deleteMultipleUser: (ids) => dispatch(deleteMultipleUser(ids))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);