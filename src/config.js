var mysql=require('mysql');


var client = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'class_post_system'
})

module.exports = client;