import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

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

const ButtonPla = () => (
    <div style={style}>
        <Button style={buttonStyle} icon labelPosition='left'>
            Play
            <Icon name='play' />
        </Button>
        <Button style={buttonStyle} icon labelPosition='left'>
            <Icon name='pause' />
            Pause
        </Button>
        <Button style={buttonStyle} icon labelPosition='left'>
            Download
            <Icon name='download' />
        </Button>
    </div>
);
export default ButtonPla
