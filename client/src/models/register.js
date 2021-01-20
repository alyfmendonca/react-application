import { thunk, action } from 'easy-peasy'
import axios from 'axios'
import history from '../history'

const registerModel = {
  registerEnterprise: thunk(async (actions, payload) => {
    try {
      const response = await axios.post('/api/enterprise/register', payload)
      return response;
    }
    catch (err) {
      const error = err.response.data
      actions.setErrors({ ...error });
      return error;
    }
  }),

  registerAgency: thunk(async (actions, payload) => {
    try {
      const response = await axios.post('/api/agency/register', payload)
      return response;
    }
    catch (err) {
      const error = err.response.data
      actions.setErrors({ ...error });
      return error;
    }
  }),


  registerUser: thunk(async (actions, payload) => {
    try {
      await axios.post('/api/user/register', payload)
      return history.push('/')
    }
    catch (err) {
      console.log(err)
      const error = {
        user: err.response.data && err.response.data.register
      }
      return actions.setErrors(error)
    }
  }),


  error: {},
  setErrors: action((state, payload) => ({
    error: payload
  }))
}


export default registerModel