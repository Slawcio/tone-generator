import React from 'react'
import { Icon, Label } from 'semantic-ui-react'

class GenericLabel extends React.Component {

    constructor(props){
        super(props);
         this.state = props;
    }

        render(){
            return (
                <Label>
                    <Icon name='mail'/> {this.state.value}
                </Label>
            )
        };
};
export default GenericLabel