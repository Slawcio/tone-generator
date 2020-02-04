import React, { Component } from 'react';
import './App.css';
import MIDISounds from 'midi-sounds-react';
import Dropdown, { Button, Icon } from 'semantic-ui-react'


const BPM = 110;

const INTERVALS = {
    Ionian: [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23, 24],
    Dorian: [0, 2, 3, 5, 7, 9, 10],
    Frygian: [0, 1, 3, 5, 7, 8, 10],
    Aeolian: [0, 2, 3, 5, 7, 8, 10, 12, 14, 15, 17 ,19, 20, 22, 24],
};

const PLAY_RIGHT = true;
const PLAY_LEFT = true;

const PLAY_DRUMS = false;
const SCALE = INTERVALS.Aeolian;

let OCTAVE_RIGHT = 3;
let OCTAVE_LEFT = 2;
let FIRST_NOTES = [];

let t_rememberRight = [];
let b_firstTimeRight = true;

const FILL = {
    full: 0,
    half: 0,
    quater: 0,
    eight: 3,
    sixteenth: 0
};

const scalesStepMap = {
    aeolian: {
        progressionMap: [
            [40, 0, 50, 50, 50, 50, 70],
            [1, 1, 1, 1, 1, 1, 1],
            [60, 0, 1, 10, 10, 80, 90],
            [50, 0, 50, 1, 40, 60, 80],
            [50, 0, 50, 50, 1, 50, 50],
            [50, 0, 100, 30, 0, 1, 20],
            [50, 0, 80, 80, 5, 80, 1]
        ],
        end: [
            [50, 0, 50, 50, 50, 50, 100],
            [1, 1, 1, 1, 1, 1, 1],
            [60, 0, 1, 10, 10, 80, 90],
            [50, 0, 50, 1, 200 , 60, 80],
            [50, 0, 50, 50, 1, 50, 50],
            [50, 0, 100, 30, 600, 1, 600],
            [80, 0, 80, 80, 5, 80, 1]
        ],
        beginning: [10, 0, 2, 1, 0, 2, 4]
    },
};

const AeolianModifier = [0, 0, 0, 0, 0, 0, 0];

const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const SOUNDS = []; // it is built up in componentDidMount()
const VOLUME = 0.9;

const bassDrum=2;
const snare=17;
const hiHat=56;
const cymbal=70;

const RIGHT_INSTRUMENT = 5; //449, 456, 455 violin, 5 piano
const LEFT_INSTRUMENT = 5;

class SoundEngine extends Component {

