type Pizza = {
  name: string;
  price: number;
};

type Order = {
  id: number;
  pizza: Pizza;
  status: string;
};

const menu = [
  { name: "Margherita", price: 10 },
  { name: "Pepperoni", price: 12 },
  { name: "Hawaiian", price: 13 },
  { name: "BBQ Chicken", price: 14 },
  { name: "Veggie Supreme", price: 11 },
  { name: "Meat Lovers", price: 15 },
  { name: "Four Cheese", price: 13 },
  { name: "Buffalo Chicken", price: 14 },
  { name: "Mushroom Delight", price: 10 },
  { name: "Pesto Veggie", price: 12 },
  { name: "Spicy Italian", price: 13 },
  { name: "Mediterranean", price: 13 },
  { name: "Chicken Alfredo", price: 15 },
  { name: "Garlic Chicken", price: 14 },
  { name: "Spinach & Feta", price: 12 },
  { name: "Sausage & Onion", price: 11 },
  { name: "Cheeseburger", price: 13 },
  { name: "Taco Pizza", price: 15 },
  { name: "Truffle Mushroom", price: 16 },
  { name: "Buffalo Veggie", price: 12 },
];

let cashInRegister = 100;
let nextOrderId = 1;
const orderQueue: Order[] = [];

function addNewPizza(pizzaObj: Pizza) {
  menu.push(pizzaObj);
}

function placeOrder(pizzaName: string) {
  const selectedPizza = menu.find((pizzaObj) => pizzaObj.name === pizzaName);
  if (!selectedPizza) {
    console.error(`${pizzaName} does not exist in the menu`);
    return;
  }
  cashInRegister += selectedPizza.price;
  const newOrder = {
    id: nextOrderId++,
    pizza: selectedPizza,
    status: "ordered",
  };
  orderQueue.push(newOrder);
  return newOrder;
}

function completeOrder(orderId: number) {
  const order = orderQueue.find((order) => order.id === orderId);
  if (!order) {
    console.error(`${orderId} was not found in the orderQueue`);
    return;
  }
  order.status = "completed";
  return order;
}

addNewPizza({ name: "Buffalo Chicken", price: 14 });
addNewPizza({ name: "Pesto Veggie", price: 12 });
addNewPizza({ name: "Truffle Mushroom", price: 16 });

placeOrder("Truffle Mushroom");
completeOrder(1);

console.log("Menu:", menu);
console.log("Cash in register:", cashInRegister);
console.log("Order queue:", orderQueue);
