const PizzaShop = require("./pizza-shop");
const DrinkMachine = require("./drinkmachine");

const pizzaShop = new PizzaShop();
const drinkMachine = new DrinkMachine();

pizzaShop.on("order", (size, topping) => {
  console.log(`Order received! Baking a ${size} pizza with ${topping}`);
  drinkMachine.serverDrink(size);
})

pizzaShop.order("large", "mushrooms");
pizzaShop.displayOrderNumber();


/*
pizza shop can extend from event emittter allowing them to emit and react to their own custom events

reason I want to remember this is because most of the built-in modules especially FS streams and HTTP also extend from the event emitter class
*/