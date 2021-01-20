const express = require('express')
const router = express.Router()
const passport = require('passport')


// Load Agency model
const Agency = require('../../models/Agency')
const verifyCnpj = require('../../helpers/verifyCnpj')
const Enterprise = require('../../models/Enterprise')

// @route   POST api/agency/register
// @desc    Register Agency
// @access  Public
router.post('/register', passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const errors = {};

    if (!req.user) {
      errors.message = 'Usuário não encontrado para a criação da agência'
      return res.status(400).json(errors)
    }

    const { clients } = req.body;
    const newAgency = new Agency({
      user_id: req.user.id,
      user_email: req.user.email,
      aberje_associate: req.body.aberje_associate,
      agency_name: req.body.agency_name,
      agency_fancy: req.body.agency_fancy,
      cnpj: req.body.cnpj,
      cep: req.body.cep,
      address: req.body.address,
      address_complement: req.body.address_complement,
      address_number: req.body.address_number,
      neighborhood: req.body.neighborhood,
      city: req.body.city,
      agree_terms: req.body.agree_terms,
      clients,
      qtd_projects: req.body.qtd_projects,
      observation: req.body.observation,
      agency_tel: req.body.agency_tel
    })

    newAgency
      .save()
      .then(async (agency) => {
        clients.map((clientName) => {
          const newEnterprise = new Enterprise({
            agency_id: req.user.id,
            enterprise_name: clientName,
          });
          newEnterprise
            .save({ validateBeforeSave: false })
            .then((enterprise) => console.log(enterprise))
            .catch((err) => console.log(err));
        });
        return res.json(agency)
      })
      .catch(err => console.log(err))
  })

// @route   GET api/agency/
// @desc    Get agency by id
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {}
  Agency.findOne({ user_id: req.user.id })
    .then(agency => {
      if (!agency) {
        errors.noagency = 'Essa agência não existe'
        res.status(404).json(errors)
      }
      res.status(200).json(agency)
    })
    .catch(() => res.status(404).json({ projectAgency: 'Não existe um usuário com esse identificador' }))
})

router.get('/all', (req, res) => {
  const errors = {}
  Agency.find()
    .sort({ created_at: 1 })
    .then(agencies => {
      if (!agencies) {
        errors.agencies = 'Não existem agências cadastradas ainda'
        return res.status(404).json(errors)
      }
      res.json(agencies)
    })
    .catch(() => res.status(404).json({
      agencies: 'Não existem empresas cadastradas ainda'
    }))
})

router.get('/:id', (req, res) => {
  const errors = {}
  Agency.findOne({ _id: req.params.id })
    .then(agency => {
      if (!agency) {
        errors.noAgency = `Não foram encontradas agências com o id ${req.params.id}`
        return res.status(404).json(errors)
      }
      res.json(agency)
    })
    .catch(() => res.status(404).json({
      agencies: 'Não existem projetos cadastrados ainda'
    }))
})

router.put('/edit/:id/', (req, res) => {

  Agency.findOneAndUpdate({ _id: req.params.id },
    {
      $set: {
        ...(req.body.email && { email: req.body.email }),
        aberje_associate: req.body.aberje_associate,
        agency_name: req.body.agency_name,
        agency_fancy: req.body.agency_fancy,
        cnpj: req.body.cnpj,
        cep: req.body.cep,
        address: req.body.address,
        addres_complement: req.body.addres_complement,
        neighborhood: req.body.neighborhood,
        city: req.body.city,
        qtd_projects: req.body.qtd_projects,
        observation: req.body.observation,
        agency_tel: req.body.agency_tel
      }
    },
    { new: true })
    .then(agency => res.json({ message: `Agência alterada com sucesso` }))
    .catch((errors) => {
      console.log({ errors })
      errors.editError = 'Um erro ocorreu ao editar a Agência'
      return res.status(404).json(errors)
    })
})
module.exports = router
