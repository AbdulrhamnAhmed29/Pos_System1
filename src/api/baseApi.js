import api from './axiosConfig'

// global crud functions for all resources, using the configured axios instance 
const BaseApi = {
  getAll: async (resource) => {
    const { data } = await api.get(resource)
    return data
  },

  getById: async (resource, id) => {
    const { data } = await api.get(`${resource}/${id}`)
    return data
  },

  create: async (resource, payload) => {
    const { data } = await api.post(resource, payload); 
    return data
  },

  update: async (resource, id, payload) => {
    const { data } = await api.put(`${resource}/${id}`, payload);
    return data
  },

  remove: async (resource, id) => {
    const { data } = await api.delete(`${resource}/${id}`)
    return data
  },

  bulkUpdate: async (resource, payload) => {
    const { data } = await api.put(resource, payload)
    return data
  },

  upload: async (resource, formData) => {
    const { data } = await api.post(resource, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return data
  },
}

export default BaseApi
