const exp = require('constants');
const express = require('express');
const path = require('path');
const port = 8000;
const app= express();

const db = require('./config/mongoose');

//assessing schema
const Tasks = require('./models/tasks');
const { deleteModel } = require('mongoose');
app.use(express.static('assets'));
app.use(express.urlencoded());


var taskList =[
      
       { 
           id:1,  
          task:"first task",
          category :"Work",
          date :"22-12-2020"
       },
       {
            id:2, 
            task:"second task",
            category :"Work",
            date :"22-12-2020"
         },

         {
            id:3,
            task:"third task",
            category :"Work",
            date :"22-12-2020"
         },
];


//set up ejs

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


//routes
app.get('/',function(req,res){

      Tasks.find({})
       .then((tasks)=>{
            return res.render('home',{
                  title:"Tasks List",
                  task_List:tasks
            });
       })
       .catch((err)=>{
            console.log('error in fetching contacts from db:',err);
            return res.status(500).send('Internal Server Error');
       });
       
//      return res.render('home',{
           
//            title : "Task_list",
//            task_List:Tasks 
//      });

});

app.post('/delete',function(req,res){
 
      return res.send('new');
});

app.post('/create-tasks', async function(req,res){

      try{
            const newTasks = await Tasks.create({
                  task :req.body.task,
                  category:req.body.category,
                   date : req.body.date
                   
            });
            console.log('created Tasks:',newTasks);
            return res.redirect('back');
      }catch(err){
         console.error('Error in creating the Contact',err);
      }
     
      //  taskList.push(req.body);
      //  console.log(req.body);
      // return res.redirect('/');
});




app.post('/delete_todo', function(req, res) {
      var taskIds = req.body.taskIds;
      console.log("We received these IDs:", taskIds);
    
      Tasks.deleteMany({ _id: { $in: taskIds } })
        .then(function(deleteTasks) {
          if (deleteTasks.deletedCount > 0) {
            console.log('Tasks Deleted Successfully:', deleteTasks);
            return res.status(200).json({ message: 'Tasks deleted successfully' });
          } else {
            console.log("Tasks not found");
            return res.status(404).json({ error: 'Tasks not found' });
          }
        })
        .catch(function(err) {
          console.log('Error occurred while deleting the tasks:', err);
          return res.status(500).json({ error: 'Error occurred while deleting the tasks' });
        });
    });
    
    


// app.post('/delete_todo', function(req,res){

//       var taskIds =req.body.taskIds;
//       console.log("we received this id",taskIds);   
      
//       Tasks.findByIdAndDelete(taskIds)
//       .then(function(deleteTask){
//             if(deleteTask){
//                   console.log('Tasks Deleted Sucessfully :',deleteTasks);
//                   return res.redirect('back');
//             }
//             else{
//                   console.log("Tasks not found");
//             }
//       }) 
//       .catch(function(err){
//             console.log('Error Detecting to delete the Tasks:',err);
//       });   

// });
//delete tasks



// app.post('delete-tasks',function(req,res){

//       //write the logic for delete function
      
//       const selectedTask = req.body.selectedTask

// });

app.listen(port,function(err){
     if(err){
         console.log('Error in connecting to the Server',err);
     }

     console.log("successfully connected to server........");
});