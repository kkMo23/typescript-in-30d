// 1. Write a function processInput that takes a parameter of type number | string.

// If it's a number, return its square.
// If it's a string, return its uppercase version.
function processInput(input: number | string) : void {
    if (typeof input === 'number') {
        console.log(input * input);
    } else {
        console.log(input.toUpperCase());
    }
}
processInput(5);
processInput('Hello World');

// 2. Create a function handleResponse that accepts a parameter of type "success" | "error" | "pending".
// Based on the value, return different messages.

type response = "success" | "error" | "pending";

function handleResponse(res : response) : string {
    switch(res) {
        case "success":
            return "Success! You've done it!";
        case "error":
            return "Error! You've lot the plot!";
        case "pending":
            return "Pending... You're almost there!";
        default:
            return "Invalid response!";
    }
}

console.log(handleResponse("success"));
console.log(handleResponse("error"));