const express = require('express')
const router = express.Router()
const passport = require('passport')

const Project = require('../../models/Project')

// @route   POST api/project/register
// @desc    Create new project
// @access  Private
router.post('/register', passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const errors = {};
    const dataProject = {
      title,
      total_period,
      project_about,
      category,
      category_about,
      project_region,
      region_choice,
      agree,
      others_contacts,
      draft,
      complet_project,
      enterpriseId,
    } = req.body;

    // Create new project
    const newProject = new Project({
      enterprise_id: enterpriseId,
      ...dataProject
    })

    newProject
      .save()
      .then(project => res.json(project))
      .catch(err => console.log(err))

  })


// @route   PUT api/project/edit/id
// @desc    Edit a project
// @access  Private

router.put('/edit/:id/', (req, res) => {
  const dataProject = {
    title,
    total_period,
    project_about,
    category,
    category_about,
    project_region,
    region_choice,
    agree,
    others_contacts,
    draft,
    complet_project,
  } = req.body;

  Project.findOneAndUpdate({ _id: req.params.id },
    {
      $set: {
        ...dataProject
      }
    },
    { new: true })
    .then(project => res.json({ message: `Projeto alterado com sucesso!` }))
    .catch((errors) => {
      errors.editError = 'Um erro ocorreu ao editar a Empresa'
      return res.status(404).json(errors)
    })
})

// @route   GET api/project/all
// @desc    Get projects
// @access  Public

router.get('/all', (req, res) => {
  Project.find()
    .sort({ createdAt: -1 })
    .then(projects => {
      if (!projects) {
        errors.noprojects = 'Não existem projetos cadastrados ainda'
        return res.status(404).json(errors)
      }
      res.json(projects)
    })
    .catch(() => res.status(404).json({
      projects: 'Não existem projetos cadastrados ainda'
    }))
})

// @route   GET api/project/all/:user_id/
// @desc    Get all specific users projects
// @access  Public
router.get('/all/:enterprise_id/', (req, res) => {
  Project
    .find({ enterprise_id: req.params.enterprise_id })
    .sort({ createdAt: -1 })
    .then(projects => {
      if (!projects) {
        return res.status(404).json({
          projects: 'Nenhum projeto publicado'
        })
      }
      res.json(projects)
    })
    .catch(() => res.status(404).json({
      projects: 'Nenhum projeto publicado'
    }))
})

// @route   GET api/project/register
// @desc    Return all company projects
// @access  Private

router.get('/register', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const projects = await Project.find().populate('user');

    return res.status(200).json(projects);
  }
  catch (err) {
    res.status(400).send({
      error: ' Erro ao carregar os projetos',
    });
  }
});

// @route   GET api/project/:projectId
// @desc    Return one user project
// @access  Private
router.get('/:projectId', passport.authenticate('jwt', { session: false }),
  async (req, res) => {

    try {
      const project = await Project.findById(req.params.projectId).populate('user');

      return res.send({
        project
      });
    }
    catch (err) {
      res.status(400).send({
        error: ' Erro ao carregar os projetos',
      });
    }
  });


// @route   PATCH api/project/edit/id/paid
// @desc    Edit paid a project
// @access  Private

router.patch('/edit/:id/paid', passport.authenticate('jwt', { session: false }), (req, res) => {
  const payment = {
    paid,
    payment_identifier
  } = req.body;

  Project.findOneAndUpdate({ _id: req.params.id },
    {
      $set: {
        ...payment
      }
    },
    { new: true })
    .then(project => res.json({ message: `Projeto alterado com sucesso!` }))
    .catch((errors) => {
      errors.editError = 'Um erro ocorreu ao editar o projeto'
      return res.status(404).json(errors)
    })
})


// @route   PATCH api/project/edit/id/sworn
// @desc    Define sworn a project
// @access  Private

router.patch('/edit/:id/sworn', passport.authenticate('jwt', { session: false }), (req, res) => {
  const sworn = {
    sworn_id
  } = req.body;

  Project.findOneAndUpdate({ _id: req.params.id },
    {
      $set: {
        ...sworn
      }
    },
    { new: true })
    .then(project => res.json({ message: `Jurado definido para o projeto` }))
    .catch((errors) => {
      errors.editError = 'Não foi possível definir o jurado para o projeto'
      return res.status(404).json(errors)
    })
})

// @route   PATCH api/project/edit/id/sworn
// @desc    Define sworn a project
// @access  Private

router.patch('/edit/:id/swornPremiatory', passport.authenticate('jwt', { session: false }), (req, res) => {
  const sworns = {
    sworn_premiatory
  } = req.body;

  Project.findOneAndUpdate({ _id: req.params.id },
    {
      $set: {
        ...sworns
      }
    },
    { new: true })
    .then(project => res.json({ message: `Jurados definido para o projeto` }))
    .catch((errors) => {
      errors.editError = 'Não foi possível definir os jurados para o projeto'
      return res.status(404).json(errors)
    })
})

router.patch('/edit/:id/swornPremiatoryEnd', passport.authenticate('jwt', { session: false }), (req, res) => {
  const sworns = {
    sworn_premiatory_end
  } = req.body;

  Project.findOneAndUpdate({ _id: req.params.id },
    {
      $set: {
        ...sworns
      }
    },
    { new: true })
    .then(project => res.json({ message: `Jurados definido para o projeto` }))
    .catch((errors) => {
      errors.editError = 'Não foi possível definir os jurados para o projeto'
      return res.status(404).json(errors)
    })
})

// @route   PATCH api/project/edit/id/sworn
// @desc    Define sworn a project
// @access  Private

router.patch('/edit/:id/firstEvaluation', passport.authenticate('jwt', { session: false }), (req, res) => {
  const firstEvaluation = {
    first_evaluation
  } = req.body;

  Project.findOneAndUpdate({ _id: req.params.id },
    {
      $set: {
        ...firstEvaluation
      }
    },
    { new: true })
    .then(project => res.json({ message: `Primeira avaliação definida para o projeto` }))
    .catch((errors) => {
      errors.editError = 'Não foi possível definir a primeira avaliação para o projeto'
      return res.status(404).json(errors)
    })
})

// @route   PATCH api/project/edit/id/secondyEvaluation
// @desc    Define sworn a project
// @access  Private

router.patch('/edit/:id/secondyEvaluation', passport.authenticate('jwt', { session: false }), (req, res) => {

  const evaluation = {
    second_evaluation
  } = req.body;

  Project.update(
    { _id: req.params.id },
    { $pull: { "second_evaluation": { created_by: evaluation.second_evaluation.created_by } } }
  ).then(ok => Project.update({ _id: req.params.id },
    {
      $push: {
        "second_evaluation": evaluation.second_evaluation
      }
    })
    .then(project => res.json(evaluation.second_evaluation))
    .catch((errors) => {
      errors.editError = 'Não foi possível definir a primeira avaliação para o projeto'
      return res.status(404).json(errors)
    }))


})


router.patch('/edit/:id/threeEvaluation', passport.authenticate('jwt', { session: false }), (req, res) => {

  const evaluation = {
    three_evaluation
  } = req.body;

  Project.update(
    { _id: req.params.id },
    { $pull: { "three_evaluation": { created_by: evaluation.three_evaluation.created_by } } }
  ).then(ok => Project.update({ _id: req.params.id },
    {
      $push: {
        "three_evaluation": evaluation.three_evaluation
      }
    })
    .then(project => res.json(evaluation.three_evaluation))
    .catch((errors) => {
      errors.editError = 'Não foi possível definir a primeira avaliação para o projeto'
      return res.status(404).json(errors)
    }))


})

module.exports = router