    constructor(props) {
        super(props);
        this.state = {
            RIGHT_INSTRUMENT: 5,
            LEFT_INSTRUMENT: 5,
            sections: [
                {
                    RIGHT_DURATION: {
                        full: 0,
                        half: 2,
                        quater: 6,
                        eight: 1,
                        sixteenth: 0
                    },
                    LEFT_DURATION: {
                        full: 0,
                        half: 1,
                        quater: 0,
                        eight: 0,
                        sixteenth: 0
                    },
                    RIGHT_HARMONY: [
                        {chance: 1, notes: 1, interval: 0}, //unison
                        {chance: 1, notes: 1, interval: 2}, //third
                        {chance: 1, notes: 1, interval: 4}, //fifth
                        {chance: 1, notes: 1, interval: 7}, //octave
                        {chance: 0, notes: 2, interval: 2},	//unison + third
                        {chance: 0, notes: 2, interval: 4},	//unison + fifth
                        {chance: 0, notes: 2, interval: -1}, 	//third + fifth
                        {chance: 0, notes: 3, interval: 0}	//full chord
                    ],
                    LEFT_HARMONY: [
                        {chance: 0, notes: 1, interval: 0}, //unison
                        {chance: 0, notes: 1, interval: 2}, //third
                        {chance: 0, notes: 1, interval: 4}, //fifth
                        {chance: 0, notes: 1, interval: 7}, //octave
                        {chance: 1, notes: 2, interval: 2},	//unison + third
                        {chance: 0, notes: 2, interval: 4},	//unison + fifth
                        {chance: 0, notes: 2, interval: -1}, 	//third + fifth
                        {chance: 0, notes: 3, interval: 0}	//full chord
                    ],
                    CHORDS: 2,
                    BARS: 2
                }, //intro
                {
                    RIGHT_DURATION: {
                        full: 0,
                        half: 1,
                        quater: 6,
                        eight: 6,
                        sixteenth: 0
                    },
                    LEFT_DURATION: {
                        full: 0,
                        half: 1,
                        quater: 0,
                        eight: 0,
                        sixteenth: 0
                    },
                    RIGHT_HARMONY: [
                        {chance: 1, notes: 1, interval: 0}, //unison
                        {chance: 2, notes: 1, interval: 2}, //third
                        {chance: 2, notes: 1, interval: 4}, //fifth
                        {chance: 2, notes: 1, interval: 7},
                        {chance: 1, notes: 2, interval: 2},	//unison + third
                        {chance: 1, notes: 2, interval: 4},	//unison + fifth
                        {chance: 1, notes: 2, interval: -1}, 	//third + fifth
                        {chance: 0, notes: 3, interval: 0}	//full chord
                    ],
                    LEFT_HARMONY: [
                        {chance: 1, notes: 1, interval: 0}, //unison
                        {chance: 0, notes: 1, interval: 2}, //third
                        {chance: 0, notes: 1, interval: 4}, //fifth
                        {chance: 0, notes: 1, interval: 7}, //octave
                        {chance: 1, notes: 2, interval: 2},	//unison + third
                        {chance: 1, notes: 2, interval: 4},	//unison + fifth
                        {chance: 0, notes: 2, interval: -1}, 	//third + fifth
                        {chance: 0, notes: 3, interval: 0}	//full chord
                    ],
                    CHORDS: 2,
                    BARS: 4
                }, //verse
                {
                    RIGHT_DURATION: {
                        full: 1,
                        half: 0,
                        quater: 0,
                        eight: 0,
                        sixteenth: 0
                    },
                    LEFT_DURATION: {
                        full: 1,
                        half: 0,
                        quater: 0,
                        eight: 0,
                        sixteenth: 0
                    },
                    RIGHT_HARMONY: [
                        {chance: 1, notes: 1, interval: 0}, //unison
                        {chance: 1, notes: 1, interval: 2}, //third
                        {chance: 1, notes: 1, interval: 4}, //fifth
                        {chance: 5, notes: 1, interval: 7},
                        {chance: 0, notes: 2, interval: 2},	//unison + third
                        {chance: 1, notes: 2, interval: 4},	//unison + fifth
                        {chance: 0, notes: 2, interval: -1}, 	//third + fifth
                        {chance: 0, notes: 3, interval: 0}	//full chord
                    ],
                    LEFT_HARMONY: [
                        {chance: 1, notes: 1, interval: 0}, //unison
                        {chance: 1, notes: 1, interval: 2}, //third
                        {chance: 1, notes: 1, interval: 4}, //fifth
                        {chance: 1, notes: 1, interval: 7}, //octave
                        {chance: 0, notes: 2, interval: 2},	//unison + third
                        {chance: 1, notes: 2, interval: 4},	//unison + fifth
                        {chance: 0, notes: 2, interval: -1}, 	//third + fifth
                        {chance: 0, notes: 3, interval: 0}	//full chord
                    ],
                    CHORDS: 1,
                    BARS: 1
                }, //prechorus
                {
                    RIGHT_DURATION: {
                        full: 0,
                        half: 0,
                        quater: 5,
                        eight: 10,
                        sixteenth: 0
                    },
                    LEFT_DURATION: {
                        full: 0,
                        half: 1,
                        quater: 1,
                        eight: 3,
                        sixteenth: 0
                    },
                    RIGHT_HARMONY: [
                        {chance: 1, notes: 1, interval: 0}, //unison
                        {chance: 1, notes: 1, interval: 2}, //third
                        {chance: 1, notes: 1, interval: 4}, //fifth
                        {chance: 1, notes: 1, interval: 7},
                        {chance: 3, notes: 2, interval: 2},	//unison + third
                        {chance: 3, notes: 2, interval: 4},	//unison + fifth
                        {chance: 3, notes: 2, interval: -1}, 	//third + fifth
                        {chance: 0, notes: 3, interval: 0}	//full chord
                    ],
                    LEFT_HARMONY: [
                        {chance: 1, notes: 1, interval: 0}, //unison
                        {chance: 1, notes: 1, interval: 2}, //third
                        {chance: 1, notes: 1, interval: 4}, //fifth
                        {chance: 0, notes: 1, interval: 7}, //octave
                        {chance: 3, notes: 2, interval: 2},	//unison + third
                        {chance: 3, notes: 2, interval: 4},	//unison + fifth
                        {chance: 3, notes: 2, interval: -1}, 	//third + fifth
                        {chance: 1, notes: 3, interval: 0}	//full chord
                    ],
                    BARS: 2,
                    CHORDS: 4
                }, //chorus
                {
                    RIGHT_DURATION: {
                        full: 0,
                        half: 0,
                        quater: 0,
                        eight: 0,
                        sixteenth: 1
                    },
                    LEFT_DURATION: {
                        full: 0,
                        half: 2,
                        quater: 10,
                        eight: 2,
                        sixteenth: 0
                    },
                    RIGHT_HARMONY: [
                        {chance: 1, notes: 1, interval: 0}, //unison
                        {chance: 1, notes: 1, interval: 2}, //third
                        {chance: 1, notes: 1, interval: 4}, //fifth
                        {chance: 1, notes: 1, interval: 7},
                        {chance: 0, notes: 2, interval: 2},	//unison + third
                        {chance: 0, notes: 2, interval: 4},	//unison + fifth
                        {chance: 0, notes: 2, interval: -1}, 	//third + fifth
                        {chance: 0, notes: 3, interval: 0}	//full chord
                    ],
                    LEFT_HARMONY: [
                        {chance: 0, notes: 1, interval: 0}, //unison
                        {chance: 0, notes: 1, interval: 2}, //third
                        {chance: 0, notes: 1, interval: 4}, //fifth
                        {chance: 0, notes: 1, interval: 7}, //octave
                        {chance: 3, notes: 2, interval: 2},	//unison + third
                        {chance: 3, notes: 2, interval: 4},	//unison + fifth
                        {chance: 3, notes: 2, interval: -1}, 	//third + fifth
                        {chance: 1, notes: 3, interval: 0}	//full chord
                    ],
                    BARS: 1,
                    CHORDS: 8,
                }, //bridge
                {
                    RIGHT_DURATION: {
                        full: 1,
                        half: 1,
                        quater: 1,
                        eight: 0,
                        sixteenth: 0
                    },
                    LEFT_DURATION: {
                        full: 1,
                        half: 1,
                        quater: 1,
                        eight: 0,
                        sixteenth: 0
                    },
                    RIGHT_HARMONY: [
                        {chance: 1, notes: 1, interval: 0}, //unison
                        {chance: 1, notes: 1, interval: 2}, //third
                        {chance: 1, notes: 1, interval: 4}, //fifth
                        {chance: 1, notes: 1, interval: 7},
                        {chance: 3, notes: 2, interval: 2},	//unison + third
                        {chance: 3, notes: 2, interval: 4},	//unison + fifth
                        {chance: 3, notes: 2, interval: -1}, 	//third + fifth
                        {chance: 0, notes: 3, interval: 0}	//full chord
                    ],
                    LEFT_HARMONY: [
                        {chance: 1, notes: 1, interval: 0}, //unison
                        {chance: 1, notes: 1, interval: 2}, //third
                        {chance: 1, notes: 1, interval: 4}, //fifth
                        {chance: 0, notes: 1, interval: 7}, //octave
                        {chance: 3, notes: 2, interval: 2},	//unison + third
                        {chance: 3, notes: 2, interval: 4},	//unison + fifth
                        {chance: 3, notes: 2, interval: -1}, 	//third + fifth
                        {chance: 1, notes: 3, interval: 0}	//full chord
                    ],
                    BARS: 1,
                    CHORDS: 1,
                }, //outro

            ], // whole sections
            sections_decision_tables: [
                [1, 10, 5, 8, 1, 1],	//intro
                [1, 10, 30, 10, 5, 1],	//verse
                [1, 10, 20, 50, 10, 1],	//prechorus
                [10, 10, 10, 20, 10, 2],//chorus
                [5, 20, 5, 30, 1, 5],	//bridge
                [1, 1, 1, 1, 1, 1]		//outro
            ]
        } // state:

    };

