import React from 'react'
import Label from './Label'

const Subtitle2 = ({ caption, title, children }) => {
  return <Label labelStyle={styles.title}>{caption || title || children}</Label>
}

const styles = {
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    opacity: 0.85
  }
}

export default Subtitle2
