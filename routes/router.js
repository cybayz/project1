var express = require('express');
const routes = require('express').Router();


routes.get('/home', (req, res) => {
    res.render('index');
})

module.exports = routes;