'use strict'

var express = require('express');
var PuchaseOrderController = require('../controllers/controller-puchaseOrder');

var router = express.Router();

router.post('/puchase-order', PuchaseOrderController.savePuchaseOrder);

module.exports = router;
