// Var is function or global scoped, this would print 5 always
for (var i = 1; i <= 4; i++) {
    setTimeout(function () {
        console.log(i);
    }, i * 1000);
}

// Before ES6, we could use IIFE to fix this issue, print 1,2,3,4
for (var i = 1; i <= 4; i++) {
    (function (j) {
        setTimeout(function () {
        console.log(j);
        }, j * 1000);
    })(i);
}

// Now block scoping via let would make it easier
for (let i = 1; i <= 4; i++) {
    setTimeout(function () {
        console.log(i);
    }, i * 1000);
}

// Another example
for (var i = 0; i < 2; i++) {
    const button = document.createElement("button");
    button.innerText = `Button ${i}`;
    button.onclick = function () {
      console.log(i); // prints 2 everytime
    };
    document.body.appendChild(button);
  }
console.log(i); // 2

for (var i = 0; i < 2; i++) {
    const button = document.createElement("button");
    button.innerText = `Button ${i}`;
    button.onclick = (function (j) {
      return () => console.log(j); // prints 0 or 1 depending on button
    })(i);
    document.body.appendChild(button);
  }
console.log(i); // 2

// Example

function printA() {
    console.log(answer);
    var answer = 1; // function scoped, hoisted
  }
  printA(); // undefined
  printA(); // undefined
