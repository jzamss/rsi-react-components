import React from 'react'
import { Link as MuiLink } from '@material-ui/core'

const Link = ({ caption, exprValue, visibleWhen = true, children, ...rest }) => {
  if (!visibleWhen) return null
  return (
    <MuiLink variant='body2' {...rest}>
      {caption || children}
    </MuiLink>
  )
}

export default Link
