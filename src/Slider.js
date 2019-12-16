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
            <div style={{width: '100%', margin: '0px 0 px 0'}}>
            <Slider
            min={30}
            max={230}
            defaultValue={120}
            handle={this.handle}
            onChange={this.onChange}
            style={{color: 'black'}}
            />
            </div>
        )
    }
}
export default SliderProvider;