// Function.prototype.bind is a method on all function objects that allows us
// to hard-bind a function to a particular object. The way this works is that
// you pass a context object to the bind method and it returns a new function
// that is essentially the same function but hard-bound to the context object
// supplied.

// Create a function myBind, that accepts two arguments: 1)
// The function to bind, 2) The context object, and returns a
// new function that's hard-bound to the passed in context object.

function myBind(context, func) {
  // since arrow function don't have arguments
  // we use ...(rest) parameter
  return (...args) =>{
    // we pass args incase the func takes argument
    // so we need to capure it
    return func.apply(context, args);
  }
}

const johnDoe = {
  name: 'John Doe'
}

function greet(greeting) {
  console.log(`${greeting} ${this.name}!`);
}

const greetJohnDoe = myBind(johnDoe, greet);
greetJohnDoe('Hi'); // Hi John Doe!
greetJohnDoe('Hello'); // Hello John Doe!
greetJohnDoe('Hola'); // Hola John Doe!