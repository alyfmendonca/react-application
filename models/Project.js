const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const ProjectSchema = new Schema({

  enterprise_id: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Enterprise'
  },
  title: {
    type: String,
    required: true
  },

  total_period: {
    type: String,
    required: true
  },
  project_about: {
    type: String,
  },
  category: {
    type: String,
    required: false
  },
  category_about: {
    type: String,
  },
  project_region: {
    type: String,
  },
  region_choice: {
    type: String,
  },
  agree: {
    type: Boolean,
    required: true,
  },
  project_creators: [{
    agency_name: {
      type: String,
    },
    agency_fancy: {
      type: String
    },
  }],
  others_contacts:
    [{
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      tel: {
        type: String,
      },
      cel: {
        type: String,
      },
    }],
  attachment: [{
    name: {
      type: String,
    },
    key: {
      type: String
    },
    size: {
      type: Number,
    },
    url: {
      type: String,
    },
    type: {
      type: String,
    },
    signature: {
      type: Boolean,
      default: false,
    },
    authorizationLetter: {
      type: Boolean,
      default: false,
    }
  }],
  draft: {
    type: Boolean,
    default: true
  },
  complet_project: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  paid: {
    type: Boolean,
    default: false
  },
  payment_identifier: {
    type: String
  },
  sworn_id: {
    required: false,
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  first_evaluation: {
    status: {
      type: String,
      enum: [
        'DRAFT',
        'CONCLUDED'
      ]
    },
    fits_the_prize: {
      type: Boolean
    },
    realized_in_period: {
      type: Boolean
    },
    justify_no_realized_in_period: {
      type: String
    },
    registered_correct_region: {
      type: Boolean
    },
    option_correct_region: {
      type: String,
      uppercase: true,
      enum: [
        'HEAD_OFFICE_REGION',
        'REGION_RELEVANT_ACTIONS'
      ]
    },
    ideal_region: {
      type: String
    },
    correct_category: {
      type: Boolean
    },
    justify_no_correct_category: {
      type: String
    },
    has_equal_projects: {
      type: Boolean
    },
    id_project_equal: {
      type: String
    },
    final_obs: {
      type: String
    },
    context: {
      type: String,
      uppercase: true,
      enum: [
        'YES',
        'NO',
        'NOT_APPLICABLE'
      ]
    },
    strategy: {
      type: String,
      uppercase: true,
      enum: [
        'YES',
        'NO',
        'NOT_APPLICABLE'
      ]
    },
    communication: {
      type: String,
      uppercase: true,
      enum: [
        'YES',
        'NO',
        'NOT_APPLICABLE'
      ]
    },
    evidence_of_results: {
      type: String,
      uppercase: true,
      enum: [
        'YES',
        'NO',
        'NOT_APPLICABLE'
      ]
    },
    investment: {
      type: String,
      uppercase: true,
      enum: [
        'YES',
        'NO',
        'NOT_APPLICABLE'
      ]
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    updated_at: {
      type: Date
    }
  },
  sworn_premiatory: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  sworn_premiatory_end: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  second_evaluation: [{
    correct_category: {
      type: Boolean
    },
    comments: {
      type: String
    },
    nota: {
      type: String
    },
    justify_no_correct_category: {
      type: String
    },
    brand_value: {
      type: String,
      uppercase: true,
      enum: [
        'YES',
        'NO',
        'NOT_APPLICABLE'
      ]
    },
    case_quality: {
      type: String,
      uppercase: true,
      enum: [
        'YES',
        'NO',
        'NOT_APPLICABLE'
      ]
    },
    connection_between_strategy: {
      type: String,
      uppercase: true,
      enum: [
        'YES',
        'NO',
        'NOT_APPLICABLE'
      ]
    },
    strategy_to_context: {
      type: String,
      uppercase: true,
      enum: [
        'YES',
        'NO',
        'NOT_APPLICABLE'
      ]
    },
    reasonability: {
      type: String,
      uppercase: true,
      enum: [
        'YES',
        'NO',
        'NOT_APPLICABLE'
      ]
    },
    criativity_and_innovation: {
      type: String,
      uppercase: true,
      enum: [
        'YES',
        'NO',
        'NOT_APPLICABLE'
      ]
    },
    media_quality: {
      type: String,
      uppercase: true,
      enum: [
        'YES',
        'NO',
        'NOT_APPLICABLE'
      ]
    },
    status: {
      type: String,
      enum: [
        'DRAFT',
        'CONCLUDED'
      ]
    },
    results_obtained: {
      type: String,
      uppercase: true,
      enum: [
        'YES',
        'NO',
        'NOT_APPLICABLE'
      ]
    },
    earnings_engagement: {
      type: String,
      uppercase: true,
      enum: [
        'YES',
        'NO',
        'NOT_APPLICABLE'
      ]
    },
    final_obs: {
      type: String
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    updated_at: {
      type: Date
    }
  }],
  three_evaluation: [{
    correct_category: {
      type: Boolean
    },
    comments: {
      type: String
    },
    nota: {
      type: String
    },
    notaApresentacao: {
      type: String
    },
    justify_no_correct_category: {
      type: String
    },
    brand_value: {
      type: String,
      uppercase: true,
      enum: [
        'YES',
        'NO',
        'NOT_APPLICABLE'
      ]
    },
    case_quality: {
      type: String,
      uppercase: true,
      enum: [
        'YES',
        'NO',
        'NOT_APPLICABLE'
      ]
    },
    connection_between_strategy: {
      type: String,
      uppercase: true,
      enum: [
        'YES',
        'NO',
        'NOT_APPLICABLE'
      ]
    },
    strategy_to_context: {
      type: String,
      uppercase: true,
      enum: [
        'YES',
        'NO',
        'NOT_APPLICABLE'
      ]
    },
    reasonability: {
      type: String,
      uppercase: true,
      enum: [
        'YES',
        'NO',
        'NOT_APPLICABLE'
      ]
    },
    criativity_and_innovation: {
      type: String,
      uppercase: true,
      enum: [
        'YES',
        'NO',
        'NOT_APPLICABLE'
      ]
    },
    media_quality: {
      type: String,
      uppercase: true,
      enum: [
        'YES',
        'NO',
        'NOT_APPLICABLE'
      ]
    },
    status: {
      type: String,
      enum: [
        'DRAFT',
        'CONCLUDED'
      ]
    },
    results_obtained: {
      type: String,
      uppercase: true,
      enum: [
        'YES',
        'NO',
        'NOT_APPLICABLE'
      ]
    },
    earnings_engagement: {
      type: String,
      uppercase: true,
      enum: [
        'YES',
        'NO',
        'NOT_APPLICABLE'
      ]
    },
    final_obs: {
      type: String
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    updated_at: {
      type: Date
    }
  }]
})

const Project = mongoose.model('Project', ProjectSchema)

module.exports = Project
