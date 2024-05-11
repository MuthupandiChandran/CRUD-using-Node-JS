const connection = require('./Connection');
const express = require('express');
const bodyParser = require('body-parser');
var app = express();


app.use(bodyParser.json())

app.get('/employees',(req,res)=>{
    connection.query('SELECT * FROM dbo.employee',(err,rows) =>{
         if(err)
            {
                console.log(err);
            }
            else{
                res.send(rows);
            }
    })
})

app.get('/employees/:id',(req,res)=>{
    connection.query('SELECT * FROM dbo.employee WHERE id=?',[req.params.id],(err,rows) =>{
         if(err)
            {
                console.log(err);
            }
            else{
                res.send(rows);
            }
    })
})

app.post('/employees', (req, res) => {
    var emp = req.body;
    var values = [emp.id, emp.name, emp.salary];
    connection.query('INSERT INTO dbo.employee (id, name, salary) VALUES (?, ?, ?)', values, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error inserting employee");
        } else {
            res.status(200).send("Employee inserted successfully");
        }
    });
});

app.patch('/employees', (req, res) => {
    var emp = req.body;
    console.log(emp);
    connection.query('UPDATE dbo.employee SET ? WHERE id = ?', [emp,emp.id], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(rows);
        }
    });
});

app.put('/employees/:id', (req, res) => {
    var emp = req.body;
    var empId = req.params.id;
    console.log(emp);
    connection.query('UPDATE dbo.employee SET ? WHERE id = ?', [emp, empId], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }  else {
                res.send(rows);
            }
        });
});




app.delete('/employees/:id',(req,res)=>{
    connection.query('DELETE FROM dbo.employee WHERE id=?',[req.params.id],(err,rows) =>{
         if(err)
            {
                console.log(err);
            }
            else{
                res.send(rows);
            }
    })
})




app.listen(3000,()=>console.log('Express Server is Running on Port 3000'))