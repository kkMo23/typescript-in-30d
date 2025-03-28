/*
Day 6:
Create a generic function mergeObjects<T, U>(obj1: T, obj2: U): T & U
that merges two objects and returns a new object with properties from both.
*/

function mergeObjects<T, U>(obj1: T, obj2: U): T & U {
    return { ...obj1, ...obj2 };
}

type OrdinaryUser = {
    name: string;
    email: string;
}

type SpecialUser = {
    isAdmin: boolean;
    skills: string[];
}

const ordinaryUser: OrdinaryUser = {
    name: "Sam",
    email: "samsmith@example.mail"
};

const specialUser: SpecialUser = {
    isAdmin: true,
    skills: ["singer", "songwritter"]
};

console.log('Here is your user: ', mergeObjects<OrdinaryUser, SpecialUser>(ordinaryUser, specialUser));


/*
Day 7:
Create a function that takes a User and a Partial<User> to update the user's properties.
*/

type SocialUser = {
    name: string;
    email: string;
    network: "facebook" | "twitter" | "instagram";
}

const socialUser: SocialUser = {
    name: "Sam",
    email: "Smith",
    network: "facebook"
};

function updateUser(user: SocialUser, update: Partial<SocialUser>): SocialUser {
    return { ...user, ...update };
}

console.log('Updated social user: ', updateUser(socialUser, { name: "Samuel" }));

/*
Day 8:
Create a type PublicUser that only includes the name and email properties from User.
*/

type RegularUser = {
    name: string;
    surname: string;
    email: string;
    nationality: string;
}

type PublicRegular = Pick<RegularUser, "name" | "email">;

const regularUser: RegularUser = {
    name: "Sam",
    surname: "Smith",
    email: "smith@son.com",
    nationality: "British",
};

let publicRegular: PublicRegular;

console.log('Public regular user: ', publicRegular = { name: regularUser.name, email: regularUser.email });


/*
Day 9:
Write a type guard function isNumberArray(value: any): value is number[] 
that checks if a given value is an array of numbers.
*/

function isNumberArray(value: any) : value is number[] {
    if (!Array.isArray(value)) {
        return false;
    }
    return value.every((element) => typeof element === "number");
}

console.log(isNumberArray([1, 2, 3, 4, "yo yo yo"]));
console.log(isNumberArray([1, 2, 3, 4]));

/*
Day 10:
Create a type that makes all properties of an object readonly.
*/

type TheThangs = {
    purpose: string;
    doesTheThang: boolean;
}

type ReadOnlyTheThangs = Readonly<TheThangs>;

const theThangs: TheThangs = {
    purpose: "To do the thang",
    doesTheThang: true
};

let readOnlyTheThangs: ReadOnlyTheThangs;

console.log('Read only the thangs: ', readOnlyTheThangs = theThangs);