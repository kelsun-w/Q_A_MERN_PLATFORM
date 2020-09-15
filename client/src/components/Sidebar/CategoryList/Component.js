import React from 'react';
import styled from 'styled-components/macro';
import SidebarCategoryListItem from './Item';
// import categories from '../../../categories';

const CategoryList = styled.nav`
  display: flex;
  flex-direction: column;
`;

class SidebarCategoryList extends React.Component {

  loadCategories = () => {
    const { fetchCommunities, user } = this.props;
    if (user)
      fetchCommunities(user.id);
    else
      fetchCommunities('');
  };

  componentDidMount() {
    this.loadCategories();
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if ((prevProps.user && !this.props.user) || this.props.user && prevProps.user.id !== this.props.user.id)
      this.loadCategories();
  };

  mapCategories = categories =>
    categories.map((category, index) => (
      <SidebarCategoryListItem key={index} category={category.name} icon='hand-holding-heart' />
    ));

  render() {
    if (!this.props.communities)
      return null;
    console.log(this.props.communities)
    return (
      <CategoryList>
        <SidebarCategoryListItem category='all' icon='hand-holding-heart' />
        {this.mapCategories(this.props.communities)}
        <SidebarCategoryListItem category='discover more' icon='plus' />
      </CategoryList>
    )
  };
}

export default SidebarCategoryList;
