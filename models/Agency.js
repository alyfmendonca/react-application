const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const AgencySchema = new Schema({
  user_id: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  user_email: {
    required: true,
    type: Schema.Types.String,
    ref: 'User'
  },
  aberje_associate: {
    type: Boolean,
    required: true
  },
  agency_name: {
    type: String,
    required: true
  },
  agency_fancy: {
    type: String,
    required: true
  },
  agency_tel: {
    type: String,
    required: true
  },
  cnpj: {
    type: String,
    required: true
  },
  cep: {
    type: String,
    required: true
  },
  neighborhood: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  address_complement: {
    type: String,
  },
  address_number: {
    type: String,
  },
  qtd_projects: {
    type: Array,
    required: true
  },
  clients: {
    type: Array,
    required: true
  },
  observation: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now
  },
})

const Agency = mongoose.model('Agency', AgencySchema)

module.exports = Agency
