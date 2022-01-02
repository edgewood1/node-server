
const fetch = require('node-fetch');

// use this if theres only one
// module.exports = async () => {
//   return await fetch('https://jsonplaceholder.typicode.com/todos/1')
//   .then(response => response.json())
//   .then(json => json)
// }

// else use this
const caller = async () => {
  return await fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => json)
}

const hi = async () => {
  console.log('hi')
}

module.exports = {
  caller, hi
}
 

// originally the above function was called "caller", 
// and we used this
// module.exports = caller;
// then const x = require(./routes/api);
// but this x.caller doesn't work
// instead x()
// so caller pointless - it was just an internal reference
