import React from 'react';
import styled from 'styled-components';
import Collapsible from '../../shared/Collapsible';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { wideFont } from '../../shared/helpers';
import Empty from '../../shared/Empty';

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    background-color: ${props => props.theme.foreground};
    
    border-radius: 3px;
    color: ${props => props.theme.normalText};
`

const Contents = styled.ul`
    list-style: none;
    padding: 4px 12px;
    & > :not(:last-child) {
        border-bottom: 1.5px solid ${props => props.theme.border};
    }
`;

const Header = styled.div`
    ${wideFont};
    font-weight: 700;
    border-radius: 3px 3px 0 0;
    background-color: ${props => props.theme.primary};
    color: #fff;
    padding: 8px 12px 8px;
`

class RuleDetail extends React.Component {
    mapItems = (list) => (
        list.map((item, index) => <Collapsible key={index} index={index} title={item.title} content={item.description} />)
    );

    render() {
        const { rules } = this.props;
        return (
            <Wrapper>
                <Header>Community Rules</Header>
                <Contents>
                    {(!rules || rules.length === 0) ?
                        <Empty message="...No rules" />
                        : this.mapItems(this.props.rules)}
                </Contents>
            </Wrapper>
        )
    };
}

export default RuleDetail;