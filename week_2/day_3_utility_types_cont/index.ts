interface UserX {
    uId: number;
    name: string;
    email: string;
    password: string;
  }
  
  type PublicUser = Omit<UserX, "password" | "uId">;
  
  const response: PublicUser = {
    name: "Sean", 
    email: "pauls@example.com"
};

  console.log(response);