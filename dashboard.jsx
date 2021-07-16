import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Content, Drawer, Header, Layout, Navigation } from 'react-mdl'
import { Route, Switch, Link } from 'react-router-dom'
import { Input } from 'reactstrap'
import Register from '../Auth/register'
import Laundry from '../Laundry/laundry'
import Supply from '../Supply/supply'
import Home from './home'

const Dashboard = () => {
  const [data, setData] = useState([])
  const [laundry, setLaundry] = useState([])
  const [supply, setSupply] = useState([])
  const [s, setSearch] = useState('')

  useEffect(() => {
    Fetched()
    Bill()
    MySupply()
  }, [])
  const Fetched = () => {
    fetch('http://localhost:8000/customers/register')
      .then(res => res.json())
      .then(json => setData(json))
  }
  const deleteUsers = staff_id => {
    Axios.delete(`http://localhost:8000/register/${staff_id}`)
    if (staff_id) {
      alert('Delete')
    }
  }
  const deleteBills = bill_id => {
    Axios.delete(`http://localhost:8000/customers/bills/${bill_id}`)
    if (bill_id) {
      alert('Bill Deleted !')
    }
  }
  const Bill = () => {
    fetch('http://localhost:8000/bills')
      .then(res => res.json())
      .then(json => setLaundry(json))
  }
  const MySupply = () => {
    fetch('http://localhost:8000/transactions')
      .then(res => res.json())
      .then(json => setSupply(json))
  }
  const deleteTransaction = transaction_id => {
    Axios.delete(`http://localhost:8000/transactions/${transaction_id}`)
    if (transaction_id) {
      alert('Deleted')
    }
  }

  function searching (rows) {
    return rows.filter(row => row.staff_id.toLowerCase().indexOf(s) > -1)
  }
  function searchSupply (rows) {
    return rows.filter(row => row.transaction_id.toLowerCase().indexOf(s) > -1)
  }

  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      <Layout fixedHeader fixedDrawer>
        <Header
          title={
            <span>
              <span style={{ color: '#ddd' }}>Laundry/ </span>
              <strong>System</strong>
            </span>
          }
        >
          <Navigation>           
            <Link to='#'>Link</Link>
            <Link to='#'>Link</Link>
            <Link to='#'>Link</Link>
          </Navigation>
        </Header>
        <Drawer title='Administrator' style={{ backgroundColor: '#0c0c3b' }}>
          <Navigation>
            <Link
              to='/dashboard/home'
              style={{ textDecoration: 'none', color: '#dff' }}
            >
              Dashboard
            </Link>
            <Link
              to='/dashboard/register'
              style={{ textDecoration: 'none', color: '#dfffff' }}
            >
              Create Account
            </Link>
            <Link
              to='/dashboard/laundry'
              style={{ textDecoration: 'none', color: '#dfffff' }}
            >
              Laundry List
            </Link>
            <Link
              to='/dashboard/supply'
              style={{ textDecoration: 'none', color: '#dfffff' }}
            >
              Supply
            </Link>
            <Link to='#' style={{ textDecoration: 'none', color: '#dfffff' }}>
              Inventory
            </Link>
            <Link to='#' style={{ textDecoration: 'none', color: '#dfffff' }}>
              Report
            </Link>
          </Navigation>
        </Drawer>
        <Content>
          <Switch>
            <Route
              path='/dashboard/home'
              render={() => <Home data={data} laundry={laundry} />}
            />
            <Route
              path='/dashboard/register'
              render={() => (
                <Register fetch={searching(data)} Users={deleteUsers} />
              )}
            />
            <Route
              path='/dashboard/laundry'
              render={() => (
                <Laundry bill={laundry} deleteBills={deleteBills} />
              )}
            />
            <Route
              path='/dashboard/supply'
              render={() => (
                <Supply
                  supply={searchSupply(supply)}
                  deletes={deleteTransaction}
                />
              )}
            />
          </Switch>
        </Content>
      </Layout>
    </div>
  )
}

export default Dashboard
