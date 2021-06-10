import './App.css';
import Users from './components/Users';
import Posts from './components/Posts';
import AddUser from './components/AddUser';
import { BrowserRouter, Route } from 'react-router-dom';
import AddPost from './components/AddPost';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import fetchUsers from './redux/actions/userActions';
import { connect } from 'react-redux';
import fetchPosts from './redux/actions/postAction';


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
        <div className="d-flex justify-content-around mt-2">
          <Link to="/users">Show Users</Link>
          <Link to="/posts">Show Posts</Link>
        </div>
      </Route>
      <Route exact path='/users'><Users /></Route>
      <Route exact path='/posts'><Posts /></Route>
      <Route exact path='/adduser'><AddUser /></Route>
      <Route exact path='/addpost'><AddPost /></Route>
    </BrowserRouter>
  );
}

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: () => dispatch(fetchUsers()),
  fetchPosts: () => dispatch(fetchPosts())
})

export default connect(null, mapDispatchToProps)(App);
