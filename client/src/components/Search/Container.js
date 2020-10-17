import { connect } from 'react-redux';
import { compose } from 'redux';
import withAuth from '../../util/withAuth';
import { attemptSearchPosts } from '../../actions/posts';
import {
    attemptSearchUsers,
    userGetSavedPosts
} from '../../actions/user';
import Component from './Component';

const mapStateToProps = state => ({
    postFetching: state.posts.isFetching,
    posts: state.posts.items,
    userFetching: state.user.fetching,
    users: state.user.searchList,
    saveFetching: state.user.fetching,
    savedPosts: state.user.savedList
});

const mapDispatchToProps = {
    attemptSearchPosts,
    attemptSearchUsers,
    userGetSavedPosts
};

const enhance = compose(
    withAuth,
    connect(mapStateToProps, mapDispatchToProps)
);

const SearchContainer = enhance(Component);

export default SearchContainer;
