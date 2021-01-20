import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function SwitchLabels({ value, name, label, register, onChange, error, required, defaultChecked }) {
  const hasValue = value || false
  const [state, setState] = React.useState(hasValue);

  const handleChange = event => {
    setState(event.target.checked);
    onChange && onChange(event)
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            inputRef={required ? register({ required: 'Este campo é obrigatório' }) : register}
            name={name}
            checked={defaultChecked ? defaultChecked : state}
            onChange={handleChange}
            color="primary"
          />
        }
        label={label}
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </FormGroup>
  );
}