import React, { Component } from 'react';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { link, overflow } from '../../../shared/helpers';
import Author from '../../../shared/Author';
import { Modal, ModalItem } from '../../../shared/ModalBottom';

const Wrapper = styled.div`
  ${overflow};
  position: relative;
  display: flex;
  align-items: center;
  font-size: 13px;
  margin-top: auto;

  & > * {
    margin-right: 4px;
  }

  & > a {
    ${link};
  }

  & > span {
    color: ${props => props.theme.mutedText};
  }
`;

const ModalToggle = styled.div`
  position: absolute;
  color: ${props => props.theme.icon};
  right: 0;
  padding: 5px;
  cursor: pointer;
  
  @media(min-width: 769px){
    display:none;
  }
`
class PostHeaderDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  toggleMenu = (event) => {
    event.preventDefault();
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  deletePost = (event) => {
    event.preventDefault();
    this.props.attemptDeletePost(this.props.postid);
    this.toggleMenu(event);
  }

  render() {
    const { postid, category, created, author, token, user } = this.props;
    return (
      <>
        <Wrapper>
          <span>Posted on</span>
          <Link to={`/c/${category}`}>{category}</Link>
          <span>by</span>
          <Author username={author && author.username} />
          <span>{moment(created).fromNow()}</span>
          <ModalToggle onClick={this.toggleMenu} >
            <FontAwesomeIcon icon='ellipsis-h' />
          </ModalToggle>
        </Wrapper>

        {this.state.isOpen &&
          <Modal isOpen={this.state.isOpen} onClose={this.toggleMenu}>
            <ModalItem to={`/c/${category}`}><FontAwesomeIcon icon='users' />&nbsp;&nbsp;More post from <strong>{category}</strong></ModalItem>
            {author && <ModalItem to={`/u/${author.username}`}><FontAwesomeIcon icon='address-book' />&nbsp;&nbsp;{author.username}'s profile</ModalItem>}
            {
              token &&
                ((author && (user.id === author.id)) ||
                  user.admin)
                ?
                <ModalItem to='/' onClick={this.deletePost}><FontAwesomeIcon icon='trash' />&nbsp;&nbsp;Delete</ModalItem>
                :
                <>
                  <ModalItem to='/'><FontAwesomeIcon icon='bookmark' />&nbsp;&nbsp;Save</ModalItem>
                  <ModalItem to='/login'><FontAwesomeIcon icon='flag' />&nbsp;&nbsp;Report</ModalItem>
                </>
            }
            <ModalItem to={`/c/${category}/${postid}`}><FontAwesomeIcon icon='comment-alt' />&nbsp;&nbsp;Comments</ModalItem>
          </Modal>
        }

      </>
    );
  }
}

export default PostHeaderDetail;
