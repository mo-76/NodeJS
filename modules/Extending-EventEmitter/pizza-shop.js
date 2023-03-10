/*
we create our own module that builds on top of the event emitter class

we would like the shop to be able to handle orders using the event-driven architecture that is using event module

the solution for that is inheritance 
*/

// importe the event emitter class
const EventEmitter = require("node:events");

// use the pizza shop calss as if it is an event Emitter class by inheritances
class pizzaShop extends EventEmitter {
  constructor() {
    super();
    this.orderNumber = 0;
  }

  order(size, topping) {
    // you can emit an event 
    // this refers to the emitted object
    this.emit("order", size, topping)
    this.orderNumber++;
    // event now being emitted we can go back to index.js and attach listeners
  }

  displayOrderNumber() {
    console.log(`Current order number: ${this.orderNumber}`);
  }
}

module.exports = pizzaShop;