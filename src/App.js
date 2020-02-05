import React from 'react';
import './App.css';
import PianoProvider from "./PianoProvider";
import { Button, Icon } from 'semantic-ui-react'
import ButtonUI from './ButtonUI';
import 'semantic-ui-css/semantic.min.css';
import Divider from "./Divider";
import Header from "./Header";
import DropdownKey from "./DropdownKey";
import DropdownScale from "./DropdownScale"
import SliderProvider from "./Slider";
import ButtonPlay from './ButtonPlay';
import './PianoProviderStyle.css';
import Dropdown from './Dropdown';
import SoundEngine from "./SoundEngine";

function App() {

    const dropdown = {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        flexWrap: 'wrap',
        flexDirection: 'row'
    };


    const sliderStyle = {
        marginTop: '20em',
        marginBottom: '20em'
    };


  return (
      <div className="App-background">
        <div className="App-containter">
            <Header/>
            <div className={"piano"}>
                <PianoProvider/>
            </div>
            <Divider value={'Choose settings'}/>
            <SliderProvider name={'BPM:'}/>
            <SliderProvider name={'Dynamic:'}/>
            <SliderProvider name={'Complexity:'}/>
            <div style={dropdown}>
                <Divider style={{marginBottom: '100px', width: '10em'}} value={'Choose scale and key'}/>
                <DropdownKey/>
                <DropdownScale/>

            </div>
            <div style={dropdown}>

            <SoundEngine style={dropdown}/>
            </div>
        </div>
      </div>
  );
}

export default App;
