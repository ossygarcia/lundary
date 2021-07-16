import React from 'react'
import { List, Datagrid, TextField } from 'react-admin'

const Bill = props => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source='bill_id' />
        <TextField source='customer_id' />
        <TextField source='bill_amount' />
        <TextField source='quantity' />
        <TextField source='price' />
        <TextField source='date' />
      </Datagrid>
    </List>
  )
}

export default Bill
