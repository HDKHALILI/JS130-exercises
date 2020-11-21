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
    let remainingArgs = Array.from(arguments).slice();
    let allArgs = partialArgs.concat(remainingArgs);

    return func.apply(context, allArgs);
  }
}

function myBind2(context, func, ...args) {
  return (...restArgs) => {
    return func.call(context, ...args, ...restArgs);
  }
}