type ReadonlyType<T> = {
    readonly [K in keyof T]: T[K];
  };
  
  interface User {
    name: string;
    email: string;
  }
  
  type ReadonlyUser = ReadonlyType<User>;
  

  const user: ReadonlyUser = { name: "Sam", email: "smiths@example.com" };
  console.log(user);

  