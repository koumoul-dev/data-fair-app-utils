// A router to simulate reading/writing configurations from a data-fair server
// and instead use a local file.
// used in development

const fs = require('fs-extra')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const router = module.exports = express.Router()
router.use(bodyParser.json({limit: '1000kb'}))

const configDir = './config-store'
fs.ensureDirSync(configDir)

router.get('', (req, res, next) => {
  res.status(200).send({
    userPermissions: [
      'readDescription',
      'readConfig',
      'writeConfig'
    ]
  })
})

router.get('/config', (req, res, next) => {
  try {
    const content = fs.readFileSync(path.join(configDir, 'test.json'), 'utf-8')
    res.status(200).send(JSON.parse(content))
  } catch (err) {
    res.status(200).send({})
  }
})

router.put('/config', (req, res, next) => {
  const content = JSON.stringify(req.body, null, 2)
  fs.writeFileSync(path.join(configDir, 'test.json'), content)
  res.status(200).send(req.body)
})
