import { Button, Icon } from 'semantic-ui-react'
import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import './flaticon.css';
import './w3.css';

const style = {
    display: "flex",
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: "100%",
};

const buttonStyle = {
    width: '140px',
    margin: '2.5px'
};

const ButtonExampleLabeledIcon = () => (
    <div style={style}>
        <Button style={buttonStyle} icon labelPosition='left'>
            <Icon name="flaticon-whole"/>
            Whole
        </Button>
        <Button style={buttonStyle} icon labelPosition='left'>
            <Icon name="flaticon-half-note"/>
            Half
        </Button>
        <Button style={buttonStyle} icon labelPosition='left'>
            <Icon name="flaticon-quarter-note"/>
            Quater
        </Button>
        <Button style={buttonStyle} icon labelPosition='left'>
            <Icon name='flaticon-eighth-note' />
            Eight
        </Button>
        <Button style={buttonStyle} icon labelPosition='left'>
            <Icon name='flaticon-sixteenth-note' />
            Sixteenth
        </Button>
    </div>
)
export default ButtonExampleLabeledIcon