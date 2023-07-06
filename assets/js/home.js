

var list= document.querySelectorAll(".category-details");

list.forEach(function(div) {
  var p = div.querySelector("p");
  var content = p.textContent.toLowerCase(); // Convert text to lowercase for case-insensitive matching

  // Assign background color based on the content
  switch (content) {
    case "other":
      p.style.backgroundColor = "skyblue";
      break;
    case "personal":
      p.style.backgroundColor = "orange";
      break;
    case "school":
      p.style.backgroundColor = "Blue";
      break;
    case "work":
        p.style.backgroundColor = "green";
        break;
    default:
      p.style.backgroundColor = "gray";
      break;
  }
});


//set the value of the hidden filed to the selected tasks id
console.log("script are fired up.............!");
const deleteButton = document.getElementById('deleteSelected');

deleteButton.addEventListener('click',function(){
   
     console.log("delete button are pressed");
     
      // Get all the checkbox inputs
     const checkboxes = document.querySelectorAll('input[type="checkbox"]');
     console.log(checkboxes);
     //create array for storing all checked tasks
     const selectedTasks = [];

     checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          selectedTasks.push(checkbox.value);
        }
      });
      console.log(selectedTasks);  

       //here we are making delete request with the help of Ajax request 
    $.ajax({
      type: 'post',
      url: '/delete_todo',
      data:{
        taskIds :selectedTasks
      },
      success: function(response) {
        console.log(response); // Log the response from the server
        location.reload(); // Refresh the page
      },
      error: function(xhr, status, error) {
        console.error(error); // Log any error that occurred
      }
  });

});
