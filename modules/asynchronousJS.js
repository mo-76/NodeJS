/*----------------------------------------------------------
--------------- Asynchronous JavaScript ---------------------
------------------------------------------------------------
- javascript is a synchronous, blocking, single threaded language

synchronous:
  if we have two functions which log messages to the console, code executes top down, with only one line executing at any given time

  EX:
  function A() {
    console.log('A');
  }

  function B() {
    console.log('B');
  }

  A();
  B();

  -> logs A and then B

blocking:
  because of its synchronous nature

  if a function A has execute an intensive chunck of code, javascript has to finish that wihtout moving to function B
  even if that code takes 10 seconds or one minute

  in short: 
    in browser: when a web application runs in a browser and it executes an intensive chunk code without returning control to the browser, the browser can appear to be forzen, this is called blocking

single threaded language:
  - a thread is simply a process that your javascript program can use to run to task
  - each thread can only do one task at a time
  - javascript has just the one thread called the main thread for executing any code


you might have guessed already this model of javascript create a huge problem

what if we have a task to retrieve data from database and then run some code on the data that is retrieved 

we have to wait on the first line for the data to be fetched and when the data finally comes back we can resume with our normal execution 

but that could take one second or even more and during that time we can't run any futher code 

- javascript, if it simply proceeds to the next line without waiting, we have an error because data is not what we expect it to be


we need a way to have asynchronous behaviour with javascript
How do cater to asychronous programming in javascript

- just javascript is not enough to achieve that 
- we need new pieces which are outside of javascript to help us write asynchronous code
- for fornt end, this is where web browsers come into play, for backend, this is where NodeJS comes into play
- web browsers and NodeJS define function and APIs that allow us to register functions that should not be executed synchronously, and should instead be invoked asynchronously when some kind of event occurs
- for example:
  that could be the passage of time(setTimeout or setInterval), that user's interaction with the mouse(addEventListener), data being read from a file system or the arrival of data over the network (callback, Promises, async-await)
- you can let your code do serveral things at the same time without stopping or blocking your main thread

















*/