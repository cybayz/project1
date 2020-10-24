const{
    createPool
} = require('mysql');

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "cybayz",
    connectionLimit:15
})

module.exports = pool;
