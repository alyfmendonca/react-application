import { thunk, action } from 'easy-peasy'
import axios from 'axios'

const agencyModel = {
  editAgency: thunk(async (actions, payload) => {
    try {
      const response = await axios.put(`/api/agency/edit/${payload.id}`, payload)
      return response;
    }
    catch (e) {
      actions.setError(e)
    }
  }),
  getAllAgencyUsers: thunk(async (actions, payload) => {
    try {
      const agencies = await axios.get('/api/agency/all')
      const users = await axios.get('/api/user/all')

      const fuse = (users.data)
        .filter(userFilter => userFilter.type === 'agency')
        .map(user => {
          const agency = (agencies.data).filter(i => i.user_id === user._id)
          if (agency.length > 0) {
            return {
              ...agency[0],
              ...user,
              agency_id: agency[0]._id,
              agency_name: agency[0].agency_name
            }
          }
          return false
        })
      actions.setAgencies(fuse)
    }
    catch (err) {
      console.log(err)
      const error = err.response.data && err.response.data.agencies
      actions.setError(error)
    }
  }),
  getAgencyById: thunk(async (actions, payload) => {
    try {
      const agency = await axios.get(`/api/agency/${payload}`)

      actions.setAgencies({
        id: agency.data._id,
        user_email: agency.data.email,
        aberje_associate: agency.data.aberje_associate,
        agency_name: agency.data.agency_name,
        agency_fancy: agency.data.agency_fancy,
        cnpj: agency.data.cnpj,
        cep: agency.data.cep,
        address: agency.data.address,
        addres_complement: agency.data.addres_complement,
        neighborhood: agency.data.neighborhood,
        city: agency.data.city,
        qtd_projects: agency.data.qtd_projects,
        observation: agency.data.observation,
        agency_tel: agency.data.agency_tel
      })
    }
    catch (e) {
      actions.setError(e)
    }
  }),
  getAll: thunk(async (actions, payload) => {
    try {
      return await axios.get('/api/agency/all')
    }
    catch (err) {
      console.log(err)
      return err.response
    }
  }),
  getAllAgencyWithProjects: thunk(async (actions, payload) => {
    try {
      const agencies = await axios.get('/api/agency/all');
      const enterprises = await axios.get('/api/enterprise/all')
      const users = await axios.get('/api/user/all')
      const projects = await axios.get('/api/project/all')

      const agencyWithProjects = users.data.filter(userFilter => userFilter.type === 'agency')
        .map(user => {
          const agency = (agencies.data).filter(i => i.user_id === user._id)[0]
          return {
            agency,
            enterprises: (enterprises.data).filter(i => i.agency_id === user._id).map(enterprise => {
              const listProject = (projects.data).filter(project => project.enterprise_id === enterprise._id);

              for (const project of listProject) {
                const sworn = (users.data).find(aux => aux._id === project.sworn_id);
                if(sworn) {
                  project.sworn_id = sworn._id
                } else {
                  project.sworn_id = " "
                }
              }

              return {
                ...enterprise,
                projectDraft: listProject.some(obj => obj.draft === true),
                paymentPending: listProject.some(obj => obj.paid === false),
                projects: listProject
              }
            }),
            ...user,
          }
        })

      actions.setAgencyWithProjects(agencyWithProjects)
    }
    catch (err) {
      console.log(err)
      return err.response
    }
  }),
  agencies: [],
  agencyWithProjects: [],
  setAgencies: action((state, payload) => ({
    agencies: payload
  })),
  setAgencyWithProjects: action((state, payload) => ({
    agencyWithProjects: payload
  })),
  error: {},
  setError: action((state, payload) => ({
    error: payload
  }))
}

export default agencyModel