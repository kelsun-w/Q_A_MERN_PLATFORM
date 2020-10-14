import React from 'react';
import styled, { css } from 'styled-components';
import PostListContainer from '../PostList/Container';
import Button from '../shared/Button';
import { normalFont, overflow } from '../shared/helpers';

const FilterWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 5px 8px;
    border: 1px solid ${props => props.theme.border};
    border-radius: 4px;
    background-color: ${props => props.theme.foreground};
    margin-bottom: 10px;
    ${normalFont};
`;

const StyledButton = styled(Button)`
    color: ${props => props.theme.normalText};
    background-color: ${props => props.theme.foreground};
    border: 1px solid ${props => props.theme.invert};
    min-width: 100px;
    margin: 0 5px;
    
    ${({ active }) => active ?
        css`filter: brightness(90%);
         background-color: ${props => props.theme.invert};
         color: ${props => props.theme.activeBackground};
        `
        :
        `none`};

    :hover,
    :focus{
        box-shadow: 0 0 0 0.5px ${props => props.theme.invert + '4d'};
        outline: 1px dashed ${props => props.theme.invert};
    }
`;

class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filter: 1
        };
    };

    toggleFilter = value => {
        if (value === this.state.filter) return;
        this.setState({
            filter: value === 1 ? 1 : 2
        }, () => console.log(this.state));
    };

    renderContent = () => {
        if (this.state.filter === 1)
            return <PostListContainer username={this.props.username} />;
        else
            return <PostListContainer username={this.props.username} showSaved />;
    }

    render() {
        const { filter } = this.state;
        const { username, user } = this.props;
        return (
            <>
                {
                    user &&
                    user.username === username &&
                    <FilterWrapper>
                        <StyledButton onClick={(e) => this.toggleFilter(1)} active={filter === 1} onMouseDown={(e) => e.preventDefault()} >Posts</StyledButton>
                        <StyledButton onClick={(e) => this.toggleFilter(2)} active={filter === 2} onMouseDown={(e) => e.preventDefault()} >Saved</StyledButton>
                    </FilterWrapper>
                }
                {this.renderContent()}
            </>
        );
    };
};

export default UserProfile;
