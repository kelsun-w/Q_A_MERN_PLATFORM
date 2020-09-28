import React from 'react';
import styled from 'styled-components';
import { Field } from 'redux-form';
import Form from '../../shared/form/Form';
import renderField from '../../shared/form/renderField';
import SubmitButton from '../../shared/form/SubmitButton';

const StyledForm = styled(Form)`
    max-width: 100%;
    padding: 8px;
    border: none;
`;

const img_label = 'Images must .jpg or .png and less than 16mb';

class ImageForm extends React.Component {

    onSubmit = values => {
        alert(JSON.stringify(values));
    }

    render() {
        const { user } = this.props;
        return (
            <StyledForm
                onSubmit={this.props.handleSubmit(this.onSubmit)}
            >
                <Field
                    sublabel={img_label}
                    name='user_image'
                    type='file'
                    alt='user avatar'
                    component={renderField}
                    defaultURL={user && user.picture} />
                <SubmitButton type='submit'>UPLOAD</SubmitButton>
            </StyledForm>
        );
    }
};

export default ImageForm;