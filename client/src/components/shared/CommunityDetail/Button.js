import React from 'react';
import Button from '../JoinButton';

const JoinButton = ({ onClick, joined }) => (
    <Button onClick={onClick} joined={joined} />
);

export default JoinButton;