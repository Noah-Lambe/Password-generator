const process = require("process");

const arguments = process.argv.slice(2);
const userInput = arguments;

let password = "";

const generatePassword = (userInput) => {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  let passwordLength = 8;

  if (userInput.includes("--length")) {
    passwordLength = arguments[1];
    for (let i = 0; i < passwordLength; i++) {
      password += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }
  } else {
    for (let i = 0; i < passwordLength; i++) {
      password += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }
  }

  console.log("Generated Password:", password);
};

generatePassword(userInput);
