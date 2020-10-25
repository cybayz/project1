var express = require('express');
const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.render('index');
})

routes.get('/home', (req, res) => {
    res.render('index');
})

routes.get('/map', (req, res) => {
    res.render('map');
})

module.exports = routes;