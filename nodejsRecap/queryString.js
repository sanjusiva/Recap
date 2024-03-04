const querystring = require('querystring');
let str="Hi friends"
let obj={greet:"hi"}

//both are same
console.log(querystring.decode(str))
console.log(querystring.parse(str))

//both are same
console.log(querystring.encode(obj))
console.log(querystring.stringify(obj))

const qs = 'name=John&name=Sanju&age=30&city=NewYork';
const parsedQuery = querystring.parse(qs);
console.log(parsedQuery);

const myObject = {
    name: 'John',
    age: 30,
    city: 'NewYork'
  };
  const myQS = querystring.stringify(myObject);
  
  console.log(myQS);

//   parse nested obj
// array parse
//implement event emitter-- & real usage
//stream implement fe->send stream be->capture and save it in a folder


//nested object parse
const person = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
  address: {
    street: '123 Main Street',
    city: 'Anytown',
    zipCode: '12345'
  },
  contacts: {
    email: 'john.doe@example.com',
    phone: '555-1234'
  }
};
const flattenObject = (obj, parentKey = '') => {
  return Object.keys(obj).reduce((acc, key) => {
    const newKey = parentKey ? `${parentKey}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      console.log("ff: ",obj[key])
      return { ...acc, ...flattenObject(obj[key], newKey) };
    } else {
      return { ...acc, [newKey]: obj[key] };
    }
  }, {});
};
const flattenedObject = flattenObject(person);
console.log("flat: ",flattenedObject)
const queryString = querystring.stringify(flattenedObject);
console.log(queryString);

let arr=[1,2,3]
console.log(querystring.parse(arr))
console.log(querystring.stringify(arr))
