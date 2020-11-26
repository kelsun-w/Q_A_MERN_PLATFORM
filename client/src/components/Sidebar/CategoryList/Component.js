import React from 'react';
import styled from 'styled-components/macro';
import SidebarCategoryListItem from './Item';

const CategoryList = styled.nav`
  display: flex;
  flex-direction: column;
`;

const SidebarHeading = styled.div`
  color: ${props => props.theme.normalText};
  font-size: 13px;
  font-weight: 500;
  padding: 4px 0px 4px 8px;
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
    categories.map((category, index) => {
      const IMG_URL = category && category.picture ? `${process.env.REACT_APP_IMG_URL_CA}/${category.name}` : `${process.env.PUBLIC_URL}/images/communityprofile.png`;
      return <SidebarCategoryListItem key={index} category={category.name} logo={IMG_URL} />
    });

  render() {
    if (!this.props.communities)
      return null;
    return (
      <CategoryList>
        <SidebarCategoryListItem category='all' logo='home' />
        {this.props.user && <SidebarHeading>Community following:</SidebarHeading>}
        {this.mapCategories(this.props.communities)}
        {this.props.user && <SidebarCategoryListItem category='discover more' logo='plus' />}
      </CategoryList>
    )
  };
}

export default SidebarCategoryList;
