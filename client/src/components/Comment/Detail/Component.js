import React from 'react';
import styled from 'styled-components/macro';
import Author from '../../shared/Author';
import CommentDetailTimestamp from './Timestamp';
import DeleteButton from '../../shared/DeleteButton';
import VoteContainer from '../Vote/Container';

const Wrapper = styled.div`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.border};
  padding: 8px;
  font-size: 13px;
`;

class CommentDetail extends React.Component {
  deleteComment = () =>
    this.props.subComment ? this.props.attemptDeleteSubComment(this.props.parentId, this.props.id) :
      this.props.attemptDeleteComment(this.props.id);

  render() {
    console.log(this.props);
    return (
      <Wrapper>
        <Author username={this.props.author && this.props.author.username} />
        <CommentDetailTimestamp created={this.props.created} />
        <VoteContainer id={this.props.id} votes={this.props.votes} score={this.props.score} />
        {this.props.token &&
          this.props.author && (this.props.user.id === this.props.author.id ||
            this.props.user.admin) && (
            <DeleteButton onClick={this.deleteComment} />
          )}
      </Wrapper>
    );
  }
}

export default CommentDetail;
