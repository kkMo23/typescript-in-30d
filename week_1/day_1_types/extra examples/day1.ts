// 1. Convert the following JavaScript function into TypeScript by adding proper type annotations:

// function calculateArea(width, height) {
//     return width * height;
// }
// Ensure TypeScript enforces correct types when calling the function.

function calculateArea(width: number, height: number) : number {
    return width * height;
}
console.log(`Here is your area: ${calculateArea(5,5)}`);


// 2. Define a TypeScript variable for each of the following scenarios:

// A username that must be a string
// A score that can be a number
// A isLoggedIn flag that should be a boolean
// Assign values and ensure they match the expected types.

let username: string = 'John';
let score : number = 34;
let isLoggedIn : boolean = true;

console.log(username, score, isLoggedIn);
