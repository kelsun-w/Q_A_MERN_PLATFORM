import React from 'react';
import styled from 'styled-components';
import JoinButton from '../shared/JoinButton';
import Empty from '../shared/Empty';
import LoadingIndicatorSpinner from '../shared/LoadingIndicator/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Wrapper = styled.div`
    width: 100%;
    padding: 5px 16px;
`

const Heading = styled.h1`
    font-size: 24px;
    font-weight: 600;
    color: ${props => props.theme.normalText};
    @media (max-width: 425px) {
        font-size: 20px;
    }

`;

const SubHeading = styled.h2`
    font-size: 14px;
    font-weight: 400;
    color: ${props => props.theme.normalText};
    margin-bottom: 10px;

    @media (max-width: 425px) {
        font-size: 10px;
    }
`

const Content = styled.div`
    display: flex;
    flex-flow: row wrap; 
`

const Item = styled.div`
    flex-basis: 200px;
    margin: 16px;
    background: ${props => props.theme.foreground};
    border: 1.5px solid ${props => props.theme.border};
    border-radius: 3px;
    color: ${props => props.theme.normalText};
    
    display: flex;
    flex-direction: column;
    align-items:center;
    padding: 0 0 5px;
`

const BGCover = styled.div`
    background-color: royalblue;
    padding: 18px 0;
    border-radius: 3px 3px 0 0;
    width: 100%;
`

const Profile = styled(FontAwesomeIcon)`
    margin: -18px 0 0;
    font-size: 36px;
    color: black;
    background-color: #fff;
    border: 1.5px solid #ddd;
    border-radius: 180px;
    padding: 5px;
`

const Title = styled.a`
    font-size: 18px;
    font-weight: 600;
    text-decoration: inherit;
    color: inherit;
`

const Description = styled.span`
    font-size: 12px;
    font-weight: 400;
    text-align: center;
    margin-bottom: 12px;
`

class DiscoverMenu extends React.Component {

    componentDidMount() {
        const { fetchCommunities } = this.props;
        fetchCommunities('');
    };

    mapItems = (list) => (
        list.map(item =>
            <Item>
                <BGCover />
                <Profile icon='medal' />
                <Title href={'/c/' + item.name}>{item.name}</Title>
                <Description>{item.description}</Description>
                <JoinButton onClick={null} joined={false} />
            </Item>
        )
    );

    render() {
        const { communities } = this.props;
        if (this.props.isFetching) return <LoadingIndicatorSpinner />
        return (
            <Wrapper>
                <Heading>Discover communities</Heading>
                <SubHeading>You might be interested in these communities</SubHeading>
                <Content>
                    {communities ? this.mapItems(communities) : <Empty />}
                </Content>
            </Wrapper>
        )
    };
}

export default DiscoverMenu;