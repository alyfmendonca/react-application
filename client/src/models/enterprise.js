import { thunk, action } from 'easy-peasy'
import axios from 'axios'

const enterpriseModel = {
  createEnterprise: thunk(async (actions, payload) => {
    try {
      const { data } = await axios.post(`/api/enterprise/register/${payload.agency_id}`, payload)
      return data;
    }
    catch (e) {
      actions.setError(e.response)
      return e.response;
    }
  }),
  editEnterprise: thunk(async (actions, payload) => {
    try {
      const response = await axios.put(`/api/enterprise/edit/${payload.id}`, payload)
      return response;
    }
    catch (e) {
      actions.setError(e.response)
      return e.response;
    }
  }),
  getAllEnterpriseUsers: thunk(async (actions, payload) => {
    try {
      const enterprises = await axios.get('/api/enterprise/all')
      const users = await axios.get('/api/user/all')

      const fuse = (users.data)
        .filter(userFilter => userFilter.type === 'enterprise')
        .map(user => {
          const enterprise = (enterprises.data).filter(i => i.user_id === user._id)
          if (enterprise.length > 0) {
            return {
              ...enterprise[0],
              ...user,
              enterprise_id: enterprise[0]._id,
              enterprise_name: enterprise[0].enterprise_name
            }
          }
          return false
        })
      actions.setEnterprises(fuse)
    }
    catch (err) {
      console.log(err)
      const error = err.response.data && err.response.data.enterprises
      actions.setError(error)
    }
  }),
  getEnterpriseById: thunk(async (actions, payload) => {
    try {
      const enterprise = await axios.get(`/api/enterprise/${payload}`)

      actions.setEnterprises({
        id: enterprise.data._id,
        user_email: enterprise.data.email,
        aberje_associate: enterprise.data.aberje_associate,
        enterprise_name: enterprise.data.name,
        enterprise_fancy: enterprise.data.enterprise_fancy,
        cnpj: enterprise.data.cnpj,
        cep: enterprise.data.cep,
        address: enterprise.data.address,
        address_complement: enterprise.data.address,
        neighborhood: enterprise.data.neighborhood,
        qtd_projects: enterprise.data.qtd_projects,
        observation: enterprise.data.observation,
        enterprise_tel: enterprise.data.enterprise_tel
      })
    }
    catch (e) {
      actions.setError(e)
    }
  }),
  getAll: thunk(async (actions, payload) => {
    try {
      return await axios.get('/api/enterprise/all')
    }
    catch (err) {
      console.log(err)
      return err.response
    }
  }),
  getEnterprisesByAgencyId: thunk(async (actions, payload) => {
    try {
      const { data } = await axios.get(`/api/enterprise/all/${payload}`);
      actions.setEnterprises(data);
      return data;
    } catch (err) {
      console.log({ err })
      return err;
    }
  }),
  getAllEnterpriseWithProjects: thunk(async (actions, payload) => {
    try {
      const enterprises = await axios.get('/api/enterprise/all');
      const users = await axios.get('/api/user/all');
      const projects = await axios.get('/api/project/all');

      const fuse = (users.data)
        .filter(userFilter => userFilter.type === 'enterprise')
        .map(user => {
          const enterprise = (enterprises.data).filter(i => i.user_id === user._id)
          if (enterprise.length > 0) {
            return {
              ...enterprise[0],
              ...user,
              enterprise_id: enterprise[0]._id,
              enterprise_name: enterprise[0].enterprise_name
            }
          }
          return false
        });

      const enterprisesWithProjects = fuse.map(obj => {
        const arrayProjects = (projects.data).filter(project => project.enterprise_id === obj.user_id);

        for (const project of arrayProjects) {
          const sworn = (users.data).find(aux => aux._id === project.sworn_id);
          if(sworn) {
            project.sworn_id = sworn._id
          } else {
            project.sworn_id = " "
          }
        }

        return {
          ...obj,
          projects: arrayProjects
        }
      });

      actions.setEnterprisesWithProjects(enterprisesWithProjects);
    }
    catch (err) {
      console.log(err)
      const error = err.response.data && err.response.data.enterprises
      actions.setError(error)
    }
  }),
  enterprises: [],
  enterprisesWithProjects: [],
  setEnterprises: action((state, payload) => ({
    enterprises: payload
  })),
  setEnterprisesWithProjects: action((state, payload) => ({
    enterprisesWithProjects: payload
  })),
  error: {},
  setError: action((state, payload) => ({
    error: payload
  }))
}

export default enterpriseModel