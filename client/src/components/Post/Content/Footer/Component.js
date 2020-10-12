import React from 'react';
import styled from 'styled-components/macro';
import PostVoteContainer from '../../Vote/Container';
import { overflow } from '../../../shared/helpers';
import FooterButton from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from '../../../shared/Modal';
import ReportForm from './ReportForm/Container';

//Be careful when editing this code. The order of the child elements of the Wrapper MATTERS!
const Wrapper = styled.div`
  ${overflow};
  display: flex;
  font-size: 13px;
  margin-top: auto;

  @media(max-width: 768px){
    & > * :not(:nth-child(1)) :not(:nth-child(2)) :not(:nth-child(3)){
      display: none;
    }
    
    & > :nth-child(3){
      margin: auto;
      margin-right: 0;
      height: 100%;
      width: auto;
      border-radius: 100%;
    }

    & > a :nth-child(2) > span :not(:nth-child(2)) {
      display : none;
    }

    & > a :not(:nth-child(2)) >span {
      display : none;
    }
  }  

  & > * {
    margin-right: 8px;
  }

  & > a {
    text-underline-position: under;
    text-decoration: none;
  }
`;

class PostContentDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  };

  toggleMenu = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  };

  render() {
    const { postid, votes, score, category, commentCount, user, title, text, author } = this.props;
    return (
      <Wrapper>
        <PostVoteContainer row id={postid} votes={votes} score={score} />
        <FooterButton to={`/c/${category}/${postid}`} >
          <FontAwesomeIcon icon='comment-alt' />
          <span>{commentCount}</span>
          <span>comment{commentCount !== 1 ? 's' : null}</span>
        </FooterButton>
        <FooterButton className="share" to={`/c/${category}/${postid}`} >
          <FontAwesomeIcon icon='share' />
          <span>Share</span>
        </FooterButton>
        <FooterButton to={`/c/${category}/${postid}`} >
          <FontAwesomeIcon icon='bookmark' />
          <span>Save</span>
        </FooterButton>
        <FooterButton to='#' >
          <span onClick={this.toggleMenu}>
            <FontAwesomeIcon icon='flag' />
            <span>Report</span>
          </span>
        </FooterButton>
        {this.state.isOpen &&
          <Modal isOpen={this.state.isOpen} onClose={this.toggleMenu}>
            <ReportForm
              author={author}
              category={category}
              user={user}
              postid={postid}
              postTitle={title}
              postContent={text}
              onClose={this.toggleMenu}
            />
          </Modal>
        }
      </Wrapper>
    );
  };
};

export default PostContentDetail;
