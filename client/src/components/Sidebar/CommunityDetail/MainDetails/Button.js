import React from 'react';
import styled from 'styled-components';
import Button from '../../../shared/JoinButton';


const JoinButton = () => (
    <Button joined={false} onClick={() => console.log('click!')} />
);

export default JoinButton;