import styled from 'styled-components';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoadingIndicator from '../../shared/LoadingIndicator/Spinner';

const StyledSpinner = styled(LoadingIndicator)`
    border: 0.8rem solid ${props => props.theme.accent + '4d'};
    border-top-color: ${props => props.theme.accent};
    width: 60px;
    height: 60px;
`

const Wrapper = styled.div`
    width: 120px;
`
const WithoutProfile = styled.label`
    position: relative;
    height: 120px;
    display: flex;
    flex-direction: column;
    text-align: center;
    border: 3px dashed ${props => props.theme.border};
    border-radius: 8px;
    cursor: pointer;
    background-color: ${props => props.theme.inputBackground};;
    color: ${props => props.theme.normalText};
    padding: 6px;
`

const WithProfile = styled.label`
    position: relative;
    height: 120px;
    width: 120px;
    display: flex;
    cursor: pointer;
    background-color: ${props => props.theme.inputBackground};;
`

const StyledTop = styled.div`
    font-size: 18px;
    align-self: flex-end;
    justify-self: flex-start;
`

const StyledCenter = styled.div`
    font-size: 40px;
`

const StyledInput = styled.input`
    display:none;
`

const StyledImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid ${props => props.theme.border};
`

const StyledEnd = styled.div`
    position: absolute;
    width: 36px;
    height: 36px;
    bottom: 6px;
    right: 6px;
    
    display: flex;
    align-items: center;
    justify-content: center;
    
    border: 1px solid ${props => props.theme.accent};
    border-radius: 50%;

    font-size: 14px;
    color: ${props => props.theme.accent};
    background-color: #fff;
`

const ImageInput = ({ field }) => {
    const { input: { loading, name, onChange } } = field;
    return (
        <Wrapper>
            {field.defaultURL ?
                <WithProfile>
                    {loading && <StyledSpinner />}
                    <StyledImage src={field.defaultURL} />
                    <StyledEnd>
                        <FontAwesomeIcon icon='pen' />
                    </StyledEnd>
                    <StyledInput
                        name={name}
                        onChange={onChange}
                        type='file'
                        accept='image/png,image/jpeg'
                        alt={field.alt}
                    />
                </WithProfile>
                :
                <WithoutProfile>
                    {loading && <StyledSpinner />}
                    <StyledTop>
                        <FontAwesomeIcon icon='plus' />
                    </StyledTop>
                    <StyledCenter>
                        <FontAwesomeIcon icon='user' />
                    </StyledCenter>
                    <StyledInput
                        name={name}
                        onChange={onChange}
                        type='file'
                        accept='image/png,image/jpeg'
                        alt={field.alt}
                    />
                </WithoutProfile>
            }
        </Wrapper>
    );
}

export default ImageInput;
