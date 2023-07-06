//require library

const mongoose =require('mongoose');

//connect to the database

mongoose.connect('mongodb://127.0.0.1/todo_list_db');

//acquire the connection

const db = mongoose.connection;
db.on('error',function(err){
    console.log(err.message);
});

//up and running then print the message

db.once('open',function(){
   
     console.log("Successfully connected  the database");
});