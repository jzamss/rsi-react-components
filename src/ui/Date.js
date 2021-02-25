import React from 'react'
import { Field } from 'react-final-form'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { padLeft } from '../lib/util'

const CustomDate = ({
  name,
  caption,
  visible = true,
  disabled = false,
  autoOk = true,
  helperText = 'mm/dd/yyy',
  variant = 'standard',
  size = 'small'
}) => {
  if (!visible) return null

  const changeHandler = (input, dt) => {
    let value = dt
    if (dt && !/invalid/i.test(dt.toString())) {
      const sdt = dt.toLocaleDateString()
      const tokens = sdt.split('/')
      tokens[0] = padLeft(tokens[0], 2)
      tokens[1] = padLeft(tokens[1], 2)
      value = `${tokens[2]}-${tokens[0]}-${tokens[1]}`
    }
    input.onChange(value)
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Field name={name}>
        {({ input }) => (
          <KeyboardDatePicker
            {...input}
            disableToolbar
            format='MM/dd/yyyy'
            variant='inline'
            margin='normal'
            inputVariant={variant}
            size={size}
            label={caption}
            helperText={helperText}
            fullWidth={true}
            autoOk={autoOk}
            value={input.value || null}
            onChange={(dt) => changeHandler(input, dt)}
            disabled={disabled}
          />
        )}
      </Field>
    </MuiPickersUtilsProvider>
  )
}

export default CustomDate
