function deleteUser(userId) {
    axios.delete(`https://crudcrud.com/api/0594474c99c9427fa9f6e4b866f3ce91/appointmentdata/${userId}`)
        .then((response) => {
            displayUsers(); // Refresh the user list after successful deletion
        })
        .catch((err) => {
            console.log(err);
        });
}

function displayUsers() {
    axios.get("https://crudcrud.com/api/0594474c99c9427fa9f6e4b866f3ce91/appointmentdata")
        .then((response) => {
            var usersList = document.getElementById("users");
            usersList.innerHTML = ""; // Clear the existing list

            response.data.forEach(function (user) {
                var li = document.createElement("li");
                li.textContent = "Name: " + user.name + ", Email: " + user.email;

                var deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete"; // You can replace this with an actual delete icon
                deleteButton.addEventListener("click", function () {
                    deleteUser(user._id);
                });

                li.appendChild(deleteButton);
                usersList.appendChild(li);
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

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