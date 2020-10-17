import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import form from './reducers/form';
import user from './reducers/user';
import error from './reducers/error';
import auth from './reducers/auth';
import posts from './reducers/posts';
import community from './reducers/community';
import report from './reducers/reports';
import theme from './reducers/theme';
import authMiddleware from './middleware/auth';
import errorMiddleware from './middleware/error';
import themeMiddleware from './middleware/theme';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  combineReducers({ form, error, auth, user, posts, community, report, theme }),
  composeEnhancers(
    applyMiddleware(thunk, authMiddleware, errorMiddleware, themeMiddleware)
  )
);
