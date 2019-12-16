import React from 'react'
import 'semantic-ui-css/semantic.min.css'

const style = {
    width: '100%',
    margin: '50px 0 25px 0',
    color: '#ffffff'
};

class Divider extends React.Component {

    constructor(props){
        super(props);
        const state = {
        };
    }

    render(name) {
        return (
            <div style={style}>
                <h4 className="ui horizontal inverted divider header" style={{color: '#ffffff'}}>
                    {this.props.value}
                </h4>
            </div>
        );
    }

} export default Divider