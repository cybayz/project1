var express = require('express');
const routes = require('express').Router();
const prod_controller = require('../controllers/product_controller')


routes.get('/home',prod_controller.list_all_tasks)

routes.get('/',prod_controller.list_all_tasks)

routes.get('/map', (req, res) => {
    res.render('map');
})

module.exports = routes;