import React, { useState } from 'react'
import { useForm } from 'react-final-form'
import { makeStyles } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import Table from './Table'
import ActionBar from './ActionBar'
import Button from './Button'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  margin: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  withoutLabel: {
    marginTop: theme.spacing(3)
  },
  textField: {
    width: '25ch'
  }
}))

const Lookup = ({
  name,
  keyId = 'objid',
  expr,
  caption,
  visible = true,
  editable = true,
  readOnly = false,
  containerStyle,
  children,
  onSelect,
  query: initialQuery,
  searchFieldTitle,
  searchField,
  hideSearchText = false,
  enableSelect = true,
  fetchList,
  rowsPerPage = 5,
  showPagination = false,
  singleSelect = true
}) => {
  const classes = useStyles()
  const [searchText, setSearchText] = useState('')
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState({})
  const [selectedItem, setSelectedItem] = useState()
  const ff = useForm()

  if (!visible) return null

  const openLookupPage = () => {
    if (searchField) {
      const query = { ...initialQuery, [searchField]: searchText, searchText }
      setQuery(query)
    }
    setOpen(true)
  }

  const onCancel = () => {
    setOpen(false)
  }

  const onAccept = () => {
    const pass = onSelect(selectedItem)
    if (pass) {
      setOpen(false)
      if (typeof expr === 'function') {
        setSearchText(expr(selectedItem))
      } else {
        setSearchText(selectedItem[name])
      }
      ff.change(name, selectedItem)
    }
  }

  const handleChange = (evt) => {
    setSearchText(evt.target.value)
  }

  const items = fetchList(query)

  return (
    <React.Fragment>
      {hideSearchText ? (
        <IconButton onClick={openLookupPage}>
          <SearchIcon />
        </IconButton>
      ) : (
        <TextField
          className={classes.margin}
          label={caption}
          value={searchText}
          onChange={handleChange}
          variant='outlined'
          size='small'
          helperText={searchFieldTitle}
          autoFocus={true}
          InputProps={{
            readOnly: readOnly || !editable,
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={openLookupPage}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      )}

      <Dialog open={open}>
        <DialogTitle>{caption}</DialogTitle>
        <DialogContent style={{ width: 600 }}>
          <Table
            items={items}
            rowsPerPage={rowsPerPage}
            showPagination={showPagination}
            singleSelect={singleSelect}
            keyId={keyId}
            onSelectItem={setSelectedItem}
          >
            {children}
          </Table>
          <ActionBar>
            <Button variant='text' caption='Cancel' action={onCancel} />
            <Button
              caption='Select'
              action={onAccept}
              disabled={!enableSelect}
            />
          </ActionBar>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}

export default Lookup
