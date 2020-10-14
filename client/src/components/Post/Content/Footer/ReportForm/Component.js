import React from 'react';
import styled from 'styled-components';
import { Field } from 'redux-form';
import Form from '../../../../shared/form/Form';
import renderField from '../../../../shared/form/renderField';
import SubmitButton from '../../../../shared/form/SubmitButton';
import LoadingIndicator from '../../../../shared/LoadingIndicator/Spinner';
import Header from '../../../../shared/Header';

const Wrapper = styled.div`
    color: ${props => props.theme.normalText};
`;

export const SubHeading = styled(Header).attrs({ noBorder: true, small: true, light: true })`
    margin: 10px 0;    
`;

const StyledForm = styled(Form)`
    max-width: 100%;
    padding: 8px;
    border: none;
`;

const StyledSpinner = styled(LoadingIndicator)`
    width: 1rem;
    height: 1rem;
    cursor: none;
    left: 8%;
    bottom: 50%;
`

const StyledButton = styled(SubmitButton)`
    position: relative;
 
    &:disabled {
        background: #ddd;
        
        :hover,
        :active,
        :focus {
            filter: none;
            box-shadow: none;
            cursor: initial;
        }
    }
`

const HEADER = 'Report Post';
const SUBHEADER1 = 'Does this post go against the community guidelines?';
const SUBHEADER2 = 'Let the community moderators know below:';
const SELECT_LABEL = 'Select community rule broken by this post';
const EMPTY_SELECT_VALUE = '--- no rules ---';
const SELECT_VALUE = '--- select rule ---';

class ReportForm extends React.Component {

    componentDidMount() {
        const { fetchCommunity, category } = this.props;
        fetchCommunity(category);
    }

    onSubmit = values => {
        const { createReport, user, postid, community, author, postTitle, postContent } = this.props;

        if (!author || !values.offence || values.offence == SELECT_VALUE || values.offence == EMPTY_SELECT_VALUE)
            return;

        let bodypreview = postContent.substr(0, 100);
        bodypreview += '...';
        const body = {
            offender: author && author.id,
            reporter: user.id,
            offence: values.offence,
            community: community.id,
            post: {
                postid: postid,
                title: postTitle,
                preview: bodypreview
            }
        };
        const result = createReport(community.name, body);
        if (result) this.props.onClose();
    }

    mapRules = (list) =>
        list.map((item, index) => {
            return (
                <option key={index} value={item.title} >
                    { item.title}
                </option>
            )
        });

    render() {
        const { isLoading, community } = this.props;
        if (!community) return null;
        return (
            <Wrapper>
                <Header>{HEADER} on c/{community.name}</Header>
                <SubHeading noBorder small light>
                    <div>{SUBHEADER1}</div>
                    <div>{SUBHEADER2}</div>
                </SubHeading>
                <StyledForm
                    onSubmit={this.props.handleSubmit(this.onSubmit)}
                >
                    <Field
                        name='offence'
                        sublabel={SELECT_LABEL}
                        type='select'
                        component={renderField} >
                        {community.rules.length === 0 ?
                            this.mapRules([{ title: EMPTY_SELECT_VALUE }]) :
                            this.mapRules([{ title: SELECT_VALUE }, ...community.rules])}
                    </Field>
                    <StyledButton type='submit' disabled={isLoading}>
                        {isLoading && <StyledSpinner />}
                        <span>SUBMIT</span>
                    </StyledButton>
                </StyledForm>
            </Wrapper>
        );
    }
};

export default ReportForm;