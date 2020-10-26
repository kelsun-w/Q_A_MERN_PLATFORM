import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Router, Route, Switch,Link } from 'react-router-dom';
import theme from '../../theme';
import history from '../../util/history';
import GlobalStyle from '../../globalStyle';
import HeaderContainer from '../Header/Container';
import ErrorNotificationContainer from '../ErrorNotification/Container';
import LoginFormContainer from '../LoginForm/Container';
import SignupFormContainer from '../SignupForm/Container';
import CreatePostFormContainer from '../CreatePostForm/Container';
import SearchContainer from '../Search/Container';
import Home from '../Home';
import FullPageMessage from '../shared/FullPageMessage';

const App = props => (
  <ThemeProvider theme={theme(props.dark)}>
    <Router history={history}>
      <>
        <GlobalStyle />
        <Route
          render={({ history }) =>
            <HeaderContainer history={history} />
          }
        />
        <Route component={ErrorNotificationContainer} />
        <Switch>
          <Route path='/login' component={LoginFormContainer} />
          <Route path='/signup' component={SignupFormContainer} />
          <Route path='/unauthorised' render={() =>
            <FullPageMessage>
              <img src={`${process.env.PUBLIC_URL}/images/error.png`} />
              <span>401 - Sorry you cannot access this</span>
              <Link to='/'>Back to Home</Link>
            </FullPageMessage>
          } />
          <Route path='/createpost/:type'
            render={({ match, history }) =>
              <CreatePostFormContainer history={history} initialValues={{ type: match.params.type }} />
            }
          />
          <Route
            path='/search/:query'
            render={({ match }) =>
              <SearchContainer query={match.params.query} />}
          />
          <Route path='/' component={Home} />
        </Switch>
      </>
    </Router>
  </ThemeProvider>
);

export default App;
