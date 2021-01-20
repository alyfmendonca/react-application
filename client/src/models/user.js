import { thunk, action } from 'easy-peasy'
import axios from 'axios'

const userModel = {
  user: {},
  error: {},
  resetPassword: thunk(async (actions, payload) => {
    try {
      const response = await axios.post(`/api/user/reset/${payload.token}`, payload)
      return response;
    } catch (err) {
      const error = err.response.data
      return actions.setError({ ...error })
    }
  }),
  forgotPassword: thunk(async (actions, payload) => {
    try {
      const response = await axios.post('/api/user/forgot-password', payload);
      return response;
    } catch (err) {
      const error = err.response.data
      return actions.setError({ ...error })
    }
  }),
  getUser: thunk(async (actions, payload) => {
    try {
      const user = await axios.get('/api/user/current')
      const userTypeData = await axios.get(`/api/${payload}`)
      // Set current user profile
      actions.setUser({
        ...userTypeData.data,
        ...user.data,
        enterprise_id: userTypeData.data._id,
        agency_id: userTypeData.data._id
      })
    }
    catch (e) {
      throw e
    }
  }),
  getUserById: thunk(async (actions, payload) => {
    try {
      const user = await axios.get(`/api/user/${payload}`)
      // Set current user profile
      actions.setUser(user.data)
      return user.data
    }
    catch (e) {
      actions.setError(e)
    }
  }),
  editUser: thunk(async (actions, payload) => {
    try {
      return axios.put(`/api/user/edit/${payload.type}/${payload.id}`, payload)
    }
    catch (e) {
      actions.setError(e)
    }
  }),
  getAllUsers: thunk(async (actions) => {
    try {
      return await axios.get('/api/user/all')
    }
    catch (err) {
      const error = err.response.data && err.response.data.users
      actions.setError(error)
    }
  }),
  setUser: action((state, payload) => ({
    user: { ...payload }
  })),
  setError: action((state, payload) => ({
    error: payload
  }))
}

export default userModel