    componentDidMount() {
        this.midiSoundsDrums.setDrumVolume(bassDrum, 0.5);
        this.midiSoundsDrums.setDrumVolume(snare, 0.9);
        this.midiSoundsDrums.setDrumVolume(hiHat, 0.25);
        this.midiSoundsDrums.setDrumVolume(cymbal, 0.9);

        this.leftHand.setInstrumentVolume(LEFT_INSTRUMENT, 0.8);
        this.leftHand.setEchoLevel(0.4);
        this.rightHand.setInstrumentVolume(RIGHT_INSTRUMENT, 1);
        this.rightHand.setEchoLevel(0.4);
        this.eqLeftHand();
        this.eqRightHand();

        for (let i = 0; i < 88; i++) {
            SOUNDS[i] = i + 21;
        }
        this.setState({initialized: true});
    }

    call(){
      this.play();
    };

    eqLeftHand() {
        this.leftHand.setBand32(0);
        this.leftHand.setBand64(0);
        this.leftHand.setBand128(0);
        this.leftHand.setBand256(0);
        this.leftHand.setBand512(0);
        this.leftHand.setBand1k(0);
        this.leftHand.setBand2k(0);
        this.leftHand.setBand4k(0);
        this.leftHand.setBand8k(-1);
        this.leftHand.setBand16k(-1);
    }

