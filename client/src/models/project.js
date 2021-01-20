import { thunk, action } from 'easy-peasy'
import axios from 'axios'

const projectModel = {
  registerProject: thunk(async (actions, payload) => {
    try {
      const response = await axios.post('/api/project/register', payload)
      return response;
    }
    catch (err) {
      const error = err.response.data && err.response.data.project
      actions.setError(error)
    }
  }),
  getAllProjects: thunk(async (actions, payload) => {
    try {
      // actions.setProjects([])
      const agencies = await axios.get('/api/agency/all');
      const enterprises = await axios.get('/api/enterprise/all');
      const { data } = await axios.get(`/api/project/all/${payload}`)

      const enterprisesProjects = data.map(obj => {
        let enterprise = (enterprises.data).filter(i => obj.enterprise_id === i.user_id)[0]
        let agency = null

        if (enterprise === undefined)
          enterprise = (enterprises.data).filter(i => obj.enterprise_id === i._id)[0]

        if ("agency_id" in enterprise) 
          agency = (agencies.data).filter(i => i.user_id === enterprise.agency_id)[0]

        return {
          ...obj,
          enterprise,
          agency
        }

      });

      actions.setProjects(enterprisesProjects)
    }
    catch (err) {
      console.log(err)
    }
  }),
  getProject: thunk(async (actions, payload) => {
    try {
      const response = await axios.get(`/api/project/${payload}`)
      return response;
    }
    catch (err) {
      const error = err.response.data
      actions.setError({ ...error })
    }
  }),
  editProject: thunk(async (actions, payload) => {
    try {
      const response = await axios.put(`/api/project/edit/${payload.id}`, payload);
      return response;
    }
    catch (err) {
      const error = err.response.data && err.response.data.project
      actions.setError(error)
    }
  }),
  editPaymentProject: thunk(async (actions, payload) => {
    try {
      const response = await axios.patch(`/api/project/edit/${payload.id}/paid`, payload);
      return response;
    }
    catch (err) {
      const error = err.response.data && err.response.data.project
      actions.setError(error)
    }
  }),
  defineSwornToProject: thunk(async (actions, payload) => {
    try {
      const response = await axios.patch(`/api/project/edit/${payload.id}/sworn`, payload);
      return response;
    }
    catch (err) {
      const error = err.response.data && err.response.data.project
      actions.setError(error)
    }
  }),
  defineSwornPremiatoryToProject: thunk(async (actions, payload) => {
    try {
      const response = await axios.patch(`/api/project/edit/${payload.id}/swornPremiatory`, payload);
      return response;
    }
    catch (err) {
      const error = err.response.data && err.response.data.project
      actions.setError(error)
    }
  }),
  defineSwornPremiatoryEndToProject: thunk(async (actions, payload) => {
    try {
      const response = await axios.patch(`/api/project/edit/${payload.id}/swornPremiatoryEnd`, payload);
      return response;
    }
    catch (err) {
      const error = err.response.data && err.response.data.project
      actions.setError(error)
    }
  }),
  setFirstEvaluationToProject: thunk(async (actions, payload) => {
    try {
      const response = await axios.patch(`/api/project/edit/${payload.id}/firstEvaluation`, payload);
      return response;
    }
    catch (err) {
      const error = err.response.data && err.response.data.project
      actions.setError(error)
    }
  }),
  setSecondEvaluationProject: thunk(async (actions, payload) => {
    try {
      const response = await axios.patch(`/api/project/edit/${payload.id}/secondyEvaluation`, payload);
      return response;
    }
    catch (err) {
      const error = err.response.data && err.response.data.project
      actions.setError(error)
    }
  }),
  setThreeEvaluationProject: thunk(async (actions, payload) => {
    try {
      const response = await axios.patch(`/api/project/edit/${payload.id}/threeEvaluation`, payload);
      return response;
    }
    catch (err) {
      const error = err.response.data && err.response.data.project
      actions.setError(error)
    }
  }),
  project: {},
  setProject: action((state, payload) => ({
    project: payload
  })),
  allProjects: [],
  setProjects: action((state, payload) => ({
    allProjects: payload
  })),
  error: {},
  setError: action((state, payload) => ({
    error: payload
  }))
}

export default projectModel