import React from 'react';
import styled, { css } from 'styled-components/macro';
import PostVoteUpvote from './Upvote';
import PostVoteDownvote from './Downvote';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
  padding: 4px;
  font-size: 12px;
  line-height: 25px;
  font-weight: 500;
  text-align: center;
  color: ${props => props.theme.normalText};
  background-color: ${props => props.theme.inputBackground};
  margin-left: 2px;

  @media(max-width: 768px){
          display: none;
  }

  ${({ row }) => row && css`
        display: none;
        flex-direction: row;
        padding: 0 4px;
        border : 1.5px solid ${props => props.theme.border};
        border-radius: 20px;

        & > span {
          padding: 0 5px;
        }

        @media(max-width: 768px){
          display: flex;
        }
    `}
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
    const { attemptVote, id, token } = this.props;
    if (token) {
      attemptVote(id, vote);
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
        <span>{this.state.score}</span>
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
