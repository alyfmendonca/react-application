const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const EnterpriseSchema = new Schema({

  agency_id: {
    type: Schema.Types.ObjectId,
    ref: 'Agency'
  },
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
  enterprise_name: {
    type: String,
    required: true
  },
  enterprise_fancy: {
    type: String,
    required: true
  },
  enterprise_tel: {
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
  observation: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Enterprise = mongoose.model('Enterprise', EnterpriseSchema)


module.exports = Enterprise
