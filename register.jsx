import React, { Component } from 'react'
import {
  Form,
  FormGroup,
  Input,
  Button,
  Table,
  Modal,
  ModalBody,
  Navbar,
  Nav,
  Container
} from 'reactstrap'
import style from '././register.module.css'
import './register.module.css'
import { register } from '../API/api'
import Axios from 'axios'
import DeleteIcon from '@material-ui/icons/Delete'
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt'
import { PaginateUsers } from '../Utils/paginate'
import UserPagination from '../Pagination/userPagination'

class Register extends Component {
  constructor (props) {
    super(props)
    if (props.loading) {
      return <h1>Loading..................</h1>
    }

    this.state = {
      staff_id: '',
      fname: '',
      lname: '',
      jobtitle: '',
      gender: '',
      address: '',
      age: '',
      salary: '',
      username: '',
      usernameError: '',
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
      role: '',
      reg: [],
      modal: false,
      modalUpdate: false,
      s: '',
      currentPage: 1,
      pageNumber: 3
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  searching (rows) {
    return rows.filter(
      row => row.staff_id.toLowerCase().indexOf(this.state.s) > -1
    )
  }

  handleSubmit = e => {
    e.preventDefault()
    const data = {
      fname: this.state.fname,
      lname: this.state.lname,
      jobtitle: this.state.jobtitle,
      gender: this.state.gender,
      address: this.state.address,
      age: this.state.age,
      salary: this.state.salary,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      role: this.state.role
    }
    register(data)
      .then(response => {
        if (response) {
          this.props.history.push('/dashboard')
        }
      })
      .catch(err => {
        console.log(err)
      })
    this.setState({
      staff_id: '',
      fname: '',
      lname: '',
      jobtitle: '',
      gender: '',
      address: '',
      age: '',
      salary: '',
      username: '',
      email: '',
      role: ''
    })
  }

  dropModal = () => {
    this.setState({ modal: true })
  }
  UpdateModal = data => {
    this.setState({
      modalUpdate: true,
      staff_id: data.staff_id,
      fname: data.fname,
      lname: data.lname,
      jobtitle: data.jobtitle,
      gender: data.gender,
      address: data.address,
      age: data.age,
      salary: data.salary,
      username: data.username,
      email: data.email,
      role: data.role
    })
  }

  handleUpdate = staff_id => {
    staff_id.preventDefault()
    Axios.put('http://localhost:8000/updateUsers', {
      staff_id: this.state.staff_id,
      fname: this.state.fname,
      lname: this.state.lname,
      jobtitle: this.state.jobtitle,
      gender: this.state.gender,
      address: this.state.address,
      age: this.state.age,
      salary: this.state.salary,
      username: this.state.username,
      email: this.state.email,
      role: this.state.role
    }).then(res => {
      if (res) {
        alert('User Updated!')
      }
      this.setState({
        staff_id: '',
        fname: '',
        lname: '',
        jobtitle: '',
        gender: '',
        address: '',
        age: '',
        salary: '',
        username: '',
        email: '',
        role: ''
      })
    })
  }
  handlePage = page => {
    this.setState({ currentPage: page })
  }

  render () {
    const { currentPage, pageNumber } = this.state
    const { fetch } = this.props
    const listOfUsers = PaginateUsers(fetch, currentPage, pageNumber)
    return (
      <div className={style.container}>
        {/* Update Section */}
        <Modal
          isOpen={this.state.modalUpdate}
          toggle={() => this.setState({ modalUpdate: false })}
        >
          <ModalBody>
            <section className={style.formpanel}>
              <Form onSubmit={this.handleUpdate}>
                <FormGroup>
                  <Input
                    name='fname'
                    value={this.state.staff_id}
                    onChange={this.handleChange}
                    disabled
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    name='fname'
                    value={this.state.fname}
                    onChange={this.handleChange}
                    onErrorCapture={this.state.fname}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    name='lname'
                    value={this.state.lname}
                    onChange={this.handleChange}
                    onErrorCapture={this.state.lname}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type='select'
                    className='form-select'
                    name='jobtitle'
                    value={this.state.jobtitle}
                    onChange={this.handleChange}
                    onErrorCapture={this.state.jobtitle}
                  >
                    <option selected disabled value=''>
                      Choose...
                    </option>
                    <option>Washer</option>
                    <option>Ironing</option>
                    <option>Secretary</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Input
                    type='select'
                    name='gender'
                    value={this.state.gender}
                    onChange={this.handleChange}
                    onErrorCapture={this.state.username}
                  >
                    <option selected disabled value=''>
                      choose
                    </option>
                    <option>Male</option>
                    <option>Female</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Input
                    type='textarea'
                    name='address'
                    value={this.state.address}
                    onChange={this.handleChange}
                    onErrorCapture={this.state.username}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    name='age'
                    value={this.state.age}
                    onChange={this.handleChange}
                    onErrorCapture={this.state.username}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    name='salary'
                    errorText={this.state.salary}
                    value={this.state.salary}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    name='username'
                    errorText={this.state.username}
                    value={this.state.username}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    name='email'
                    errorText={this.state.email}
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup className='md-5'>
                  <Input
                    type='select'
                    name='role'
                    onChange={this.handleChange}
                    value={this.state.role}
                  >
                    <option selected disabled value=''>
                      Choose...
                    </option>
                    <option>Staff</option>
                    <option>Customer</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Button className='btn-block bg-primary'>Update</Button>
                </FormGroup>
              </Form>
            </section>
          </ModalBody>
        </Modal>
        {/* Register section */}
        <Modal
          isOpen={this.state.modal}
          toggle={() => this.setState({ modal: false })}
        >
          <ModalBody>
            <section className={style.formpanel}>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <label for='validationCustom04' className='form-label'>
                    First Name
                  </label>
                  <Input
                    name='fname'
                    value={this.state.fname}
                    onChange={this.handleChange}
                    onErrorCapture={this.state.fname}
                  />
                </FormGroup>
                <FormGroup>
                  <label for='validationCustom04' className='form-label'>
                    Last Name
                  </label>
                  <Input
                    placeholder='lname'
                    name='lname'
                    value={this.state.lname}
                    onChange={this.handleChange}
                    onErrorCapture={this.state.lname}
                  />
                </FormGroup>
                <FormGroup>
                  <label for='validationCustom04' className='form-label'>
                    Job Title
                  </label>
                  <Input
                    type='select'
                    className='form-select'
                    name='jobtitle'
                    value={this.state.jobtitle}
                    onChange={this.handleChange}
                    onErrorCapture={this.state.jobtitle}
                  >
                    <option selected disabled value=''>
                      Choose...
                    </option>
                    <option>Washer</option>
                    <option>Ironing</option>
                    <option>Secretary</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <label for='validationCustom04' className='form-label'>
                    Gender
                  </label>
                  <Input
                    type='select'
                    name='gender'
                    value={this.state.gender}
                    onChange={this.handleChange}
                    onErrorCapture={this.state.username}
                  >
                    <option selected disabled value=''>
                      choose
                    </option>
                    <option>Male</option>
                    <option>Female</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <label for='validationCustom04' className='form-label'>
                    Address
                  </label>
                  <Input
                    type='textarea'
                    name='address'
                    value={this.state.address}
                    onChange={this.handleChange}
                    onErrorCapture={this.state.username}
                  />
                </FormGroup>
                <FormGroup>
                  <label for='validationCustom04' className='form-label'>
                    Age
                  </label>
                  <Input
                    name='age'
                    value={this.state.age}
                    onChange={this.handleChange}
                    onErrorCapture={this.state.username}
                  />
                </FormGroup>
                <FormGroup>
                  <label for='validationCustom04' className='form-label'>
                    Salary
                  </label>
                  <Input
                    name='salary'
                    errorText={this.state.salary}
                    value={this.state.salary}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <label for='validationCustom04' className='form-label'>
                    Username
                  </label>
                  <Input
                    name='username'
                    errorText={this.state.username}
                    value={this.state.username}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <label for='validationCustom04' className='form-label'>
                    email
                  </label>
                  <Input
                    name='email'
                    errorText={this.state.email}
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <label for='validationCustom04' className='form-label'>
                    Password
                  </label>
                  <Input
                    type='password'
                    placeholder='Password'
                    name='password'
                    errorText={this.state.password}
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup className='md-5'>
                  <label for='validationCustom04' className='form-label'>
                    Role
                  </label>
                  <Input
                    type='select'
                    name='role'
                    onChange={this.handleChange}
                    value={this.state.role}
                  >
                    <option selected disabled value=''>
                      Choose...
                    </option>
                    <option>Staff</option>
                    <option>Customer</option>
                  </Input>
                  <div className='invalid-feedback'>
                    Please select a valid state.
                  </div>
                </FormGroup>
                <FormGroup>
                  <Button className='btn-block bg-primary'>Register</Button>
                </FormGroup>
                <Button onClick={() => this.setState({ modal: false })}>
                  Add User
                </Button>
              </Form>
            </section>
          </ModalBody>
        </Modal>
        <section className={style.text}>
          <Navbar className='nav bg-dark'>
            <Nav>
              <Button onClick={this.dropModal} className='btn-dark'>
                Create Account
              </Button>
            </Nav>
            <Nav>
              <Input
                value={this.state.s}
                onChange={e => this.searching(e.target.value)}
                placeholder='Search by ID'
                style={{ color: '#000' }}
              />
            </Nav>
          </Navbar>
          <p />
          <Table className='table table-border' style={{ textAlign: 'center' }} bordered>
            <tr>
              <th scope='col'>ID</th>
              <th scope='col'>Name</th>
              <th scope='col'>Job Title</th>
              <th scope='col'>Gender</th>
              <th scope='col'>Address</th>
              <th scope='col'>Salary</th>
              <th scope='col'>Email</th>
              <th scope='col'>Action</th>
            </tr>
            {listOfUsers.map(use => (
              <tr key={use.id}>
                <td>{use.staff_id}</td>
                <td>{use.fname}</td>
                <td>{use.jobtitle}</td>
                <td>{use.gender}</td>
                <td>{use.address}</td>
                <td>{use.salary}</td>
                <td>{use.email}</td>
                <td>
                  <Button
                    className='bg-success mr-1'
                    onClick={() => this.UpdateModal(use)}
                  >
                    <SystemUpdateAltIcon />
                  </Button>
                  <Button
                    className='bg-danger ml-2'
                    onClick={() => {
                      this.props.Users(use.staff_id)
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                </td>
              </tr>
            ))}
          </Table>
          <Container style={{ marginLeft: '60em' }}>
            <UserPagination
              currentPage={currentPage}
              pageNumber={pageNumber}
              fetch={fetch.length}
              handlePage={this.handlePage}
            />
          </Container>
        </section>
      </div>
    )
  }
}

export default Register
