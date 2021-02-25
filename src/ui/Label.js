import React from 'react'
import { Field } from 'react-final-form'
import { makeStyles } from '@material-ui/core/styles'

const makeClasses = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5)
  },
  caption: {
    fontWeight: '800',
    fontSize: 14,
    width: 200
  },
  label: {
    fontSize: '14px'
  }
}))

const Label = ({
  name,
  caption,
  visible = true,
  containerStyle = {},
  captionStyle = {},
  labelStyle = {},
  expr
}) => {
  if (!visible) return null

  const classes = makeClasses()

  return (
    <Field name={name}>
      {({ input, values }) => (
        <div className={classes.wrapper} style={{ ...containerStyle }}>
          {caption && (
            <label className={classes.caption} style={{ ...captionStyle }}>
              {caption}
            </label>
          )}
          <label className={classes.label} style={{ ...labelStyle }}>
            {typeof expr === 'function'
              ? expr(input.value, values)
              : input.value}
          </label>
        </div>
      )}
    </Field>
  )
}

export default Label
