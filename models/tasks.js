const mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema({
       
    task:{
         type :String,
         require:true
    },
    category:{
        type:String,
        require           
    },
    date:{
        type:String,
        require
    }

});

const Tasks = mongoose.model('Tasks',tasksSchema);
module.exports = Tasks;