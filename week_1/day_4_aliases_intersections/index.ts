type UserID = number;
type ProductID = number;
type OrderStatus = "pending" | "approved" | "rejected" | "shipped" | "delivered";

interface ProcessedOrder {
    id: number;
    userId: UserID;
    productIds: Array<ProductID>;
    status: OrderStatus;

}

const products = [
    { id: 1, name: "Laptop", price: 1000 },
    { id: 2, name: "Mouse", price: 20 },
    { id: 3, name: "Keyboard", price: 50 }
]

const newOrders: Array<ProcessedOrder> = [
    { id: 1, userId: 1, productIds: [1, 2], status: "pending" },
    { id: 2, userId: 2, productIds: [2, 3], status: "approved" },
    { id: 3, userId: 1, productIds: [3], status: "rejected" }
]

function matchProductToOrder(order: ProcessedOrder) {
    const matchedProducts = products.filter((product) => order.productIds.find((id) => id === product.id));
    return matchedProducts;
}

console.log(matchProductToOrder(newOrders[0]));
console.log(matchProductToOrder(newOrders[1]));