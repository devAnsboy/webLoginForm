const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const programme = document.getElementById("programme");
const year = document.getElementById("year");
const interests = document.getElementById("interests");
const username = document.getElementById("username");
const password = document.getElementById("password");
const form = document.getElementById("loginForm");

form.addEventListener('submit', function(event) {
    if(password.value.length < 8){
        alert("Password must be at least 8 characters long.");
        event.preventDefault();
        return;
    }
    if(password.value.length > 20){
        alert("Password must be less than 20 characters long.");
        event.preventDefault();
        return;
    }
    
    if(!firstName.value.match(/^[A-Za-z]+$/) || !lastName.value.match(/^[A-Za-z]+$/)){
        alert("First name and last name must only contain letters.");
        event.preventDefault();
        return;
    }
    if(username.value.trim().length < 3){
        alert("Username must be at least 3 characters long.");
        event.preventDefault();
        return;
    }
    alert("Registration successful!");
});

function clearForm() {
    form.reset();
}

function validateField(fieldElement, validationFunction, errorMessage) {
    if(!validationFunction(fieldElement.value)) {
        fieldElement.style.borderColor = 'red';
        return false;
    } else {
        fieldElement.style.borderColor = '#ddd';
        return true;
    }
}


