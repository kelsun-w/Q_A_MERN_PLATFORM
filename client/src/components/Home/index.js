import React from 'react';
import styled from 'styled-components/macro';
import { Route } from 'react-router-dom';
import HomeMainSection from './MainSection';
import CategoryMenuContainer from '../CategoryMenu/Container';
import PostListContainer from '../PostList/Container';
import PostDetailContainer from '../PostDetail/Container';
import SidebarContainer from '../Sidebar/Container';

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
    <Route component={SidebarContainer} />
    <HomeMainSection>
      <Route component={CategoryMenuContainer} />
      <Route exact path='/' component={PostListContainer} />
      <Route
        exact
        path='/a/:category'
        render={({ match }) => (
          <PostListContainer category={match.params.category} />
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
        path='/a/:category/:post'
        render={({ match, history }) => (
          <PostDetailContainer id={match.params.post} history={history} />
        )}
      />
      <Route
        exact
        path='/circles/discover'
        render={({ match, history }) => (
          <>
            <h1>Discover new circles!</h1>
            <h2>{match.path}</h2>
            <h3>Circles will be shown here!</h3>
          </>
        )}
      />
    </HomeMainSection>
  </Wrapper>
);

export default Home;
