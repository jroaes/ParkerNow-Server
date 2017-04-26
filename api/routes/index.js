var express = require('express');
var router = express.Router();

var ctrlEstacionamientos = require('../controllers/estacionamientos.controllers.js');

router
  .route('/estacionamientos')
  .get(ctrlEstacionamientos.estacionamientosGetAll);

module.exports = router;
