'user strict';
var sql = require('../database');




var Task = function(task){
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};

Task.getAllproducts = function (result) {
    sql.query("Select * from products", function (err, res) {

            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
              console.log('tasks : ', res);  

             result(null, res);
            }
        });   
};

module.exports= Task;