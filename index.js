// Import the 'process' module to access command-line arguments
const process = require("process");

// Retrieve command-line arguments, excluding the first two (node and script file path)
const arguments = process.argv.slice(2);
const userInput = arguments;

let password = "";

// Function to generate a random password based on user input or defaults
const generatePassword = (userInput) => {
  let characters = "abcdefghijklmnopqrstuvwxyz"; // Allowed characters for the password
  let charactersLength = characters.length;
  let passwordLength = 8; // Default password length

  if (userInput.includes("--uppercase")) {
    characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; // Add uppercase characters
    charactersLength = characters.length;
  }

  if (userInput.includes("--numbers")) {
    characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0987654321"; // Add numbers
    charactersLength = characters.length;
  }

  if (userInput.includes("--symbols")) {
    characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0987654321!@#$%^&*()-_=+[{]};:',<.>/?"; // Add symbols
    charactersLength = characters.length;
  }

  // Check if the user specified a custom password length using "--length"
  if (userInput.includes("--length")) {
    const lengthIndex = userInput.indexOf("--length") + 1; // Find the index after "--length"
    passwordLength = parseInt(userInput[lengthIndex], 10); // Use the argument following "--length"

    if (isNaN(passwordLength) || passwordLength <= 0) {
      console.error(
        "Invalid length provided. Please provide a positive integer."
      );
      return;
    }
  }

  // Generate the password
  for (let i = 0; i < passwordLength; i++) {
    password += characters.charAt(
      Math.floor(Math.random() * charactersLength) // Pick a random character
    );
  }

  // Print the generated password to the console
  console.log("Generated Password:", password);
};

// Call the function to generate the password with the provided user input
generatePassword(userInput);
