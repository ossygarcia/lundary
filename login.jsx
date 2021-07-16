import React, { Component } from 'react'
import { Form, FormGroup, Input, Button, Alert } from 'reactstrap'
import style from '././login.module.css'
import './login.module.css'
import Axios from 'axios'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      loggedIn: false,
      error: '',
      username: ''
    }
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleSubmit = e => {
    e.preventDefault()
    Axios.post('http://localhost:8000/user/login', {
      email: this.state.email,
      password: this.state.password
    }).then(response => {
      if (!response.data.auth) {
        this.setState({ loggedIn: false })
      } else {
        localStorage.setItem('token', response.data.token)
        this.setState({ loggedIn: true })
      }
    })
  }
  authentication = () => {
    Axios.get('http://localhost:8000/auth/token', {
      headers: { 'x-access-token': localStorage.getItem('token') }
    }).then(response => {
      if (response.data.token) {
        alert('Original User')
      } else {
        this.props.history.push('/dashboard/home')
      }
    })
  }
  render () {
    return (
      <div className={style.container}>
        <div className={style.main}>
          <section className={style.formpanel}>
            <Form className={style.form} onSubmit={this.handleSubmit}>
              <FormGroup>
                <Input
                  type='email'
                  placeholder='Email'
                  name='email'
                  value={this.state.email}
                  onChange={this.handleChange}
                  required='Email is required'
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type='password'
                  placeholder='Password'
                  name='password'
                  value={this.state.password}
                  onChange={this.handleChange}
                  required='Password is required'
                />
              </FormGroup>
              <FormGroup>
                <Button className='btn-block bg-primary'>Login</Button>
              </FormGroup>

              {this.state.loggedIn && (
                <Button onClick={this.authentication}>Authenticated</Button>
              )}
            </Form>
            {this.state.error}
          </section>
          <section className={style.text}>
            <h4>Welcome !</h4>
            <p>Grace Laundry gives you the best services you desire</p>
          </section>
        </div>
      </div>
    )
  }
}

export default Login
