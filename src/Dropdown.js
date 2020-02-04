import React from 'react'
import { Dropdown } from 'semantic-ui-react'



    const style = {
      display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '15em',
        margin: '2.5px'
    };

const DropdownKey = (props) => (
    <Dropdown
        placeholder='Select Key'
        fluid
        selection={5}
        options={props.options}
        style={style}
    />
)

export default DropdownKey