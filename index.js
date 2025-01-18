const process = require("process");
const arguments = process.argv.slice(2);

let password;

for (let i = 0; i < arguments.length; i++) {
  if (arguments[i] === "--generate") {
    password = arguments[i + 1];
  }
}
