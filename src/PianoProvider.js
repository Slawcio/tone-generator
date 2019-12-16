import { Piano, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import './PianoProviderStyle.css'
import React from 'react'

class PianoProvider extends React.Component {

    render() {
        const firstNote = MidiNumbers.fromNote('c1');
        const lastNote = MidiNumbers.fromNote('c6');

        return (

                <Piano
                    noteRange={{ first: firstNote, last: lastNote }}
                    playNote={(midiNumber) => {
                        // Play a given note - see notes below
                    }}
                    stopNote={(midiNumber) => {
                        // Stop playing a given note - see notes below
                    }}
                    width={this.props.containerWidth}
                    height={2000}
                />
        );
    }

} export default PianoProvider