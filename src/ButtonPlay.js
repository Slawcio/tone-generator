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

const ButtonPlay = () => (
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
export default ButtonPlay

// <button type="button" onClick={this.play.bind(this)} >Play 2</button>
// <button type="button" onClick={this.stopAll.bind(this)} >Stop</button>
// <button type="button" onClick={this.testMethod.bind(this)} >Test</button>
