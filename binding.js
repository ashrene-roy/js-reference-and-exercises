// 1
// Global scope
setTimeout(() => {
    console.log(`This value in Arrow fn callback: ${JSON.stringify(this)}`);
}, 1000);

setTimeout(function() {
    console.log(`This value in normal fn callback: ${JSON.stringify(this)}`);
}, 1000);

const arrow = () => {
    console.log(`This value in arrow fn callback defined in global scope: ${JSON.stringify(this)}`);
}

function normal () {
    console.log(`This value in normal fn callback defined in global scope: ${JSON.stringify(this)}`);
}

setTimeout(arrow, 1000);
setTimeout(normal, 1000);

// Explicit binding
setTimeout(arrow.bind({binding: "xyz"}), 1000);
setTimeout(normal.bind({binding: "xyz"}), 1000);

// 2
// Object
const bearFamily = {
    
    cub: {
        name: 'cub',
        hobby: function () {
            // console.log(this); This = cub object
            setTimeout(() => {
                console.log(this.name + ' likes eating blueberries');
                // console.log(this); This = cub object which is the value inherited from the parent-this of this arrow function
            }, 2000);
        }
    },

    mamaBear: {
        name: 'mama',
        hobby: () => {
            // console.log(this); Arrow function looks for parent-this value which is global/window object
            setTimeout(() => {
                console.log(this.name + ' likes fake charging');
                // console.log(this); Arrow function looks for parent-this value which is global/window object
            }, 3000);
        }
    },

    grizzly: {
        name: 'grizz',
    }
}
function hobby () {
    // console.log(this); //this value depends on how function is called - implicit binding or explicit binding
    setTimeout(() => {
        console.log(this.name + ' likes mauling');
        // console.log(this); //Arrow function just looks for parent-this value which depends on how function above is called
    }, 4000);
}


bearFamily.cub.hobby();
bearFamily.mamaBear.hobby();

bearFamily.grizzly.hobby = hobby;
bearFamily.grizzly.hobby();

hobby();

// 3

const arrowCallback = (cb) => {
    console.log(this);
    if(cb) cb();
}

function normalCallback(cb) {
    console.log(this);
    if(cb) cb();
}

const nested = () => {
    console.log("\nPart 1");
    console.log(this);
    normalCallback(
        arrowCallback
    );
    normalCallback(
        () => console.log(this)
    );
    console.log("\nPart 2");
    console.log(this);
    normalCallback.call({bind: "abc"},
        arrowCallback
    );
    normalCallback.call({bind: "abc"},
        () => console.log(this)
    );
    console.log("\nPart 3");
    console.log(this);
    normalCallback(
        arrowCallback
    );
}

nested();

// 4
function logThis() {
    this.desc = 'logger';
    console.log(this);
  }
new logThis(); // Using new makes logThis like a constructor

// 5
let bear = {
    sound: 'roar',
    roar() {
      console.log(this.sound);
    },
  };
  
  bear.sound = 'grunt';
  let bearSound = bear.roar;
  bearSound(); // undefined
  bear.roar(); // grunt
  