    eqRightHand() {
        this.rightHand.setBand32(0);
        this.rightHand.setBand64(0);
        this.rightHand.setBand128(0);
        this.rightHand.setBand256(0);
        this.rightHand.setBand512(0);
        this.rightHand.setBand1k(0);
        this.rightHand.setBand2k(-1);
        this.rightHand.setBand4k(-2);
        this.rightHand.setBand8k(-3);
        this.rightHand.setBand16k(-3);
    }

    b_chance(f_chance) {
        return Math.random() < f_chance;
    }

    t_ComposeMelody(i_bars, t_scale, step, i_octave, t_duration, t_harmony, b_side, i_instrument) { // b_side true -> right, false -> left
        const result_piano = [];// result table
        let fillFlag = this.b_chance(0.1);
        let i_note_duration = 1;	// duration of note
        let o_harmony_previous = {
            notes: 0,
            interval: 0,
        };



        if(step === 6 && this.b_chance(0.1))
            i_octave = 12 * (i_octave - 1);
        else if(step === 5 && this.b_chance(0.1))
            i_octave = 12 * (i_octave - 1);
        else
            i_octave = 12 * i_octave;
        for (let index = i_bars * 16; index > 0; index = index - (16 / i_note_duration)) {		//loop for receiving sounds
            let o_harmony = this.o_Harmony(t_harmony);											// got harmony
            let note = SOUNDS[i_octave + t_scale[step]];							// got the sound
            i_note_duration = this.i_noteDuration(t_duration);
            for (let i = 0; this.b_ifHarmonyEqual(o_harmony, o_harmony_previous) && i < 5; i++) { //check harmony_current vs harmony_previous
                o_harmony = this.o_Harmony(t_harmony)											// if equal => choose it until u gain different one
            }
            o_harmony_previous = o_harmony;

            // checking chances for octave
            if (index < 16 && fillFlag) {
                i_note_duration = this.i_noteDuration(FILL);
                o_harmony = this.o_Harmony(t_harmony);										// if equal => choose it until u gain different one
            }
            // checking chance for fill (fill should be related to bar)
            // checking chance for fill like arpegio
            if(b_firstTimeRight && b_side)
                t_rememberRight.push({
                    harmony: o_harmony,
                    duration: i_note_duration
                }); else if(!b_firstTimeRight && b_side) {
                const el = t_rememberRight.shift();
                o_harmony = el.harmony;
                i_note_duration = el.duration;
            }


            this.pushSound(result_piano, note, o_harmony, i_note_duration, i_octave, t_scale, step, i_instrument);// push sound to result tab;

            //saving duration
            //steps

        }
        return result_piano;
    };

