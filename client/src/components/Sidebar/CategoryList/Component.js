import React from 'react';
import styled from 'styled-components/macro';
import SidebarCategoryListItem from './Item';

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
      <SidebarCategoryListItem key={index} category={category.name} logo={`${process.env.REACT_APP_IMG_URL_CA}/${category.name}`} />
    ));

  render() {
    if (!this.props.communities)
      return null;
    return (
      <CategoryList>
        <SidebarCategoryListItem category='all' logo='home' />
        {this.mapCategories(this.props.communities)}
        {this.props.user && <SidebarCategoryListItem category='discover more' logo='plus' />}
      </CategoryList>
    )
  };
}

export default SidebarCategoryList;
