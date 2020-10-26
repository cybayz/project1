var express = require('express');
const routes = require('express').Router();
const prod_controller = require('../controllers/product_controller')


routes.get('/home', (req, res) => {
    res.render('index');
})


routes.get('/productlist',prod_controller.list_all_tasks)

module.exports = routes;