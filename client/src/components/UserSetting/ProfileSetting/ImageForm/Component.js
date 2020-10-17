import React from 'react';
import styled from 'styled-components';
import { Field } from 'redux-form';
import Form from '../../../shared/form/Form';
import renderField from '../../../shared/form/renderField';

const StyledForm = styled(Form)`
    max-width: 100%;
    padding: 8px;
    border: none;
`;

const IMG_LABEL = 'Profile Avatar and banner image';
const IMG_SUBLABEL = 'Image must .jpg or .png and less than 16mb';

class ImageForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = async values => {
        const { imageUpload } = this.props;
        const result = await imageUpload(values.target.files[0]);
        if (result) window.location.reload();
    };

    render() {
        const { user, isUploading } = this.props;
        return (
            <StyledForm
                form='userSetting_image'
            >
                <Field
                    loading={isUploading}
                    onChange={this.handleChange}
                    label={IMG_LABEL}
                    sublabel={IMG_SUBLABEL}
                    name='u_avatar'
                    type='file'
                    alt='user avatar'
                    component={renderField}
                    defaultURL={user && user.picture && `${process.env.REACT_APP_IMG_URL_UA}/${user.id}`} />
            </StyledForm>
        );
    }
};

export default ImageForm;