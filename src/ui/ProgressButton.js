import React from 'react'
import { Button as MuiButton, CircularProgress } from '@material-ui/core'

const ProgressButton = ({
  label,
  caption,
  loading = false,
  visible = false,
  children
}) => {
  if (!visible) return null

  return (
    <MuiButton size='small' variant='contained' color='primary'>
      {label || caption || children} &nbsp;
      {loading && <CircularProgress size={18} color='secondary' />}
    </MuiButton>
  )
}

export default ProgressButton
