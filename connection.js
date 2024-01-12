require("dotenv").config();
const mysql = require("mysql2");

const connection = mysql.createConnection({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const query = `
  CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(250),
    contactNumber VARCHAR(20),
    email VARCHAR(50),
    password VARCHAR(250),
    status VARCHAR(20),
    role VARCHAR(20),
    UNIQUE (email)
  )
`;
connection.query(query, (err, result) => {
  if (!err) console.log("Table created successfully!");
  else console.log("Already Exist.");
  connection.end();
});

connection.connect((err) => {
  if (!err) console.log("Connected");
  else console.log("not connected");
});
