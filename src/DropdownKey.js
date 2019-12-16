import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const keys = [
    {
        key: 'C',
        text: 'C',
        value: 'C',
    },
    {
        key: 'C#',
        text: 'C#',
        value: 'C#'
    },
    {
        key: 'D',
        text: 'D',
        value: 'D'
    },
    {
        key: 'D#',
        text: 'D#',
        value: 'D#'
    },
    {
        key: 'E',
        text: 'E',
        value: 'E'
    },
    {
        key: 'F',
        text: 'F',
        value: 'F'
    },
    {
        key: 'F#',
        text: 'F#',
        value: 'F#'
    },
    {
        key: 'G',
        text: 'G',
        value: 'G'
    },
    {
        key: 'G#',
        text: 'G#',
        value: 'G#'
    },
    {
        key: 'A',
        text: 'A',
        value: 'A'
    },
    {
        key: 'A#',
        text: 'A#',
        value: 'A#'
    },
    {
        key: 'B',
        text: 'B',
        value: 'B'
    },
]

    const style = {
      display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '15em',
        margin: '2.5px'
    };

const DropdownKey = () => (
    <Dropdown
        placeholder='Select Key'
        fluid
        selection
        options={keys}
        style={style}
    />
)

export default DropdownKey