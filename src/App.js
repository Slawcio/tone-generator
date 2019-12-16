import React from 'react';
import './App.css';
import PianoProvider from "./PianoProvider";
import ButtonUI from './ButtonUI';
import 'semantic-ui-css/semantic.min.css';
import Divider from "./Divider";
import Header from "./Header";
import DropdownKey from "./DropdownKey";
import DropdownScale from "./DropdownScale"
import SliderProvider from "./Slider";
import ButtonPla from './ButtonPla';
import './PianoProviderStyle.css';

function App() {

    const pianoContainer = {
        height: "120px",
        width: "100%",
        display: "flex"
    };

    const dropdown = {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        flexWrap: 'wrap',
        flexDirection: 'row'
    };

  return (
      <div className="App-background">
        <div className="App-containter">
            <Header/>
            <div className={"piano"}>
                <PianoProvider/>
            </div>
            <Divider value={'Choose note duration'}/>
            <ButtonUI/>
            <Divider value={'Choose note tempo'}/>
            <SliderProvider/>
            <div style={dropdown}>
                <Divider style={{marginBottom: '100px', width: '10em'}} value={'Choose scale and key'}/>
                <DropdownKey/>
                <DropdownScale/>
            </div>
            <Divider value={'Play it!'}/>
            <ButtonPla/>
        </div>
      </div>
  );
}

export default App;
