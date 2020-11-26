import React from 'react';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FullPageMessage from '../shared/FullPageMessage';
import PostListItem from './Item';
import LoadingIndicatorBox from '../shared/LoadingIndicator/Box';

const List = styled.ul`
  list-style: none;
`;

const EMPTY_MSG = `There's nothing here`;

class PostList extends React.Component {
  loadPosts = () => {
    const { username, category } = this.props;
    if (username) return this.props.fetchProfile(username);
    this.props.fetchPosts(category);
  };

  componentDidMount() {
    this.loadPosts();
    const { user, username, userGetSavedPosts } = this.props;
    if (user && user.username === username)
      userGetSavedPosts(user.id);
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.category !== prevProps.category ||
      this.props.username !== prevProps.username
    ) {
      this.loadPosts();

      const { user, username, userGetSavedPosts } = this.props;
      if (user && user.username === username)
        userGetSavedPosts(user.id);
    }
  };

  mapPosts = () => {
    const { savedPosts, posts, user } = this.props;
    var savelist = savedPosts ? savedPosts : user && user.saved;

    var postlist = posts && posts.map((post, index) => {
      let alreadySaved = false;
      alreadySaved = savelist
        && (savelist.find(p => p.id === post.id)) != null;

      return <PostListItem saved={alreadySaved} key={index} {...post} />
    });
    
    if (!postlist || postlist.length === 0) {
      return <FullPageMessage>
        <FontAwesomeIcon icon='wind' />
        <span>{EMPTY_MSG}</span>
      </FullPageMessage>
    }
    return postlist;
  };

  mapSavedPosts = () => {
    const { savedPosts } = this.props;

    var savedlist = savedPosts && savedPosts.map((post, index) => {
      return <PostListItem saved key={index} {...post} />
    });

    if (!savedlist || savedlist.length === 0) {
      return <FullPageMessage>
        <FontAwesomeIcon icon='wind' />
        <span>{EMPTY_MSG}</span>
      </FullPageMessage>
    }
    return savedlist;
  };

  render() {
    if (this.props.isFetching) return <LoadingIndicatorBox />;
    return <List>
      {this.props.showSaved ?
        this.mapSavedPosts()
        : this.mapPosts()}
    </List>;
  };
}

export default PostList;
