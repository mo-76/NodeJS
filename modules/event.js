/*
-----------------------------------------------------------
------------------ Callback Fun. --------------------------
-----------------------------------------------------------
!callback pattern or callback style of programming in nodeJS

?About function in javascript:
  1. javascript functions are first calss objects => just like an object
  2. A function can be passed as an argument to a function = callback function
  3. A function can also be returned as value from other funcitons
  
  *EX: 
 */
function greet(name) {
  console.log(`Hello ${name}`);
}

// greetMohammed is a fucntion which accepts another funciton as an argument
function greetMohammed(greetFun) {
  const name = "Mohammed";
  greetFun(name);
}

greetMohammed(greet);

/*
*any fucntion that is passed as an argument to anther function is called a callback function in javascript

*the funciton which accepts a function as its argument or returns a function is called a higher order function 

?why do we need a callback function
we can answer that by categorizing callbacks into two
  *1. Synchronous callback
  *2. Asynchronous callback

  *Synchronous callback
    callback which is executecd immediately 

    EX: 
      1. pervious callback function gets executed immediately when the control goes inside the higer order function 
      2. callback function passed to method like sort, map and filter
          let numbers = [1, 2, 4, 7, 3, 5, 6]
          numbers.sort((a, b) => a - b)
          numbers.filter(n => n % 2 === 0)
          numbers.map(n => n/2)

  *Asynchronous callback
      which will also bring our focus back on asynchronous javascript
      
      is callback that is often used to continue or resume code execution after an asynchronous operation has completed 

      callbacks are used to delay the execution of a function until a particular time or event has occurred

      in NodeJS have an asynchronous nature to prevent blocking of execution
      
      EX: reading data form a file, fetching data from a database or handling a network request

      Asynchronous callback in browser:
        EX: eventhadndlers */
// function callback() {
//   document.getElementById('demo').innerHTML = "Hello World";
// }
// document.getElementById("btn").addEventListener("click", callback);
// the callback function runs only when ther user clicks on the btn
// in the other words the execution of the callback function is delayed till an event ocuurs in the browser 


/*
----------------------------------------------------------
------------------ Event Module --------------------------
-----------------------------------------------------------
the event module allows us to work with events in NodeJS

an event is an action or an occurrence that has happened in our application that we can respond to 

using the events modul, we can dispatch our own custom events and respond to those custom events in a non-blocking manner
*/

// import module to make use of any module
const EventEmitter = require("node:events");

/*
why did I call the constant event emitter and not events
because the events module returns a class called event emitter which encapsulates functionality to emit events and respond to events

you could call it events but event emitter is more appropriate */

// instantiate the class
const emitter = new EventEmitter();

// dispatching and responding to custom events courtesy of the events module
// emit event 
emitter.emit("order-pizza");

// to respond to this order pizza event we need to register a lisener by using on method
// on method has two parameter 1.eventname 2.listener is (callback fun.)
emitter.on("order-pizza", () => {
  console.log(`Order received! Baking a pizza`);
});

// you must event ocuurs after on method
emitter.emit("order-pizza");

// sometime when emitting an event you may want to pass data to the listener
// EX: when ordering a pizza I wnat to specify the size and a topping 
emitter.emit("order-pizza", "large", "mushroom")

// when doing this NodeJS will automatically pass on the arguments to Listener function
emitter.on("order-pizza", (size, topping) => {
  console.log(`Order received! Baking a ${size} pizza with ${topping}`);
});
emitter.emit("order-pizza", "large", "mushroom");

// you can register multiple listeners for the same event 
emitter.on("order-pizza", (size) => {
  if (size === "large")
    console.log("Serving complimentary drinking");
});

console.log("Do work before event occurs in the system");
emitter.emit("order-pizza", "large", "mushroom");

// the code execution does not stop at line 97 for the order pizza event to occur
// all we are doing is delaying the execution of a function till certain event is signaled in the system this is known as event driven programming and it used quite a lot in nodeJS

// event allow us to write code in a non-blocking manner


