/*
----------------------------------------------------------
--------------- Character Sets and Encoding --------------
-----------------------------------------------------------
!Binary data:
computers store and represent data in binary format which is collection of 0s and 1s

Each 0 or 1 is called a binary digit or bit for short

to wrok with a piece of data, a computer needs to convert that data into its binary representaion
EX: to store number 4 => a computer needs to convert to 100

how does a computer know to perform the conversion?
it just simple mathematics where we rely on base 2 numeric system 
  EX: 100 => ()
  1            0           0 
  2^2 * 1 + 2^1 * 0 + 2^0 * 0 
  4 * 1   +     0    +    0
  = (4)

  but numbers are not only data type we wrok with string 

  -------------------- Character in binary format ----------------------------
  How will a computer represent a character in binary format?
  
  computers will first convert the character to a number, then convert that number to it's binary representation
  EX: character V
    computers will first convert V to number that represents V
    86 is the numeric representation of the character V, it also called character code

  -------------------- Character Set ------------------------------
  How does computer know what number will represent each character?
  `How does it know we should be represented as 86?`
  these question brings us to the second Topic:
  character set are predefined lists of characters represented by numbers
  we have different character set we can use but the two popular ones are Unicode and ASCII

  Unicode character set dictates that 86 should represent character V

  --------------- Character Encoding ------------------------------
  character encoding dictates how to represent a number is a character set as binary data before it can be stored in a computer

  more specifically: 
  it dictates how many bits to use to represent the number

  on such example of a character encoding system is UTF-8
  UTF-8 states that characters should be encoded in bytes(set of eight bits)

  so eight ones or zeros should be used to represent the code of any character in binary
  4 => 100 => utf-8 encoding computer adds five zeros to the left to make a byte so 4 is represented as five zeros one double zero (00000100)
  V => 86 => 01010110 (one byte or eight bits)

  ?summary
  1. Binary data - 0s and 1s that computers can understand
  2. Character sets - Predefined lists of characters represented by numbers
  3. character encoding - dictates how to represent a number in a character set as binary data


----------------------------------------------------------
--------------- Streams and Buffers ----------------------
-----------------------------------------------------------

  !----------------------------- Streams ---------------------------------
  a stream is a sequence of data that is being moved from one point to anthor over time
  EX: a stream of data over the internet being moved from one computer to anthor
  EX: a stream of data being transferred from one file to anthor within the same computer

  in NodeJS the idea is to process streams of data in chunks as they arrive instead of waiting for the entire data to be available before processing
  EX: watching a video on YouTube, you dont wait for the entire video to be downloaded to watch it

  the data arrives in chunks and you watch in chunks while the rest of the data arrives over time
  similarly:
  if transferring file contents from file A to file B, you don't wait for the entire file a content to be saved in temporary memory before moving it into file B
  the content arrive in chunks and you transfer in chunks while the remaining contents arrive over time
  you are preventing unnecessary data downloads and momery usage 


  How exactly is that sequence of data moved that brings us to next topic 
  !----------------------------- Buffers ---------------------------------
  scenario of an amusement park with a roller coaster:
  roller coaster can accommodate 30 people but we dont know at what pace people arrive at the roller coaster 

  Scenario 1:
  100 - People arrival
  30 - People accommodated
  70 - people in queue (waiting)


  Scenario 2:
  1 - Person arrives (waiting)
    wait for at least 10
  that is a guideline set to improve efficiency but the bottom line is you can not control the pace at which people arrive, you can decide when is the right time to send people on the ride
  if people are already on the ride or there are too few a people to start the ride, you have to have people arriving wait in line 

  it truns out this area where people wait is nothing but the buffer

  NodeJS connot control the pace at which data arrives in the stream 

  it can only decide when the right time to send the data for processing

  if there is data already processed or too little data to process, Node puts the arriving data in a buffer 

  it is an itentionally samll area that Node maintains in the runtime to process a stream of data 

  a familiar example where you can see a buffer in action is when you are streaming a video on online
  EX: streaming a video online
  if your internet connection is fast enough, the speed of the stream will be fast enough to instantly fill up the buffer and send it out for processing
  That will repeat till the stream is finished

  but if connection is slow:
  if your connection is slow, after processing the first chunck of data that arrived, the video player will display a loading spinner which indicates it is waiting for more data to arrive 

  once the buffer is filled up and the data is processed, the video player shows the video

  while the video is playing, more data will continue to arrive and wait in the buffer

  what is connection between binary data, character set and encoding to buffers?
  we need editor to understand
*/

// NodeJS provides the buffer feature as a global feature that you can use without having to import it
// create a buffer that holds the string mohammed
// uft-8 is the default encoding value and that is optional
const buffer = new Buffer.from("mohammed", "utf-8");



console.log(buffer.toJSON());
/*
the result: is object of type buffer and array of data
{
  type: 'Buffer',
  data: [
    109, 111, 104,
    97, 109, 109,
    101, 100
  ]
}
in data array: each number here is the unicode character for the character in the string mohammed

*/

console.log(buffer); // <Buffer 6d 6f 68 61 6d 6d 65 64>
// you see differant representation of the buffer
/*
buffer: contains raw binary data that is displayed as output when we log to the console 
what NodeJS print the hexadecimal or 16 notation of the number as printing 8 bits binary for every character can flood your terminal 
*/

console.log(buffer.toString()); // mohammed
/*
  this will give back the string representation of the binary data in the buffer mohammed 
*/


// you can also write to buffer 
buffer.write("code");
console.log(buffer.toString()); // codemmed
// because buffers have limited memory the four charactes overwrite the four character from mohammed

buffer.write("codemohammed"); //codemoha
console.log(buffer.toString());
// the last few letters are skipped as they can't be stored in the buffer

