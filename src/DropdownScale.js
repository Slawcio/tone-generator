import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const scales = [
    {
        key: 'Ionian',
        text: 'Ionian',
        value: 'Ionian',
    },
    {
        key: 'Dorian',
        text: 'Dorian',
        value: 'Dorian'
    },
    {
        key: 'Phrygian',
        text: 'Phrygian',
        value: 'Phrygian'
    },
    {
        key: 'Lydian',
        text: 'Lydian',
        value: 'Lydian'
    },
    {
        key: 'Mixolydian',
        text: 'Mixolydian',
        value: 'Mixolydian'
    },
    {
        key: 'Aeolian',
        text: 'Aeolian',
        value: 'Aeolian'
    },
    {
        key: 'Locrian',
        text: 'Locrian',
        value: 'Locrian'
    }
]

const style = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'stretch',
    width: '15em',
    margin: '2.5px'
};

const DropdownScale = () => (
    <Dropdown
        placeholder='Select scale'
        fluid
        selection
        options={scales}
        style={style}
    />
)

export default DropdownScale