    pushSound(result_piano, note, o_harmony, i_note_duration, i_octave, t_scale, step, i_instrument) {
        if (o_harmony.notes === 1) { 	// one note 1 || 3 || 7
            const tempNote = SOUNDS[i_octave + t_scale[step + o_harmony.interval]];
            result_piano.push(
                [[], [[i_instrument, [tempNote], (16 / i_note_duration) / 16]]]
            );
        } else if (o_harmony.notes === 2) { //harmony 2 notes
            if (o_harmony.interval === -1) {	// harmony 3 + 7
                result_piano.push(
                    [[], [[i_instrument,
                        [SOUNDS[i_octave + t_scale[step + 2]],
                            SOUNDS[i_octave + t_scale[step + 4]]],
                        (16 / i_note_duration) / 16]]]
                );
            } else {			// harmony 1 + 3 || 1 + 7
                result_piano.push(
                    [[], [[i_instrument,
                        [note,
                            SOUNDS[i_octave + t_scale[step + o_harmony.interval]]],
                        (16 / i_note_duration) / 16]]]
                );
            }
        } else {			//harmony 1 + 3 + 7 -> full chord
            result_piano.push(
                [[], [[i_instrument,
                    [note,
                        SOUNDS[i_octave + t_scale[step + 2]],
                        SOUNDS[i_octave + t_scale[step + 4]]],
                    (16 / i_note_duration) / 16]]]
            );
        }
        console.log('step: ' + step +' note: ' + SOUNDS[(i_octave + t_scale[step + o_harmony.interval])]);
        for (let i = 0; i < (16 / i_note_duration) - 1; i++)	// filling bar with the duration 1/16
            result_piano.push([[], []]);

    };

    o_Harmony(t_harmony) {
        const t_result_harmony = [];
        for (let i = 0; i < t_harmony.length; i++) {
            for (let x = 0; x < t_harmony[i].chance; x++) {
                t_result_harmony.push(t_harmony[i]);
            }
        }
        return t_result_harmony[this.i_chooseIndexFromTable(t_result_harmony)];
    };

    b_ifHarmonyEqual(o_harmony, o_harmony_to_compare) {
        return o_harmony.interval === o_harmony_to_compare.interval &&
            o_harmony.notes === o_harmony_to_compare.notes;
    };


    pause(note) {
        const pause = [];
        for (let i = 0; i < 16 / note; i++)
            pause.push([[], []]);
        return pause;
    };

    i_noteDuration(duration_matrix) {
        const result_table_duration = [];
        for (let i = 0; i < duration_matrix.full; i++) {
            result_table_duration.push(1);
        }
        for (let i = 0; i < duration_matrix.half; i++) {
            result_table_duration.push(2);
        }
        for (let i = 0; i < duration_matrix.quater; i++) {
            result_table_duration.push(4);
        }
        for (let i = 0; i < duration_matrix.eight; i++) {
            result_table_duration.push(8);
        }
        for (let i = 0; i < duration_matrix.sixteenth; i++) {
            result_table_duration.push(16);
        }
        return this.chooseElementFromTable2(result_table_duration);
    };

    t_stepScaleTable(stepTable) {
        const result = [];
        for (let i = 0; i < stepTable.length; i++) {
            result.push([]);
            for (let x = 0; x < stepTable[i].length; x++) {
                for (let y = 0; y < stepTable[i][x]; y++) {
                    result[i].push(x);
                }
            }
        }
        console.log(result);
        return result;
    };

    generateNumberScale() {
        return Math.floor(Math.random() * 7);
    };

    progression(scale, chords, bars) {
        const result = [0];
        let tableOfProgression = this.t_stepScaleTable(scale.progressionMap);
        for (let i = 0; i < chords; i++) {
            if (chords - i === 1) {
                tableOfProgression = this.t_stepScaleTable(scale.end);
            }
            const elem = this.chooseElementFromTable2(tableOfProgression[result[i]]);
            result.push(elem);
        }
        return result;
    }

    i_chooseIndexFromTable(durationLTableLength) {
        return Math.floor(Math.random() * durationLTableLength.length);
    }

    chooseElementFromTable2(table) {
        return table[Math.floor(Math.random() * table.length)];
    }

    o_Section(i_section_index) {
        const tab = [];
        for (let x = 0; x < this.state.sections_decision_tables[i_section_index].length; x++) {
            for (let y = 0; y < this.state.sections_decision_tables[i_section_index][x]; y++) {
                tab.push(x);
            }
        }
        return this.chooseElementFromTable2(tab);
    }

