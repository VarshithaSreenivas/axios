// Function to update a user's details
function updateUser(userId, updatedUser) {
    axios
        .put(`https://crudcrud.com/api/84e7519cec9543b895efe9c5ce0233b7/appointmentdata/${userId}`, updatedUser)
        .then((response) => {
            displayUsers(); // Refresh the user list after successful update
            showSuccessMessage("User details updated successfully!");
        })
        .catch((err) => {
            console.log(err);
            alert('Failed to update user. Please try again.'); // Inform the user about the error
        });
}

function deleteUser(userId) {
    axios.delete(`https://crudcrud.com/api/84e7519cec9543b895efe9c5ce0233b7/appointmentdata/${userId}`)
        .then((response) => {
            displayUsers(); // Refresh the user list after successful deletion
        })
        .catch((err) => {
            console.log(err);
        });
}

// Function to edit a user
function editUser(userId, user) {
    // Populate the form fields with the user's data
    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;

    // Event listener for form submission
    document.getElementById("my-form").onsubmit = function (e) {
        e.preventDefault(); // Prevent the default form submission

        // Create an updated user object with the form values
        const updatedUser = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value
        };

        updateUser(userId, updatedUser); // Call the updateUser function with the user ID and updated details
    };
}

// Function to display users
function displayUsers() {
    axios
        .get("https://crudcrud.com/api/84e7519cec9543b895efe9c5ce0233b7/appointmentdata")
        .then((response) => {
            var usersList = document.getElementById("users");
            usersList.innerHTML = ""; // Clear the existing list

            response.data.forEach(function (user) {
                var li = document.createElement("li");
                li.textContent = "Name: " + user.name + ", Email: " + user.email;

                var editButton = document.createElement("button");
                editButton.textContent = "Edit"; // You can replace this with an actual edit icon
                editButton.addEventListener("click", function () {
                    editUser(user._id, user);
                });

                var deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete"; // You can replace this with an actual delete icon
                deleteButton.addEventListener("click", function () {
                    deleteUser(user._id);
                });

                li.appendChild(editButton);
                li.appendChild(deleteButton);

                usersList.appendChild(li);
            });
        })
        .catch((err) => {
            console.log(err);
            alert('Failed to retrieve user data. Please try again.'); // Inform the user about the error
        });
}

// Function to add a new user
document.getElementById("my-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;

    var userDetails = {
        name: name,
        email: email,
    };

    axios.post("https://crudcrud.com/api/84e7519cec9543b895efe9c5ce0233b7/appointmentdata", userDetails)
        .then((response) => {
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            var messageDiv = document.querySelector(".msg");
            messageDiv.textContent = "User added successfully!";
            setTimeout(function () {
                messageDiv.textContent = "";
            }, 3000);
            displayUsers();
        })
        .catch((err) => {
            console.log(err);
        });
});


// Initial display of users when the page loads
displayUsers();

// Function to show a success message
function showSuccessMessage(message) {
    var messageDiv = document.querySelector(".msg");
    messageDiv.textContent = message;
    setTimeout(function () {
        messageDiv.textContent = "";
    }, 3000);
}