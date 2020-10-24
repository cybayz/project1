
const{
  createPool
} = require('mysql');

const connection = createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "stall_db",
  connectionLimit:15
})

module.exports = connection;
