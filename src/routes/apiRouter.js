// import sante api 
const controller=require('../Controller/controller')

// router
const router = require('express').Router()

// use routers
router.post('/userAuth', controller.userAuthentication)

router.post('/validate', controller.POST)

module.exports = router