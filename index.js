// Import the 'process' module to access command-line arguments
const process = require("process");

// Retrieve command-line arguments, excluding the first two (node and script file path)
const arguments = process.argv.slice(2);
const userInput = arguments; // Store arguments in a variable for easier reference

let password = "";

// Function to generate a random password based on user input or defaults
const generatePassword = (userInput) => {
  const characters = "abcdefghijklmnopqrstuvwxyz"; // Allowed characters
  const charactersLength = characters.length; // Number of available characters (needed for random proccessing)
  let passwordLength = 8; // Default password length

  // Check if the user provided a "--length" argument to specify password length
  if (userInput.includes("--length")) {
    passwordLength = arguments[1]; // Use the next argument as the password length

    // Generate the password of the specified length
    for (let i = 0; i < passwordLength; i++) {
      password += characters.charAt(
        Math.floor(Math.random() * charactersLength) // Pick a random character
      );
    }
  } else {
    // Default behavior
    for (let i = 0; i < passwordLength; i++) {
      password += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }
  }

  // Print the generated password to the console
  console.log("Generated Password:", password);
};

// Call the function to generate the password with the provided user input
generatePassword(userInput);
