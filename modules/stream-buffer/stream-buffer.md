#

<h1 align = "center" > 
  Stream and Buffer
</h1>

## Binary Data

- _computers store and represent data in binary format which is collection of 0s and 1s_
- _Each 0 or 1 is called a binary digit or bit for short_

<br><br>

`how does a computer know to perform the conversion?` <br>
it just simple mathematics where we rely on base 2 numeric system

```js
EX: 100 => ()
  1            0           0
  2^2 * 1 + 2^1 * 0 + 2^0 * 0
  4 * 1   +     0    +    0
  = (4)
```

but numbers are not only data type we wrok with string

<br><br>

<!-- <h4 align = "center" >
  <b>
    Character in binary format
  </b>
</h4> -->

`How will a computer represent a character in binary format?`

1. computers will first convert the character to a number
2. then convert that number to it's binary representation

```js
EX: character V
    computers will first convert V to number that represents V

    86 is the numeric representation of the character V, it also called character code
```

<br><br>

---

`How does computer know what number will represent each character?` <br>

`How does it know we should be represented V as 86?`

## Character Sets

- _character set are predefined lists of characters represented by numbers_
- _we have different character set we can use but the two popular ones are Unicode and ASCII_

- _Unicode character set dictates that 86 should represent character V_

<br><br>

---

## Character Encoding

- _character encoding dictates how to represent a number is a character set as binary data before it can be stored in a computer_
- _on such example of a character encoding system is UTF-8_
- _UTF-8 states that characters should be encoded in bytes(set of eight bits)_

- _so eight ones or zeros should be used to represent the code of any character in binary_

```js
4 => 100
- utf-8 encoding computer adds five zeros to the left to make a byte
- so 4 is represented as five zeros one double zero (00000100)
- V => 86 => 01010110 (one byte or eight bits)
```

<br><br>

## summary 🤨

1. _Binary data - 0s and 1s that computers can understand_
2. _Character sets - Predefined lists of characters represented by numbers_
3. _character encoding - dictates how to represent a number in a character set as binary data_

<br><br>

---

## Streams

- _a stream is a sequence of data that is being moved from one point to anthor over time_

```js
Ex1:
a stream of data over the internet being moved from one computer to anthor

Ex2:
a stream of data being transferred from one file to anthor within the same computer
```

<br> <br>

- _in NodeJS the idea is to process streams of data in chunks as they arrive instead of waiting for the entire data to be available before processing_

```js
EX1:
watching a video on YouTube, you dont wait for the entire video to be downloaded to watch it.

the data arrives in chunks and you watch in chunks while the rest of the data arrives over time
```

`similarly:`

- if transferring file contents from file A to file B, you don't wait for the entire file a content to be saved in temporary memory before moving it into file B
- the content arrive in chunks and you transfer in chunks while the remaining contents arrive over time

<br>

- _you are preventing unnecessary data downloads and momery usage_

<br><br>

---

`How exactly is that sequence of data moved that brings us to next topic`

## Buffers

<br>

```js
`scenario of an amusement park with a roller coaster:`

roller coaster can accommodate 30 people
but we dont know at what pace people arrive at the roller coaster

Scenario 1:
100 => People arrival
30  => People accommodated
70  => people in queue (waiting)

Scenario 2:
1 => Person arrives (waiting)
wait for at least 10

--------------------       EXPLAIN       -----------------
that is a guideline set to improve efficiency
but the bottom line is you can not control the pace at which people arrive

you can decide when is the right time to send people on the ride

if people are already on the ride or there are too few a people to start the ride
you have to have people arriving wait in line

it truns out this area where people wait is nothing but the buffer
```

<br> <br>

- _NodeJS connot control the pace at which data arrives in the stream_
- _it can only decide when the right time to send the data for processing_
- _if there is data already processed or too little data to process, Node puts the arriving data in a *buffer*_
- _it is an itentionally samll area that Node maintains in the runtime to process a stream of data_
- _a familiar example where you can see a buffer in action is when you are streaming a video on online_

```js
Ex:
              -----* streaming a video online *-----

              if your internet connection is fast enough

the speed of the stream will be fast enough
to instantly fill up the buffer and send it out for processing
That will repeat till the stream is finished


                      if your connection is slow

after processing the first chunck of data that arrived
the video player will display a loading spinner
which indicates it is waiting for more data to arrive

-------------------------------------------------------------------------

once the buffer is filled up and the data is processed
the video player shows the video

while the video is playing
more data will continue to arrive and wait in the buffer
```

<Br><Br>

`what is connection between binary data, character set and encoding to buffers?`

```js
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
```
