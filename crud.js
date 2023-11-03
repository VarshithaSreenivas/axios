document.getElementById("my-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission
  
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
  
    var userDetails = {
      name: name,
      email: email,
    };
  
    axios.post("https://crudcrud.com/api/0594474c99c9427fa9f6e4b866f3ce91/appointmentdata", userDetails)
      .then((response) => {
        // Success message or any additional handling after data submission if needed
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        var messageDiv = document.querySelector(".msg");
        messageDiv.textContent = "User added successfully!";
        setTimeout(function () {
          messageDiv.textContent = "";
        }, 3000);
        // Here you might do something after successful data submission
        // Maybe display a success message or perform other actions
        // However, displaying users will typically occur after a GET request (fetching all users) from the server
      })
      .catch((err) => {
        document.body.innerHTML = document.body.innerHTML + "<h4>Something went wrong</h4>";
        console.log(err);
      });
  });
  
  function displayUsers() {
    axios.get("https://crudcrud.com/api/0594474c99c9427fa9f6e4b866f3ce91/appointmentdata")
      .then((response) => {
        var usersList = document.getElementById("users");
        usersList.innerHTML = ""; // Clear the existing list
  
        response.data.forEach(function (user, index) {
          var li = document.createElement("li");
          li.textContent = "Name: " + user.name + ", Email: " + user.email;
  
          var editButton = document.createElement("button");
          editButton.textContent = "Edit";
          editButton.addEventListener("click", function () {
            // Handle edit functionality if needed
            // For instance: editUser(index);
          });
  
          var deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.addEventListener("click", function () {
            // Handle delete functionality if needed
            // For instance: deleteUser(user._id);
          });
  
          li.appendChild(editButton);
          li.appendChild(deleteButton);
  
          usersList.appendChild(li);
        });
      })
      .catch((err) => {
        document.body.innerHTML = document.body.innerHTML + "<h4>Something went wrong</h4>";
        console.log(err);
      });
  }
  
  // Initial display of users when the page loads
  displayUsers();