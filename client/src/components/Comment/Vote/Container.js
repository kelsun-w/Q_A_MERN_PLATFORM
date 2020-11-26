import { connect } from 'react-redux';
import { compose } from 'redux';
import withAuth from '../../../util/withAuth';
import { attemptCommentVote } from '../../../actions/posts';
import CommentVote from './Component';

const mapStateToProps = state => ({
  postId: state.posts.post.id
});

const mapDispatchToProps = { attemptCommentVote };

const enhance = compose(
  withAuth,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

const CommentVoteContainer = enhance(CommentVote);

export default CommentVoteContainer;
