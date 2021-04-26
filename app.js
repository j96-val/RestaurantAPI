'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// cargar archivos de rutas
var user_routes = require('./routes/route-user');
var puchaseOrder_routes = require('./routes/route-puchaseOrder');

//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//rutas
app.use('/api', user_routes);
app.use('/api', puchaseOrder_routes);

//exportar
module.exports = app;