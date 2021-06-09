import './App.css';
import Users from './components/Users';
import { showUser, showPost } from './redux/actions/showUserAction'
import { useEffect } from 'react';
import fetchUsers from './redux/actions/userActions'
import fetchPosts from './redux/actions/postAction';
import Posts from './components/Posts';
import { connect } from "react-redux";
import AddUser from './components/AddUser';
import { BrowserRouter, Route } from 'react-router-dom';
import AddPost from './components/AddPost';

function App(props) {
  useEffect(() => {
    props.fetchUsers();
  }, [])

  useEffect(() => {
    props.fetchPosts();
  }, [])
  console.log("App rerenders");
  return (
    <BrowserRouter>
      <Route exact path='/'>
        <div>
          <div className="d-flex justify-content-around mt-2">
            <button className="btn btn-primary" onClick={() => props.showUser()}>Show Users</button>
            <button className="btn btn-primary" onClick={() => props.showPost()}>Show Posts</button>
          </div>
          <div className="mt-4">
            {props.showUsers ?  <Posts /> : <Users />}
          </div>
        </div>
      </Route>
      <Route exact path='/adduser'><AddUser /></Route>
      <Route exact path='/addpost'><AddPost /></Route>
    </BrowserRouter>

  );
}

const mapStateToProps = ({ showUserState }) => ({
  showUsers: showUserState.showUsers
});

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: () => dispatch(fetchUsers()),
  fetchPosts: () => dispatch(fetchPosts()),
  showPost: () => dispatch(showPost()),
  showUser: () => dispatch(showUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
