// 1. Define an interface Vehicle with properties brand, model, and year.

// Then create an object car that adheres to this interface.
// 2. Create an interface for a Book, which has a title, author, and an optional publishedYear.

// Then write a function that takes a Book as a parameter and returns a formatted string:
// function describeBook(book: Book): string { ... }

interface Vehicle {
    brand : string,
    model: StaticRangeInit,
    year: number
}

interface Book {
    title: string,
    author: string,
    publishedYear?: number
}

function describeBook(book: Book) : string {
    return `The book ${book.title} was written by ${book.author} in ${book.publishedYear}`;
}

console.log(describeBook({title: 'The Alchemist', author: 'Paulo Coelho', publishedYear: 1988}));

