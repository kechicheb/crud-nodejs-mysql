var mysql = require("mysql");
const express = require("express");
let app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.json());

var connection = mysql.createConnection({
  host: "localhost",
  database: "EmployeeDB",
  user: "root",
  password: "ahmed",
  multipleStatements: true,
});
connection.connect(function (err) {
  if (err) {
    console.error("Error connecting:" + JSON.stringify(err, undefined, 2));

    return;
  }
  console.log("DB connection succeded.");
});
app.listen(3000, () => console.log("Express server is running at port 3000"));

// Get all employees
app.get("/employees", (req, res) => {
  connection.query("SELECT * FROM employee", function (error, rows, fields) {
    if (error) throw error;
    else res.send(rows);
  });
});

// get single

app.get("/employees/:id", (req, res) => {
  connection.query(
    "SELECT * FROM employee WHERE EmpID = ?",
    [req.params.id],
    function (error, rows, fields) {
      if (error) throw error;
      else res.send(rows);
    }
  );
});

// delete an employees

app.delete("/employees/:id", (req, res) => {
  connection.query(
    "DELETE FROM employee WHERE EmpID = ?",
    [req.params.id],
    function (error, rows, fields) {
      if (error) throw error;
      else res.send("Deleted successfully.");
    }
  );
});
//   new employee
app.post("/employees", (req, res) => {
  const { Name, EmpCode, Salary } = req.body;
  connection.query(
    "INSERT INTO employee(`Name`,`EmpCode`,`Salary`) VALUES (?,?,?) ",
    [Name, EmpCode, Salary],
    function (err, rows, fields) {
      if (err) {
        console.log("error");
        console.log(err);
      } else {
        res.send("success");
      }
    }
  );
});

// update
app.patch("/employees/:id", function (req, res) {
  const { Name, EmpCode, Salary } = req.body;
  const EmpID = req.params.id;

  connection.query(
    "UPDATE employee SET Name=?, EmpCode=?,Salary=? WHERE EmpID=?",
    [Name, EmpCode, Salary, EmpID],
    function (err, rows, fields) {
      if (err) {
        console.log("Error", +err);
      } else {
        console.log("ok");
        res.send("success")
      }
    }
  );
});
