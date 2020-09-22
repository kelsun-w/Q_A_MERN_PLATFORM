import React from 'react';
import styled from 'styled-components/macro';
import { Route } from 'react-router-dom';
import HomeMainSection from './MainSection';
import CategoryMenuContainer from '../CategoryMenu/Container';
import PostListContainer from '../PostList/Container';
import PostDetailContainer from '../PostDetail/Container';
import Sidebar from '../Sidebar/Sidebar';

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
    <Route component={Sidebar} />
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
      <Route
        exact
        path='/community/discover'
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
