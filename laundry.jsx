import Axios from 'axios'
import React, { useState } from 'react'
import { Card } from 'react-mdl'
import { Paginate } from '../Utils/paginate'
import {
  Button,
  Collapse,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Navbar,
  Table
} from 'reactstrap'
import Pag from '../Pagination/pagination'
import style from './laundry.module.css'
import DeleteIcon from '@material-ui/icons/Delete'
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt'

const Laundry = ({ bill, deleteBills }) => {
  const [pageNumber] = useState(2)
  const [currentPage, setCurrentPage] = useState(1)
  const [pay, setPay] = useState(false)
  const [add, setAdd] = useState(false)
  const [field, setField] = useState({
    bill_id: '',
    category: '',
    item: '',
    qty: '',
    price: 0,
    name: '',
    amount: '',
    deposit: '',
    status: '',
    balance: 'No Balance',
    modal: false
  })
  const handleSubmit = e => {
    e.preventDefault()
    Axios.post('http://localhost:8000/customers/bills', {
      category: field.category,
      item: field.item,
      qty: field.qty,
      price: field.price,
      name: field.name,
      amount: field.amount,
      deposit: field.deposit,
      balance: field.balance,
      status: field.status
    }).then(response => {
      if (response) {
        alert('Transaction Successful')
      } else {
        alert('Item Already Exist')
      }
    })
  }
  const handleChange = e => {
    setField(prop => ({
      ...prop,
      [e.target.name]: e.target.value
    }))
  }
  const open = () => {
    setPay(prev => !prev)
  }
  const openLaundry = () => {
    setAdd(prev => !prev)
  }
  const handleUpdate = e => {
    Axios.put('http://localhost:8000/bills', {
      bill_id: field.bill_id,
      category: field.category,
      item: field.item,
      qty: field.qty,
      price: field.price,
      name: field.name,
      amount: field.amount,
      deposit: field.deposit,
      balance: field.balance,
      status: field.status
    }).then(response => {
      if (response) {
        alert('Laundry Updated !')
      }
    })
  }
  const UpdateModal = data => {
    setField({
      modal: true,
      bill_id: data.bill_id,
      category: data.category,
      item: data.item,
      qty: data.qty,
      price: data.price,
      name: data.name,
      amount: data.amount,
      deposit: data.deposit,
      balance: data.balance,
      status: data.status
    })
  }
  const handlePage = page => {
    setCurrentPage(page)
  }
  const listOfBill = Paginate(bill, currentPage, pageNumber)
  return (
    <div className={style.container}>
      <Modal isOpen={field.modal} toggle={() => setField({ modal: false })}>
        <ModalHeader>New Laundry</ModalHeader>
        <ModalBody>
          <div className={style.card}>
            <Form onSubmit={handleSubmit}>
              <Card>
                <FormGroup>
                  <Label>Item Name</Label>
                  <Input
                    name='item'
                    value={field.bill_id}
                    onChange={handleChange}
                    disabled
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Category</Label>
                  <Input
                    type='select'
                    name='category'
                    value={field.category}
                    onChange={handleChange}
                  >
                    <option defaultValue=''>Choose...</option>
                    <option>Clothes</option>
                    <option>Rugs</option>
                    <option>Home</option>
                    <option>Vehicle</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label>Item Name</Label>
                  <Input
                    name='item'
                    value={field.item}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Quantity</Label>
                  <Input
                    type='number'
                    name='qty'
                    value={field.qty}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Service Charge(#)</Label>
                  <Input
                    placeholder='Price'
                    type='number'
                    name='price'
                    value={field.price}
                    onChange={handleChange}
                    disabled
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Customer Name</Label>
                  <Input
                    className=''
                    name='name'
                    value={field.name}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Amount(#)</Label>
                  <Input
                    className=''
                    value={(field.amount = field.price)}
                    onChange={handleChange}
                    name='amount'
                    disabled
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Deposit(#)</Label>
                  <Input
                    className=''
                    value={field.deposit}
                    onChange={handleChange}
                    name='deposit'
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Balance</Label>
                  <Input
                    value={(field.balance = field.price - field.deposit)}
                    name='balance'
                    onChange={handleChange}
                    disabled
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Status</Label>
                  <Input
                    type='select'
                    name='status'
                    value={field.status}
                    onChange={handleChange}
                  >
                    <option defaultValue=''>Choose...</option>
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Ready</option>
                  </Input>
                </FormGroup>
                <p />
                <FormGroup>
                  <Button
                    className='btn-block bg-success'
                    onClick={handleUpdate}
                  >
                    Update Payment
                  </Button>
                </FormGroup>
              </Card>
            </Form>
          </div>
        </ModalBody>
      </Modal>
      {/* New Laundry session */}
      <Modal isOpen={add} toggle={() => setAdd(false)}>
        <ModalHeader>New Laundry</ModalHeader>
        <ModalBody>
          <div className={style.card}>
            <Form onSubmit={handleSubmit}>
              <Card>
                <FormGroup>
                  <Label>Category</Label>
                  <Input
                    type='select'
                    name='category'
                    value={field.category}
                    onChange={handleChange}
                  >
                    <option defaultValue=''>Choose...</option>
                    <option>Clothes</option>
                    <option>Rugs</option>
                    <option>Home</option>
                    <option>Vehicle</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label>Item Name</Label>
                  <Input
                    name='item'
                    value={field.item}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Quantity</Label>
                  <Input
                    type='number'
                    name='qty'
                    value={field.qty}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Service Charge(#)</Label>
                  <Input
                    placeholder='Price'
                    type='number'
                    name='price'
                    value={(field.price = field.qty * 200)}
                    onChange={e => setField(e.target.value)}
                    disabled
                  />
                </FormGroup>
                <FormGroup>
                  <Button className='btn-block bg-primary' onClick={open}>
                    Make Payment
                  </Button>
                </FormGroup>
                <hr />
                <Collapse isOpen={pay} toggle={open}>
                  <FormGroup>
                    <Label>Customer Name</Label>
                    <Input
                      className=''
                      name='name'
                      value={field.name}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Amount(#)</Label>
                    <Input
                      className=''
                      value={(field.amount = field.price)}
                      onChange={handleChange}
                      name='amount'
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Deposit(#)</Label>
                    <Input
                      className=''
                      value={field.deposit}
                      onChange={handleChange}
                      name='deposit'
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Balance</Label>
                    <Input
                      value={(field.balance = field.price - field.deposit)}
                      name='balance'
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Status</Label>
                    <Input
                      type='select'
                      name='status'
                      value={field.status}
                      onChange={handleChange}
                    >
                      <option defaultValue=''>Choose...</option>
                      <option>Pending</option>
                      <option>Processing</option>
                      <option>Ready</option>
                    </Input>
                  </FormGroup>

                  <p />
                  <FormGroup>
                    <Button className='btn-block bg-primary'>Pay</Button>
                  </FormGroup>
                </Collapse>
              </Card>
            </Form>
          </div>
        </ModalBody>
      </Modal>
      <div>
        <Navbar className='nav bg-dark'>
          <Button className='btn-dark' onClick={openLaundry}>
            New Laundry
          </Button>
        </Navbar>
        <p />
        <Table bordered style={{ textAlign: 'center' }}>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Item</th>
            <th scope='col'>Qty</th>
            <th scope='col'>Price(#)</th>
            <th scope='col'>Name</th>
            <th scope='col'>Amount</th>
            <th scope='col'>Deposit)</th>
            <th scope='col'>Balance(#)</th>
            <th scope='col'>Status</th>
            <th scope='col'>Action</th>
          </tr>
          {listOfBill.map(laund => (
            <tr key={laund.id}>
              <td>{laund.bill_id}</td>
              <td>{laund.item}</td>
              <td>{laund.qty}</td>
              <td>{laund.price}</td>
              <td>{laund.name}</td>
              <td>{laund.amount}</td>
              <td>{laund.deposit}</td>
              <td>{laund.balance}</td>
              <td>{laund.status}</td>
              <td>
                <Button
                  className='bg-success mr-1'
                  onClick={() => UpdateModal(laund)}
                >
                  <SystemUpdateAltIcon />
                </Button>
                <Button
                  className='bg-danger ml-2'
                  onClick={() => deleteBills(laund.bill_id)}
                >
                  <DeleteIcon />
                </Button>
              </td>
            </tr>
          ))}
        </Table>
        <div style={{ marginLeft: '50em' }}>
          <Pag
            currentPage={currentPage}
            pageNumber={pageNumber}
            bill={bill.length}
            handlePage={handlePage}
          />
        </div>
      </div>
    </div>
  )
}

export default Laundry
