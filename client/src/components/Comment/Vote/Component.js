import React from 'react';
import styled, { css } from 'styled-components/macro';
import PostVoteUpvote from './Upvote';
import PostVoteDownvote from './Downvote';

const Wrapper = styled.div`
  display: flex;
  justify-content:center;
  align-items: center;
  width: auto;
  font-size: 6px;
  line-height: 14px;
  font-weight: 500;
  text-align: center;
  color: ${props => props.theme.normalText};
  margin-left: 2px;
  margin-top: -2px;
  
  @media(max-width: 768px){
    display: none;
  }
  `;

const Score = styled.span`
  font-size: 12px;
  line-height: 21px;
  padding: 0 2px;
  `;

class PostVote extends React.Component {
  constructor(props) {
    super(props);
    const didVote = PostVote.existingVote(props);
    this.state = {
      score: props.score,
      didVote,
      didUpvote: didVote === 1,
      didDownvote: didVote === -1
    };
  }

  static existingVote({ user, votes }) {
    const existingVote =
      user && votes && votes.find(vote => vote.user === user.id);
    return existingVote ? existingVote.vote : 0;
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    if (this.props.score !== nextProps.score) {
      const didVote = PostVote.existingVote(nextProps);
      this.setState({
        score: nextProps.score,
        didVote,
        didUpvote: didVote === 1,
        didDownvote: didVote === -1
      });
    } else if (this.props.token !== nextProps.token && !nextProps.token) {
      this.setState({
        didVote: false,
        didUpvote: false,
        didDownvote: false
      });
    }
  }

  castVote(vote) {
    const { attemptCommentVote, id, postId, token } = this.props;
    console.log(this.props);
    if (token) {
      attemptCommentVote(postId, id, vote);
      this.setState({
        score: this.state.score + vote - this.state.didVote,
        didVote: vote,
        didUpvote: vote === 1,
        didDownvote: vote === -1
      });
    }
  }

  upvote = () => this.castVote(this.state.didUpvote ? 0 : 1);

  downvote = () => this.castVote(this.state.didDownvote ? 0 : -1);

  render() {
    return (
      <Wrapper row={this.props.row}>
        <PostVoteUpvote
          canVote={!!this.props.token}
          didVote={this.state.didUpvote}
          onClick={this.upvote}
          row={this.props.row}
        />
        <Score>{this.state.score}</Score>
        <PostVoteDownvote
          canVote={!!this.props.token}
          didVote={this.state.didDownvote}
          onClick={this.downvote}
          row={this.props.row}
        />
      </Wrapper>
    );
  }
}

export default PostVote;
