import withAuth from '../../util/withAuth';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Component from './Component';

const mapStateToProps = state => ({
    postid: state.posts.post.id
});

const enhance = compose(
    withAuth,
    connect(
        mapStateToProps,
        null
    )
);

const CommentContainer = enhance(Component);

export default CommentContainer;