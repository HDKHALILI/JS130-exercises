// Our earlier implementation of Function.prototype.bind as myBind was
// simplistic. Function.prototype.bind has another trick up its sleeve
// besides hard-binding functions to context objects. It's called partial
// function application.

// Alter the myBind function written in the previous exercise to support
// partial function application.

// using function declaration
function myBind(context, func) {
  let partialArgs = Array.from(arguments).slice(2);

  return function() {
    let currentArgs = Array.from(arguments).slice();
    let allArgs = partialArgs.concat(currentArgs);

    return func.apply(context, allArgs);
  }
}

function myBind2(context, func, ...args) {
  return (...restArgs) => {
    return func.call(context, ...args, ...restArgs);
  }
}

function addNumbers(a, b) {
  return a + b;
}

const addFive = myBind(null, addNumbers, 5);

console.log(addFive(10)); // 15

const addTen = myBind2(null, addNumbers, 10);

console.log(addTen(100)); // 110;