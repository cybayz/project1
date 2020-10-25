'use strict';

const Task = require('../models/product')

exports.list_all_tasks = function(req, res) {
    Task.getAllproducts(function(err, task) {
            res.render('index',{data:task});
      if (err)
        res.send(err);
        console.log( err);
    });
  };