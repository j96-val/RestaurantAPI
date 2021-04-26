'use strict'

var express = require('express');
var UserController = require('../controllers/controller-user');

var router = express.Router();
router.get('/user/:id', UserController.getPuchaseOrder);
router.post('/user', UserController.saveUser);
router.put('/user/provider/', UserController.confirmPuchaseOrder);
router.put('/user/manager/', UserController.confirmRecieve);

module.exports = router;
