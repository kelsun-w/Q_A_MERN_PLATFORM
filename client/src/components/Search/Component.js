import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LoadingIndicator from '../shared/LoadingIndicator/Box';
import FullPageMessage from '../shared/FullPageMessage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PostListItem from '../PostList/Item';
import UserListItem from './UserItem';
import Header from '../shared/Header';
import { normalFont, overflow } from '../shared/helpers';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    color: ${props => props.theme.normalText};
    ${normalFont};
    margin-top : -24px; /* Navbar has margin-bottom of 24px so undoing that margin space*/
`;

const RowWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const HeaderWrapper = styled.div`
    background-color: ${props => props.theme.foreground};
    margin-bottom: 10px;
    padding: 16px 20px 20px;

    & > :first-child{
        color: ${props => props.theme.mutedText};
    }
`;


const BodyWrapper = styled.div`
    display: flex;
    margin: 0 16vw 0 4vw;
    @media (max-width: 1024px) {
        margin: 0 2.5vw;
    }

    @media (max-width: 768px) {
        display: block;
        margin: 0;
    }
`;

const PostContainer = styled.div`
    flex: 4 1 500px;
    background-color: ${props => props.theme.foreground};
    padding: 8px 20px 20px;
    border: 1px solid ${props => props.theme.border};
    margin: 4px;

    & > :first-child{
        color: ${props => props.theme.mutedText};
    }
`;

const UserContainer = styled.div`
    flex: 1 1 200px;
    background-color: ${props => props.theme.foreground};
    border: 1px solid ${props => props.theme.border};
    padding: 8px 20px 20px;
    margin: 4px;

    & > :first-child{
        color: ${props => props.theme.mutedText};
    }
`;

const List = styled.ul`
  list-style: none;
`;

class SearchPage extends React.Component {
    loadPosts = query => {
        this.props.attemptSearchPosts(query);
    };

    loadUsers = query => {
        this.props.attemptSearchUsers(query);
    };

    loadSavedPosts = () => {
        if (this.props.user)
            this.props.userGetSavedPosts(this.props.user.id);
    };

    componentDidMount() {
        if (this.props.query) {
            this.loadPosts(this.props.query);
            this.loadUsers(this.props.query);
            this.loadSavedPosts();
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.query !== this.props.query) {
            if (this.props.query) {
                this.loadPosts(this.props.query);
                this.loadUsers(this.props.query);
            }
        }
        if (prevProps.user !== this.props.user)
            if (this.props.query) this.loadSavedPosts();
    };

    mapPosts = () => {
        const { posts, savedPosts, query } = this.props;

        var postslist = posts && posts.map((post, index) => {
            let alreadySaved = false;
            alreadySaved = savedPosts
                && (savedPosts.find(p => p.id === post.id)) != null;

            return <PostListItem saved={alreadySaved} key={index} {...post} />
        });
        if (postslist && postslist.length !== 0) {
            return postslist
        } else {
            return <FullPageMessage>
                <FontAwesomeIcon icon='times' />
                <span>No posts found for {query}</span>
            </FullPageMessage>
        }
    };

    mapUsers = () => {
        const { users, query } = this.props;

        var userslist = users && users.map((user, index) => {
            return (
                <UserListItem key={index} user={user} />
            )
        });

        if (userslist && userslist.length !== 0) {
            return userslist;
        } else {
            return <FullPageMessage>
                <FontAwesomeIcon icon='users-slash' />
                <span>No users found for {query}</span>
            </FullPageMessage>
        }
    };

    render() {
        const { postFetching, userFetching, saveFetching, query = '' } = this.props;

        if (postFetching || saveFetching || userFetching) return <LoadingIndicator />

        return (
            <Wrapper>
                <HeaderWrapper>
                    <RowWrapper>
                        <FontAwesomeIcon icon='search' />
                        <div>&nbsp;Search results for</div>
                    </RowWrapper>
                    <Header noBorder>
                        {query}
                    </Header>
                </HeaderWrapper>
                <BodyWrapper>
                    <PostContainer>
                        <Header noBorder light >Posts found</Header>
                        {
                            (!query || query !== '') ?
                                <List>
                                    {this.mapPosts()}
                                </List>
                                :
                                <FullPageMessage>
                                    <FontAwesomeIcon icon='times' />
                                    <span>No posts found for ""</span>
                                </FullPageMessage>
                        }
                    </PostContainer>
                    <UserContainer>
                        <Header noBorder light >Users found</Header>
                        {
                            (!query || query !== '') ?
                                <List>
                                    {this.mapUsers()}
                                </List>
                                :
                                <FullPageMessage>
                                    <FontAwesomeIcon icon='users-slash' />
                                    <span>No users found for ""</span>
                                </FullPageMessage>
                        }
                    </UserContainer>
                </BodyWrapper>
            </Wrapper>
        )
    };
};

export default SearchPage;
