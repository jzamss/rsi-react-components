import React from 'react'

const Spacer = ({height, children}) => {
  const styles = {
    spacer: {
      height: height || 20
    }
  }

  return <div style={styles.spacer}>{children}</div>
}

export default Spacer
