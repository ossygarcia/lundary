import Axios from 'axios'
import React, { useState } from 'react'
import {
  Form,
  FormGroup,
  Input,
  Button,
  Table,
  Container,
  Modal,
  ModalBody,
  Navbar
} from 'reactstrap'
import { Transaction } from '../API/api'
import SupplyPagination from '../Pagination/supplyPagination'
import DeleteIcon from '@material-ui/icons/Delete'
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt'
import { PaginateSupply } from '../Utils/paginate'
import style from './supply.module.css'

const Supply = ({ supply, deletes }) => {
  const [pageNumber] = useState(2)
  const [currentPage, setCurrentPage] = useState(1)
  const [modal, setModal] = useState(false)
  const [input, setInput] = useState({
    transaction_id: '',
    item: '',
    qty: '',
    price: '',
    staffId: '',
    modal: false
  })

  const handleModal = () => {
    setModal(prev => !prev)
  }
  const UpdateModal = data => {
    setInput({
      modal: true,
      transaction_id: data.transaction_id,
      staffId: data.staffId,
      item: data.item,
      qty: data.qty,
      price: data.price
    })
  }

  const handleChange = e => {
    setInput(prop => ({ ...prop, [e.target.name]: e.target.value }))
  }
  const handleSubmit = e => {
    e.preventDefault()
    Transaction(input).then(res => {
      if (res) {
        setInput(input)
      }
    })
  }
  const UpdateSupply = transaction => {
    Axios.put('http://localhost:8000/transactions', {
      transaction_id: input.transaction_id,
      staffId: input.staffId,
      item: input.item,
      qty: input.qty,
      price: input.price
    }).then(response => {
      if (response) {
        alert('updated')
      }
    })
  }
  const handlePage = page => {
    setCurrentPage(page)
  }
  const listOfSupply = PaginateSupply(supply, currentPage, pageNumber)

  return (
    <div className={style.container}>
      <Modal isOpen={modal} toggle={() => setModal(false)}>
        <ModalBody style={{ padding: 50 }}>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Input
                placeholder='Customer ID'
                name='staffId'
                className='col-md-7'
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Input placeholder='Item' onChange={handleChange} name='item' />
            </FormGroup>
            <FormGroup>
              <Input
                type='number'
                name='qty'
                placeholder='Qty'
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type='number'
                placeholder='Price'
                name='price'
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Button className='btn-block bg-success'>Receive</Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
      <Modal isOpen={input.modal} toggle={() => setInput(false)}>
        <ModalBody>
          <Form>
            <FormGroup>
              <Input
                name='staffId'
                className='col-md-7'
                onChange={e => e.target.value}
                value={input.transaction_id}
                disabled
              />
            </FormGroup>
            <FormGroup>
              <Input
                name='staffId'
                className='col-md-7'
                onChange={handleChange}
                value={input.staffId}
              />
            </FormGroup>
            <FormGroup>
              <Input onChange={handleChange} name='item' value={input.item} />
            </FormGroup>
            <FormGroup>
              <Input
                type='number'
                name='qty'
                value={input.qty}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type='number'
                name='price'
                value={input.price}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Button className='btn-block bg-success' onClick={UpdateSupply}>
                Receive
                </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
      <Container style={{ marginTop: 20, padding: 5 }}>
        <Navbar className='nav bg-dark'>
          <Button onClick={handleModal} className='btn-dark'>
            New Supply
          </Button>
        </Navbar>
        <Table className='table table-border' style={{ textAlign: 'center' }} bordered>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Staff ID</th>
            <th scope='col'>Item</th>
            <th scope='col'>Qty</th>
            <th scope='col'>Price</th>
            <th scope='col'>Date</th>
            <th scope='col'>Action</th>
          </tr>
          {listOfSupply.map(sup => (
            <tr key={sup.id}>
              <td>{sup.transaction_id}</td>
              <td>{sup.staffId}</td>
              <td>{sup.item}</td>
              <td>{sup.qty}</td>
              <td>{sup.price}</td>
              <td>{sup.date}</td>
              <td>
                <Button
                  className='bg-success mr-1'
                  onClick={() => UpdateModal(sup)}
                >
                  <SystemUpdateAltIcon />
                </Button>
                <Button
                  className='bg-danger ml-2'
                  onClick={() => {
                    deletes(sup.transaction_id)
                  }}
                >
                  <DeleteIcon />
                </Button>
              </td>
            </tr>
          ))}
        </Table>
        <Table>
          <Container style={{ marginLeft: '50em' }}>
            <SupplyPagination
              currentPage={currentPage}
              pageNumber={pageNumber}
              supply={supply.length}
              handlePage={handlePage}
            />
          </Container>
        </Table>
      </Container>
    </div>
  )
}

export default Supply
