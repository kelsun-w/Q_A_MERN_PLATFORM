import React from 'react';
import styled from 'styled-components';
import { Field } from 'redux-form';
import Form from '../../../../../shared/form/Form';
import renderField from '../../../../../shared/form/renderField';

const StyledForm = styled(Form)`
    max-width: 100%;
    padding: 8px;
    border: none;
`;

const IMG_LABEL = 'Community Avatar and banner image';
const IMG_SUBLABEL = 'Image must .jpg or .png and less than 16mb';

class ImageForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = async values => {
        const { id, imageUpload } = this.props;
        const result = await imageUpload(id, values.target.files[0]);
        if (result) window.location.reload();
    };

    render() {
        const { id, picture, isUploading } = this.props;
        return (
            <StyledForm
            >
                <Field
                    loading={isUploading}
                    onChange={this.handleChange}
                    label={IMG_LABEL}
                    sublabel={IMG_SUBLABEL}
                    name='c_avatar'
                    type='file'
                    alt='community avatar'
                    component={renderField}
                    defaultURL={picture && `${process.env.REACT_APP_IMG_URL_CA}/${id}`} />
            </StyledForm>
        );
    }
};

export default ImageForm;