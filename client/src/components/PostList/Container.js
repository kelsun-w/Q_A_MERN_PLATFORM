import { compose } from 'redux';
import { connect } from 'react-redux';
import withAuth from '../../util/withAuth';
import { fetchPosts, fetchProfile } from '../../actions/posts';
import { userGetSavedPosts } from '../../actions/user';
import PostList from './Component';

export const mapStateToProps = state => ({
  posts: state.posts.items,
  isFetching: state.posts.isFetching,
  savedPosts: state.user.savedList
});
const mapDispatchToProps = { fetchPosts, fetchProfile, userGetSavedPosts };

const PostListContainer = compose(
  withAuth,
  connect(mapStateToProps, mapDispatchToProps)
)(PostList);

export default PostListContainer;
