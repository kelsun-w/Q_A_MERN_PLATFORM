import { connect } from 'react-redux';
import { compose } from 'redux';
import withAuth from '../../../util/withAuth';
import CategoryList from './Component';
import { fetchCommunities } from '../../../actions/community';

const mapStateToProps = state => ({
    communities: state.community.items,
    isFetching: state.community.isFetching
});
const mapDispatchToProps = { fetchCommunities };

const enhance = compose(
    withAuth,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
);

const CategoryListContainer = enhance(CategoryList);

export default CategoryListContainer;

