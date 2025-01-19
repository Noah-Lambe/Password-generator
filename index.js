// Import the 'process' module to access command-line arguments
const process = require("process");

// Retrieve command-line arguments, excluding the first two (node and script file path)
const arguments = process.argv.slice(2);
const userInput = arguments;

let password = "";

// Define valid static flags
const validFlags = [
  "--help",
  "--length",
  "--uppercase",
  "--numbers",
  "--symbols",
];

// Variable to hold the extracted value for --length
let argumentL = null;

// Check for invalid flags
const invalidFlags = userInput.filter((arg, index) => {
  // For '--length', ensure it has a valid numeric value following it
  if (arg === "--length") {
    const nextArg = userInput[index + 1];
    return !nextArg || !/^\d+$/.test(nextArg); // Invalid if no value or non-numeric value
  }

  // Validate standalone flags
  if (
    !validFlags.includes(arg) &&
    (index === 0 || userInput[index - 1] !== "--length")
  ) {
    return true; // Invalid flag
  }

  return false; // Valid flag
});

// Handle invalid flags
if (invalidFlags.length > 0) {
  console.error(`Invalid flags provided: ${invalidFlags.join(", ")}`);
  console.error("Use --help to see available options.");
  process.exit(1);
}

// Extract the value for --length if provided
if (userInput.includes("--length")) {
  const lengthIndex = userInput.indexOf("--length"); // Find the index of "--length"
  const lengthValue = userInput[lengthIndex + 1]; // Get the value after "--length"

  // Validate and set the argumentL
  if (lengthValue && /^\d+$/.test(lengthValue)) {
    argumentL = `--length ${lengthValue}`;
  } else {
    console.error(
      "Invalid or missing value for --length. Please provide a positive integer."
    );
    process.exit(1);
  }
}

// Provide instructions when prompted with a help flag
if (userInput.includes("--help")) {
  console.log(`
      Usage:
      
      Run the program using node index.js, followed by optional flags to customize the generated password.

      --help          Print this help message
      --length <num>  Set the password length (default: 8)
      --uppercase     Include uppercase letters in the password
      --numbers       Include numbers in the password
      --symbols       Include symbols in the password
  `);
  process.exit(0);
}

// Function to generate a random password based on user input or defaults
const generatePassword = (userInput) => {
  let characters = "abcdefghijklmnopqrstuvwxyz"; // Allowed characters for the password
  let passwordLength = 8; // Default password length

  if (userInput.includes("--uppercase")) {
    characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Add uppercase characters
  }

  if (userInput.includes("--numbers")) {
    characters += "0987654321"; // Add numbers
  }

  if (userInput.includes("--symbols")) {
    characters += "!@#$%^&*()-_=+[{]};:',<.>/?"; // Add symbols
  }

  // Use the custom password length if provided
  if (userInput.includes("--length")) {
    const lengthIndex = userInput.indexOf("--length") + 1;
    passwordLength = parseInt(userInput[lengthIndex], 10);
  }

  // Generate the password
  for (let i = 0; i < passwordLength; i++) {
    password += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  // Print the generated password to the console
  console.log("\nGenerated Password:", password, "\n");
};

// Call the function to generate the password with the provided user input
generatePassword(userInput);
