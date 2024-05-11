const mysql = require('mysql2');
var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: 'Muthu@2206',
    database:'trainee',
})
mysqlConnection.connect((err)=>{
    if(err){
        console.log('Error in Db Connection: '+JSON.stringify(err,undefined,2));
    }
    else{
        console.log('DB Connected Successfully');
    }
})
module.exports = mysqlConnection;