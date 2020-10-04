import React from 'react';
import styled from 'styled-components/macro';
import { Route } from 'react-router-dom';
import HomeMainSection from './MainSection';
import CategoryMenuContainer from '../CategoryMenu/Container';
import PostListContainer from '../PostList/Container';
import PostDetailContainer from '../PostDetail/Container';
import Sidebar from '../Sidebar/Sidebar';
import DiscoverMenu from '../discoverMenu/Container';
import UserSetting from '../UserSetting/Container';
import ModSetting from '../Moderation/Container';

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 0 10vw 0 5vw;
  
  @media (max-width: 1024px) {
    margin: 0 5vw 0 2.5vw;
  }

  @media (max-width: 768px) {
    display: block;
    margin: 0;
  }
`;

const Home = () => (
  <Wrapper>
    <Route render={({ location }) => {
      switch (location.pathname) {
        case ('/community/discover'):
          return null;
        default:
          return (<Sidebar />)
      }
    }}
    />
    <Route
      exact
      path='/community/discover'
      component={DiscoverMenu}
    />
    <HomeMainSection>
      <Route exact path='/' render={() => (
        <>
          <CategoryMenuContainer />
          <PostListContainer />
        </>
      )}
      />
      <Route
        exact
        path='/c/:category'
        render={({ match }) => (
          <>
            <CategoryMenuContainer />
            <PostListContainer category={match.params.category} />
          </>
        )}
      />
      <Route
        exact
        path='/u/:username'
        render={({ match }) => (
          <PostListContainer username={match.params.username} />
        )}
      />
      <Route
        exact
        path='/c/:category/:post'
        render={({ match, history }) => (
          <PostDetailContainer id={match.params.post} history={history} />
        )}
      />
      <Route path='/settings'
        render={({ match, history }) => (
          <UserSetting history={history} />
        )}
      />
      <Route path='/mod/:community' render={
        ({ match, history }) => (
          <ModSetting id={match.params.community} history={history} path={match.path} />
        )
      }
      />
    </HomeMainSection>
  </Wrapper>
);

export default Home;
