import React, { Component } from 'react';
import './App.css';
import MIDISounds from 'midi-sounds-react';

class MidiTest extends Component {
    playTestInstrument() {
        this.midiSounds.playChordNow(3, [60], 2.5);
    }
    render() {
        return (
            <div>
                <p><button onClick={this.playTestInstrument.bind(this)}>Play</button></p>
                <MIDISounds ref={(ref) => (this.midiSounds = ref)} appElementName="root" instruments={[3]} />
            </div>
        );
    }
}

export default MidiTest;