    play = () => {
        var drumsData = [
            [[bassDrum, hiHat], []], [[], []], [[], []], [[], []], [[snare, hiHat], []], [[], []], [[], []], [[], []], [[bassDrum, hiHat], []], [[], []], [[], []], [[], []], [[snare, hiHat], []], [[], []], [[], []], [[], []], [[bassDrum, hiHat], []], [[], []], [[], []], [[], []], [[snare, hiHat], []], [[], []], [[], []], [[], []], [[bassDrum, hiHat], []], [[], []], [[], []], [[], []], [[snare, hiHat], []], [[], []], [[], []], [[], []], [[bassDrum, hiHat], []], [[], []], [[], []], [[], []], [[snare, hiHat], []], [[], []], [[], []], [[], []], [[bassDrum, hiHat], []], [[], []], [[], []], [[], []], [[snare, hiHat], []], [[], []], [[], []], [[], []], [[bassDrum, hiHat], []], [[], []], [[bassDrum, hiHat], []], [[], []], [[snare, hiHat], []], [[], []], [[bassDrum, cymbal], []], [[], []], [[], []], [[], []], [[bassDrum], []], [[], []], [[snare, hiHat], []], [[], []], [[snare], []], [[snare], []]
        ];


        // const progression = [7];
        let rightHand = [];
        let leftHand = [];
        let section = this.chooseElementFromTable2([0, 1, 2, 3]);
        let tension = 0;
        //this.b_chance(tension)
        while(tension < 2.4){
            const CHORDS = this.state.sections[section].CHORDS;
            const BARS = this.state.sections[section].BARS;
            console.log('tesion: ' +  tension + ' section: ' + section + ' Chords: ' + CHORDS + ' Bars: ' + BARS);
            const progression = this.progression(scalesStepMap.aeolian, CHORDS, BARS);
            const progression2 = this.progression(scalesStepMap.aeolian, CHORDS, BARS);
            console.log('progression: ' + progression);
            for(let i = 0; i < progression.length; i++) {
                rightHand = rightHand.concat(this.t_ComposeMelody(
                    BARS,
                    SCALE,
                    progression[i],
                    OCTAVE_RIGHT,
                    this.state.sections[section].RIGHT_DURATION,
                    this.state.sections[section].RIGHT_HARMONY,
                    true,
                    this.state.RIGHT_INSTRUMENT));
                leftHand = leftHand.concat(this.t_ComposeMelody(
                    BARS,
                    SCALE,
                    progression[i],
                    OCTAVE_LEFT,
                    this.state.sections[section].LEFT_DURATION,
                    this.state.sections[section].LEFT_HARMONY,
                    false,
                    this.state.LEFT_INSTRUMENT)
                );
            }
            b_firstTimeRight = false;
            for(let i = 0; i < progression2.length; i++) {
                rightHand = rightHand.concat(this.t_ComposeMelody(
                    BARS,
                    SCALE,
                    progression2[i],
                    OCTAVE_RIGHT,
                    this.state.sections[section].RIGHT_DURATION,
                    this.state.sections[section].RIGHT_HARMONY,
                    true,
                    this.state.RIGHT_INSTRUMENT));
                leftHand = leftHand.concat(this.t_ComposeMelody(
                    BARS,
                    SCALE,
                    progression2[i],
                    OCTAVE_LEFT,
                    this.state.sections[section].LEFT_DURATION,
                    this.state.sections[section].LEFT_HARMONY,
                    false,
                    this.state.LEFT_INSTRUMENT)
                );
            }
            section = this.o_Section(section);
            // section = 0;
            tension += 0.1;
            b_firstTimeRight = true;
        }

        // for(let i = 0; i < progression.length; i++) {
        // 	rightHand = rightHand.concat(this.t_ComposeMelody(BARS, SCALE, progression[i], 4, this.state.chorus.RIGHT_DURATION, this.state.chorus.RIGHT_HARMONY));
        // 	leftHand = leftHand.concat(this.t_ComposeMelody(BARS, SCALE, progression[i], 3, this.state.verse.chorus, this.state.chorus.RIGHT_HARMONY));
        // }
        if(PLAY_RIGHT)
            this.rightHand.startPlayLoop(rightHand, BPM, 1/16, this.rightHand.beatIndex);
        if(PLAY_LEFT)
            this.leftHand.startPlayLoop(leftHand, BPM, 1/16, this.leftHand.beatIndex);
        if(PLAY_DRUMS)
            this.midiSoundsDrums.startPlayLoop(drumsData, BPM, 1/16, this.midiSoundsDrums.beatIndex);
    };

