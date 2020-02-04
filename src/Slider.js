import React from 'react';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import ReactDOM from 'react-dom';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
// We can just import Slider or Range to reduce bundle size
// import Slider from 'rc-slider/lib/Slider';
// import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css';
import {Input, Label} from "semantic-ui-react";
import GenericLabel from './Label'

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;
let tempValue;

class SliderProvider extends React.Component {

    constructor(props){
        super(props);
        this.state = props;
    }

    handle = (props) => {
        const {value, dragging, index, ...restProps} = props;
        return (
            <Tooltip
                prefixCls="rc-slider-tooltip"
                overlay={value}
                visible={dragging}
                placement="top"
                key={index}
            >
                <Handle value={value} {...restProps} />
            </Tooltip>

        );
    };

    onChange = (value) => {
        this.setState(this.state.value);
        return (
            <div>
                <Input placeholder="BPM" value={value}/>
                <Label color="white">BPM: {value}</Label>
            </div>
        );
    };

    render(props) {
        return(
            <div style={{width: '100%', margin: 'auto', display: 'flex', flexWrap: 'wrap'}}>
                <h5 class='ui header' style={{marginTop: '9px', color: 'white', margin: '0 0 0 px', width: '7em'}}>{this.state.name}</h5>
            <Slider
            min={30}
            max={230}
            defaultValue={120}
            handle={this.handle}
            onChange={this.onChange}
            style={{margin: '10px 0 10px 0', float: 'right', color: 'black', width: '80%'}}
            />
            </div>
        )
    }
}
export default SliderProvider;