type Pizza = {
  id: number;
  name: string;
  price: number;
};

type Order = {
  id: number;
  pizza: Pizza;
  status: "ordered" | "completed";
};

let cashInRegister = 100;
let nextOrderId = 1;
let nextPizzaId = 1;

const menu: Pizza[] = [
  { id: nextPizzaId++, name: "Pepperoni", price: 12 },
  { id: nextPizzaId++, name: "Margherita", price: 10 },
  { id: nextPizzaId++, name: "Hawaiian", price: 13 },
  { id: nextPizzaId++, name: "BBQ Chicken", price: 14 },
  { id: nextPizzaId++, name: "Veggie Supreme", price: 11 },
  { id: nextPizzaId++, name: "Meat Lovers", price: 15 },
  { id: nextPizzaId++, name: "Four Cheese", price: 13 },
  { id: nextPizzaId++, name: "Buffalo Chicken", price: 14 },
  { id: nextPizzaId++, name: "Mushroom Delight", price: 10 },
  { id: nextPizzaId++, name: "Pesto Veggie", price: 12 },
  { id: nextPizzaId++, name: "Spicy Italian", price: 13 },
  { id: nextPizzaId++, name: "Mediterranean", price: 13 },
  { id: nextPizzaId++, name: "Chicken Alfredo", price: 15 },
  { id: nextPizzaId++, name: "Garlic Chicken", price: 14 },
  { id: nextPizzaId++, name: "Spinach & Feta", price: 12 },
  { id: nextPizzaId++, name: "Sausage & Onion", price: 11 },
  { id: nextPizzaId++, name: "Cheeseburger", price: 13 },
];

const orderQueue: Order[] = [];

function addNewPizza(pizzaObj: Omit<Pizza, "id">): Pizza {
  const newPizza: Pizza = {
    id: nextPizzaId++,
    ...pizzaObj,
  };

  menu.push(newPizza);
  return newPizza;
}

function placeOrder(pizzaName: string): Order | undefined {
  const selectedPizza = menu.find((pizzaObj) => pizzaObj.name === pizzaName);
  if (!selectedPizza) {
    console.error(`${pizzaName} does not exist in the menu`);
    return;
  }
  cashInRegister += selectedPizza.price;
  const newOrder: Order = {
    id: nextOrderId++,
    pizza: selectedPizza,
    status: "ordered",
  };
  orderQueue.push(newOrder);
  return newOrder;
}

function completeOrder(orderId: number): Order | undefined {
  const order = orderQueue.find((order) => order.id === orderId);
  if (!order) {
    console.error(`${orderId} was not found in the orderQueue`);
    return;
  }
  order.status = "completed";
  return order;
}

function getPizzaDetail(identifier: string | number): Pizza | undefined {
  if (typeof identifier === "string") {
    return menu.find(
      (pizza) => pizza.name.toLowerCase() === identifier.toLowerCase()
    );
  } else if (typeof identifier === "number") {
    return menu.find((pizza) => pizza.id === identifier);
  } else {
    throw new TypeError(
      "Parameter `identifier` must be either a string or a number"
    );
  }
}

addNewPizza({ name: "Taco Pizza", price: 15 });
addNewPizza({ name: "Truffle Mushroom", price: 16 });
addNewPizza({ name: "Buffalo Veggie", price: 12 });

placeOrder("Truffle Mushroom");
completeOrder(1);

console.log("Menu:", menu);
console.log("Cash in register:", cashInRegister);
console.log("Order queue:", orderQueue);
