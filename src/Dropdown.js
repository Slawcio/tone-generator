import React from 'react'
import { Dropdown } from 'semantic-ui-react'



    const style = {
      display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '20em',
        margin: '2.5px'
    };

const DropdownKey = (props) => (
    <Dropdown
        placeholder='Select right instrument'
        fluid
        selection={props.value}
        options={props.options}
        style={style}
    />
)

export default DropdownKey