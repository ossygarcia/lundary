import axios from 'axios'

export const register = users => {
  return axios
    .post('http://localhost:8000/user/register', {
      fname: users.fname,
      lname: users.lname,
      jobtitle: users.jobtitle,
      gender: users.gender,
      address: users.address,
      age: users.age,
      salary: users.salary,
      username: users.username,
      email: users.email,
      password: users.password,
      role: users.role
    })
    .then(response => {
      if (response) {
        alert('Account Created Successfully')
      }
    })
    .catch(err => {
      return alert('Email Already Exist')
    })
}

export const Transaction = userId => {
  return axios
    .post('http://localhost:8000/transactions', {
      staffId: userId.staffId,
      item: userId.item,
      qty: userId.qty,
      price: userId.price
    })
    .then(response => {
      if (response) {
        alert('Supply Received')
      }
    })
}
export const deleteTrans = id => {
  return
}
