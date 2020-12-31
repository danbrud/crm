import React from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'

const Dropdown = ({ label, value, handleSelections, name, disabled, dropdownItems, disabledText }) => {

  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={handleSelections} inputProps={{ name }}>
        <MenuItem disabled={disabled}>
          <em>-- {disabledText} --</em>
        </MenuItem>
        {dropdownItems.map((dropdownItem, i) => <MenuItem key={i} value={dropdownItem}>{dropdownItem}</MenuItem>)}
      </Select>
    </FormControl>
  )
}

export default Dropdown