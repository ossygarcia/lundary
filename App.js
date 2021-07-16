import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Register from './components/Auth/register'
import Home from './components/Dashboard/home'
import Laundry from './components/Laundry/laundry'
import Supply from './components/Supply/supply'
import './App.css'
import Login from './components/Auth/login'
import Main from './components/Utils/main'
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/dashboard/home' render={() => <Main/>} />
        <Route path='/dashboard/home' render={() => <Home />} />
        <Route path='/dashboard/register' render={() => <Register />} />
        <Route path='/dashboard/laundry' render={() => <Laundry />} />
        <Route path='/dashboard/supply' render={() => <Supply />} />
      </Switch>
    </Router>
  )
}
export default App
