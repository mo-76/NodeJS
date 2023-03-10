/*
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
function callback() {
  document.getElementById('demo').innerHTML = "Hello World";
}
document.getElementById("btn").addEventListener("click", callback);
          // the callback function runs only when ther user clicks on the btn
          // in the other words the execution of the callback function is delayed till an event ocuurs in the browser 
