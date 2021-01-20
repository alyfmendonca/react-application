const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')
const helmet = require('helmet')
const db = require('./config/db')
require('dotenv').config();

const path = require('path')

const enterprise = require('./routes/api/enterprise')
const agency = require('./routes/api/agency')
const project = require('./routes/api/project')
const user = require('./routes/api/user')


const app = express()

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// adding Helmet to enhance your API's security
app.use(helmet())

// enabling CORS for all requests
app.use(cors())

// Passport middleware
app.use(passport.initialize())

// Passport Config
require('./config/passport')(passport)

app.use(express.static(path.join(__dirname, 'client', 'build')))
app.use((err, req, res, next) => {
  console.error({ err })
  res.status(500).json({ message: 'an error occurred' })
})


// Use Routes
app.use('/api/enterprise', enterprise)
app.use('/api/agency', agency)
app.use('/api/project', project)
app.use('/api/user', user)


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port ${port}`))
