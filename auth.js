const handleRegistration = (event) => {
    event.preventDefault();
    const username = getValue("username");
    const first_name = getValue("first_name");
    const last_name = getValue("last_name");
    const email = getValue("email");
    const password = getValue("password");
    const confirm_password = getValue("confirm_password");

    const info = {
        username,
        first_name,
        last_name,
        email,
        password,
        confirm_password,
    };

    if (password === confirm_password) {
        document.getElementById('error').innerHTML = "";
        if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {
            fetch("https://smart-care-rp5y.onrender.com/patient/register", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(info)
            })
            .then((res) => {
                if (res.ok) {
                    // Registration successful
                    console.log("Registration successful");
                    document.getElementById('error').innerHTML = "Registration successful";
                   
                } else {
                    // Registration failed, handle the error response
                    return res.json(); // Parse the response body as JSON
                }
            })
            .then((errorData) => {
                if (errorData && errorData.error) {
                    // Display the specific error message from the backend
                    document.getElementById('error').innerHTML = errorData.error;
                } else {
                    
                    document.getElementById('error').innerHTML = "Registration failed. Please try again later.";
                }
            })
            .catch((error) => {
                // Handle errors during registration
                console.error("Error during registration:", error.message);
                document.getElementById('error').innerHTML = "Registration failed. Please try again later.";
            });
        } else {
            document.getElementById('error').innerHTML ="Password must contain letters, numbers, and symbols.";
        }
    } else {
        document.getElementById('error').innerHTML = "Password and confirm password do not match"
        alert("password and confirm password do not match")
    }
};
const handleLogin = (event) => {
    event.preventDefault();
    const username = getValue("login-username");
    const password = getValue("login-password");
    console.log(username, password);
    if ((username, password)) {
      fetch("https://smart-care-rp5y.onrender.com/patient/login/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
  
          if (data.token && data.user_id) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user_id", data.user_id);
            localStorage.setItem("user_name", username);
            window.location.href = "index.html";
          }
        });
    }
  };
const getValue = (id) => {
    const value = document.getElementById(id).value;
    return value;
}
// Display the username in the welcome message using innerText
const displayUsername = () => {
  const username = localStorage.getItem("user_name");
  // console.log(username);
  if (username) {
      const welcomeMessage = document.getElementById("welcome-message");
      welcomeMessage.innerText = `Welcome, ${username}!`;
  }
};

// Call the displayUsername function when the welcome page is loaded
document.addEventListener("DOMContentLoaded", displayUsername);