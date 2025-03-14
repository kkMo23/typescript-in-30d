interface Person {
    name: string;
    age: number;
    email?: string;
};

interface Customer extends Person {
    company?: string;
}

interface Product {
    id: number;
    name: string;
    price: number;
    description?: string;
}

interface Order {
    id: number;
    products: Product[];
    customer: Customer;
    total: number;
}

  

function createCustomer (details: Customer) : Customer {
    return details;
}

function createProduct (product: Product) : Product {
    return {
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description
    };
}

function createOrder (order: Order) : Order {
    return {
        id: order.id,
        products: order.products,
        customer: order.customer,
        total: order.total
    };
}

function createAll () {
    const customer = createCustomer({name: 'John Doe', age: 30, email: 'jdoe@gmail.com', company: 'ABC Ltd'});
    const product = createProduct({id: 1, name: 'Laptop', price: 1000, description: 'A brand new laptop'});
    const order = createOrder({id: 1, products: [product], customer: customer, total: product.price});
    return [customer, product, order];
}

console.log(createAll());