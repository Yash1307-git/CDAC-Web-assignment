 // The form element for login
const loginForm = document.getElementById('loginForm');
// Email input field
const email = document.getElementById('email'); 
// Password input field
const password = document.getElementById('password'); 
// Span element for email errors
const emailError = document.getElementById('emailError'); 
// Span element for password errors
const passwordError = document.getElementById('passwordError');
// Span element for success messages 
const successMessage = document.getElementById('successMessage'); 
// Span element for API error messages
const apiErrorMessage = document.getElementById('apiErrorMessage'); 
// Div element for loading spinner
const loadingSpinner = document.getElementById('loadingSpinner'); 

// Function to validate the form inputs
function validateForm() {
  // Initialize the validity of the form
    let isValid = true; 
    // Clear previous email errors
    emailError.textContent = ''; 
    // Clear previous password errors
    passwordError.textContent = ''; 

    // Validate email input
    const emailValue = email.value.trim(); // Get and trim the email input value
    if (emailValue === '') {
        emailError.textContent = 'Email is required'; // Show error if email is empty
        isValid = false; // Form is not valid
    } else if (!/\S+@\S+\.\S+/.test(emailValue)) {
        emailError.textContent = 'Invalid email format'; // Show error if email format is invalid
        isValid = false; // Form is not valid
    }

    // Validate password input
    const passwordValue = password.value.trim(); // Get and trim the password input value
    if (passwordValue === '') {
        passwordError.textContent = 'Password is required'; // Show error if password is empty
        isValid = false; // Form is not valid
    } else if (passwordValue.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters long'; // Show error if password is too short
        isValid = false; // Form is not valid
    }

    return isValid; // Return the validity status of the form
}

// Event listener for form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (validateForm()) { // Check if the form is valid
        loadingSpinner.style.display = 'block'; // Show loading spinner
        apiErrorMessage.textContent = ''; // Clear previous API error messages
        successMessage.textContent = ''; // Clear previous success messages

        try {
            // Send login request to the API
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: email.value,
                    password: password.value
                })
            });

            // Parse the response from the API
            const data = await response.json();

            if (response.ok) {
                successMessage.textContent = 'Login successful!'; // Show success message if login is successful
            } else {
                apiErrorMessage.textContent = 'Login failed! Please try again.'; // Show error message if login fails
            }
        } catch (error) {
            apiErrorMessage.textContent = 'Error connecting to the API. Please try again later.'; // Show error message if there is an error connecting to the API
        } finally {
            loadingSpinner.style.display = 'none'; // Hide loading spinner regardless of the outcome
        }
    }
});
