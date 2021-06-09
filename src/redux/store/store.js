import { createStore , combineReducers , applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import postReducer from '../reducers/postReducer';
import userReducer from '../reducers/userReducer';
import showUserReducer from '../reducers/showUsersReducers'

const rootReducer = combineReducers({
    userState: userReducer,
    postState: postReducer,
    showUserState: showUserReducer
})

const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));

export default store;