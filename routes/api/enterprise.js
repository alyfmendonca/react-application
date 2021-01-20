const express = require('express')
const router = express.Router()
const passport = require('passport')

// Load Enterprise model
const Enterprise = require('../../models/Enterprise')

// @route   POST api/enterprise/register
// @desc    Register Enterprise
// @access  Public
router.post('/register', passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const errors = {};

    if (!req.user) {
      errors.user = 'Usuário não encontrado para a criação da empresa'
      return res.status(400).json(errors)
    }

    // Create new enterprise
    const newEnterprise = new Enterprise({
      user_id: req.user.id,
      user_email: req.user.email,
      aberje_associate: req.body.aberje_associate,
      enterprise_name: req.body.enterprise_name,
      enterprise_fancy: req.body.enterprise_fancy,
      cnpj: req.body.cnpj,
      cep: req.body.cep,
      address: req.body.address,
      address_complement: req.body.address_complement,
      address_number: req.body.address_number,
      neighborhood: req.body.neighborhood,
      city: req.body.city,
      qtd_projects: req.body.qtd_projects,
      observation: req.body.observation,
      enterprise_tel: req.body.enterprise_tel
    })

    newEnterprise
      .save()
      .then(enterprise => res.json(enterprise))
      .catch(err => console.log(err))
  })

// @route   GET api/enterprise/
// @desc    Get enterprise by id
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {}
  Enterprise.findOne({ user_id: req.user.id })
    .then(enterprise => {
      if (!enterprise) {
        errors.noenterprise = 'Essa empresa não existe'
        res.status(404).json(errors)
      }
      res.json(enterprise)
    })
    .catch(() => res.status(404).json({ project: 'Não existe um usuário com esse identificador' }))
})

router.get('/all', (req, res) => {
  const errors = {}
  Enterprise.find()
    .sort({ created_at: 1 })
    .then(enterprises => {
      if (!enterprises) {
        errors.enterprises = 'Não existem empresas cadastradas ainda'
        return res.status(404).json(errors)
      }
      res.json(enterprises)
    })
    .catch(() => res.status(404).json({
      enterprises: 'Não existem empresas cadastradas ainda'
    }))
})

router.get('/:id', (req, res) => {
  const errors = {}
  Enterprise.findOne({ _id: req.params.id })
    .then(enterprise => {
      if (!enterprise) {
        errors.noEnterprise = `Não foi encontrada essa empresa`
        return res.status(404).json(errors)
      }
      res.json(enterprise)
    })
    .catch(() => res.status(404).json({
      enterprises: 'Não existem  cadastradas ainda'
    }))
})

router.put('/edit/:id/', (req, res) => {
  Enterprise.findOneAndUpdate({ _id: req.params.id },
    {
      $set: {
        aberje_associate: req.body.aberje_associate,
        enterprise_name: req.body.enterprise_name,
        enterprise_fancy: req.body.enterprise_fancy,
        cnpj: req.body.cnpj,
        qtd_projects: req.body.qtd_projects,
        observation: req.body.observation,
        enterprise_tel: req.body.enterprise_tel,
        address_number: req.body.address_number,
        address_complement: req.body.address_complement,
      }
    },
    { new: true })
    .then(enterprise => res.json({ message: `Empresa alterada com sucesso` }))
    .catch((errors) => {
      errors.editError = 'Um erro ocorreu ao editar a Empresa'
      return res.status(404).json(errors)
    })
})

// @route   POST api/enterprise/:agency_id/
// @desc    Register Enterprise
// @access  Public
router.post('/register/:agency_id',
  async (req, res) => {
    const errors = {};

    if (!req.body.agency_id) {
      errors.agency = 'Agência não encontrada para a criação da empresa'
      return res.status(400).json(errors)
    }

    const { agency_id, enterprise_name } = req.body;
    
    // Create new enterprise for agency
    const newEnterprise = await new Enterprise({
      agency_id,
      enterprise_name,
    })

    newEnterprise
      .save({ validateBeforeSave: false })
      .then(enterprise => {
        return res.json(enterprise);
      })
      .catch(err => console.log(err))
  })


// @route   GET api/enterprise/:agency_id
// @desc    Get enterprise by agency id
// @access  Private
router.get('/all/:agency_id', (req, res) => {
  const errors = {}
  Enterprise.find({ agency_id: req.params.agency_id })
    .then(enterprise => {
      if (!enterprise) {
        errors.noEnterprise = `Não existem empresas agenciadas por você`
        return res.status(404).json(errors)
      }
      res.status(200).json(enterprise)
    })
    .catch(() => res.status(404).json({
      enterprises: 'Não existem empresas cadastradas ainda'
    }))
})

module.exports = router
