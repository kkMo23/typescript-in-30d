interface User {
    name: string;
    email: string;
    age?: number;
  }
  
  function changeUserProperties(user: User, updates: Partial<User>): User {
    return { ...user, ...updates };
  }

const newUser: User = {
    name: "Jay", 
    email: "sean@example.com", 
    age: 30 
};
const updatedUser = changeUserProperties(newUser, { age: 41 });

console.log(updatedUser);