    testMethod(){
        const testBPM = 200;
        let rightHand = [];
        let leftHand = [];
        let section = this.chooseElementFromTable2([0, 1, 2, 3, 4, 5]);
        const CHORDS = 1;
        const BARS = 1;
        console.log('test method run');
        // const progression = this.progression(scalesStepMap.aeolian, CHORDS, BARS);
        const progression = [0, 1, 2, 3, 4, 5, 6];
        for(let i = 0; i < progression.length; i++) {
            rightHand = rightHand.concat(this.t_ComposeMelody(
                BARS,
                SCALE,
                progression[i],
                OCTAVE_RIGHT,
                this.state.sections[section].RIGHT_DURATION,
                this.state.sections[section].RIGHT_HARMONY, true,
                RIGHT_INSTRUMENT));
            leftHand = leftHand.concat(this.t_ComposeMelody(
                BARS,
                SCALE,
                progression[i],
                OCTAVE_LEFT,
                this.state.sections[section].LEFT_DURATION,
                this.state.sections[section].LEFT_HARMONY, false,
                LEFT_INSTRUMENT)
            );
        }
        if(PLAY_RIGHT)
            this.rightHand.startPlayLoop(rightHand, testBPM, 1/16);
        if(PLAY_LEFT)
            this.leftHand.startPlayLoop(leftHand, testBPM, 1/16);
    };


    stopAll(){
        this.midiSoundsDrums.stopPlayLoop();
        this.midiSoundsDrums.beatIndex=0;

        this.leftHand.stopPlayLoop();
        this.leftHand.beatIndex=0;

        this.rightHand.stopPlayLoop();
        this.rightHand.beatIndex=0;
    }


    render() {
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
        const MidiStyle = {
            display: 'none',
        };
        return (
            <div className="App">
                <p>
                    <div style={style}>
                        <Button style={buttonStyle} icon labelPosition='left' onClick={this.play.bind(this)}>
                            Play
                            <Icon name='play' />
                        </Button>
                        <Button style={buttonStyle} icon labelPosition='left'  onClick={this.stopAll.bind(this)}>
                            <Icon name='stop' />
                            Stop
                        </Button>
                        {/*<Button style={buttonStyle} icon labelPosition='left'  onClick={this.testMethod.bind(this)}>*/}
                        {/*    Download*/}
                        {/*    <Icon name='download' />*/}
                        {/*</Button>*/}
                        <select value={this.state.selectedInstrument} onChange={this.onSelectInstrument.bind(this)}>{this.createSelectItems()}</select>
                    </div>
                </p>
                <div style={MidiStyle}>
                <MIDISounds style={MidiStyle} ref={(ref) => (this.midiSoundsDrums = ref)} appElementName="root" drums={[bassDrum,snare,hiHat,cymbal]} />
                <MIDISounds style={MidiStyle} ref={(ref) => (this.leftHand = ref)} appElementName="root" instruments={[RIGHT_INSTRUMENT]}/>
                <MIDISounds style={MidiStyle} ref={(ref) => (this.rightHand = ref)} appElementName="root" instruments={[LEFT_INSTRUMENT]}/>
                </div>
                </div>
        );
    }

    onSelectInstrument(e){
        var list=e.target;
        let n = list.options[list.selectedIndex].getAttribute("value");
        this.setState({
            RIGHT_INSTRUMENT: n
        });
        this.rightHand.cacheInstrument(n);
        this.stopAll();
    }

    createSelectItems() {
        if (this.rightHand) {
            if (!(this.items)) {
                this.items = [];
                for (let i = 0; i < this.rightHand.player.loader.instrumentKeys().length; i++) {
                    this.items.push(<option key={i} value={i}>{'' + (i + 0) + '. ' + this.rightHand.player.loader.instrumentInfo(i).title}</option>);
                }
            }
            return this.items;
        }
    }

}

export default SoundEngine;
