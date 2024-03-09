const mysql2 = require("mysql2");

const pool = mysql2.createPool({
  host: process.env.HOST,
  user: "root",
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection((err, _) => {
  if (err) {
    console.log("Database connection failed", err);
    return;
  }
  console.log("Successfull Database Connection");
});

module.exports = pool.promise();
