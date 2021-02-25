import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import _object from 'lodash/object'
import { makeId, currencyFormat, formatNumber } from '../lib/util'

const formatters = {
  currency: currencyFormat,
  number: formatNumber
}

const makeClasses = makeStyles((theme) => ({
  head: {
    fontWeight: 'bold',
    opacity: 0.8
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  pagination: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  }
}))

const getTableHeaders = ({ children }) => {
  const classes = makeClasses()
  const headers = React.Children.map(children, (child) => {
    const { caption, expr, ...rest } = child.props
    return (
      <TableCell key={makeId()} className={classes.head} {...rest}>
        {caption}
      </TableCell>
    )
  })
  return headers
}

const cloneChildren = (item, children) => {
  return React.Children.map(children, (child) => {
    const action = child.props ? child.props.action : null
    if (typeof action === 'function') {
      const delegateFunc = (evt) => {
        evt.stopPropagation()
        action(item)
      }
      return React.cloneElement(child, { action: delegateFunc }, children)
    } else if (children.length > 0) {
      const subChildren = cloneChildren(item, children)
      return React.cloneElement(child, {}, subChildren)
    }
    return child
  })
}

const getCellValue = ({ item, name, expr, format, children }) => {
  let cellValue
  if (name) {
    const formatter = formatters[format]
    const value = item[name]
    cellValue = formatter ? formatter(value) : value
  } else if (expr) {
    if (typeof expr === 'string') {
      const formatter = formatters[format]
      const value = _object.get(item, expr)
      cellValue = formatter ? formatter(value) : value
    } else {
      cellValue = expr(item).toString()
    }
  } else {
    if (typeof children === 'function') {
      cellValue = children(item)
    } else {
      cellValue = cloneChildren(item, children)
    }
  }
  return cellValue
}

const getTableBody = ({ items, children }) => {
  const body = []
  items.forEach((item) => {
    const cells = React.Children.map(children, (child, idx) => {
      const { caption, name, expr, format, children, ...rest } = child.props
      const cellValue = getCellValue({ item, name, expr, format, children })
      const firstCellProps = idx === 0 ? { component: 'th', scope: 'row' } : {}
      return (
        <TableCell key={makeId()} {...firstCellProps} {...rest}>
          {cellValue}
        </TableCell>
      )
    })
    body.push(<TableRow key={makeId()}>{cells}</TableRow>)
  })
  return body
}

const BasicTable = ({ keyId, items, children }) => {
  const classes = makeClasses()
  const header = getTableHeaders({ items, children })
  const body = getTableBody({ keyId, items, children })

  return (
    <Paper className={classes.paper}>
      <TableContainer>
        <Table size='small'>
          <TableHead>
            <TableRow>{header}</TableRow>
          </TableHead>
          <TableBody>{body}</TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

const Item = (props) => {
  return <div>{props.children}</div>
}

Table.Item = Item

export default BasicTable
