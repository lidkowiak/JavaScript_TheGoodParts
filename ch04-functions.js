console.log("=== Function Literal ===");

// Create a variable called add and store a function in it that adds two numbers.
var add = function (a, b) {
   return a + b;
};
console.log(add(2, 3));    
    
console.log("=== The Method Invocation Pattern ===");
// method is a function stored as property of an object
// this is bound to that object

// Create myObject. It has a value and an increment
// method. The increment method takes an optional
// parameter. If the argument is not a number, then 1
// is used as the default.
var myObject = {
   value: 0,
   
   increment: function (inc) {
      this.value += typeof inc === 'number' ? inc : 1;
   }
};

myObject.increment();
console.log(myObject.value);  // 1

myObject.increment(2);
console.log(myObject.value);  // 3
    
console.log("=== The Function Invocation Pattern ===");
// when function is not the property of an object, 
// then it is invoked as a function 
// this is bound to the global object - MISTAKE IN THE DESIGN OF THE LANGUAGE
var sum = add(3, 4);  // 7
console.log(sum);    
    
// augment myObject with a double method.
myObject.double = function () {
   var that = this;    // workaround
   
   var helper = function () { // this is bound to the global object
      that.value = add(that.value, that.value);
   };
   
   helper();   // invoke helper as a function.
};

myObject.double();  // invoke double as a method.
console.log(myObject.value);  // 6

    
console.log("=== The Constructor Invocation Pattern ===");
// If a function is invoked with the new prefix, then a new object will be created with a
// hidden link to the value of the function’s prototype member, and this will be bound
// to that new object.

// create a constructor function called Quo
// it makes an object with a status property
var Quo = function (string) {
   this.status = string;
};

// give all instances of Quo a public method called get_status
Quo.prototype.get_status = function () {
   return this.status;
};

// make an instance of Quo.
var myQuo = new Quo("confused");

console.log(myQuo.get_status());  // confused
    
console.log("=== The Apply Invocation Pattern ===");
// The apply method lets us construct an array of arguments to use to invoke a function (second parameter)
// and choose the value of this (first parameter)

// make an array of 2 numbers and add them.
var array = [3, 4];
var sum = add.apply(null, array); 
console.log(sum); // 7

// make an object with a status member
var statusObject = {
   status: 'A-OK'
};

// statusObject does not inherit from Quo.prototype,
// but we can invoke the get_status method on
// statusObject even though statusObject does not have
// a get_status method.

var status = Quo.prototype.get_status.apply(statusObject);
console.log(status); // A-OK
    
console.log("=== Arguments ===");
// arguments is an array-like object that is available to functions when they are invoked

// Make a function that adds a lot of stuff.

// Note that defining the variable sum inside of
// the function does not interfere with the sum
// defined outside of the function. The function
// only sees the inner one.
var sum = function () {
   var i, sum = 0;
   for (i = 0; i < arguments.length; i += 1) {
      sum += arguments[i];
   }
   return sum;
};
console.log(sum(4, 8, 15, 16, 23, 42));  // 108
    
console.log("=== Return ===");
// A function always returns a value. 
// If the return value is not specified, then undefined is returned.
// If the function was invoked with the new prefix and the return value is not an object, then this (the new object) is returned instead.

console.log("=== Exceptions ===");

var add = function (a, b) {
   if (typeof a !== 'number' || typeof b !== 'number') {
      throw {
         name: 'TypeError',
         message: 'add needs numbers'
      }
   }
   return a + b;
}
    
// Make a try_it function that calls the new add function incorrectly.
var try_it = function () {
   try {
      add("seven");
   } catch (e) {
      console.log(e.name + ': ' + e.message);
   }
}

try_it();
      
console.log("=== Augmenting Types ===");
// JavaScript allows the basic types of the language to be augmented

// augmenting Function.prototype with a method method, so no longer have to type the name of the prototype property
Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};
// adding an integer method to Number.prototype    
Number.method('integer', function (  ) {
    return Math[this < 0 ? 'ceil' : 'floor'](this);
});
console.log((-10 / 3).integer());  // −3
      
String.method('trim', function (  ) {
    return this.replace(/^\s+|\s+$/g, '');
});
console.log('"' + "   neat   ".trim(  ) + '"');
    
// add a method conditionally
Function.prototype.method = function (name, func) {
    if (!this.prototype[name]) {
        this.prototype[name] = func;
    }
};
    
console.log("=== Recursion ===");

var hanoi = function (disc, src, aux, dst) {
    if (disc > 0) {
        hanoi(disc - 1, src, dst, aux);
        console.log('Move disc ' + disc +
            ' from ' + src + ' to ' + dst);
        hanoi(disc - 1, aux, src, dst);
    }
};

hanoi(3, 'Src', 'Aux', 'Dst');
    
// Move disc 1 from Src to Dst
// Move disc 2 from Src to Aux
// Move disc 1 from Dst to Aux
// Move disc 3 from Src to Dst
// Move disc 1 from Aux to Src
// Move disc 2 from Aux to Dst
// Move disc 1 from Src to Dst
    
    
console.log("===");

// Define a walk_the_DOM function that visits every
// node of the tree in HTML source order, starting
// from some given node. It invokes a function,
// passing it each node in turn. walk_the_DOM calls
// itself to process each of the child nodes.
var walk_the_DOM = function walk(node, func) {
   func(node);
   node = node.firstChild;
   while (node) {
      walk(node, func);
      node = node.nextSibling;
   }
};

// Define a getElementsByAttribute function. It
// takes an attribute name string and an optional
// matching value. It calls walk_the_DOM, passing it a
// function that looks for an attribute name in the
// node. The matching nodes are accumulated in a
// results array.
var getElementsByAttribute = function (att, value) {
   var results = [];

   walk_the_DOM(document.body, function (node) {
      var actual = node.nodeType === 1 && node.getAttribute(att);
      if (typeof actual === 'string' && 
        (actual === value || typeof value !== 'string')) {
         results.push(node);
      }
   });

   return results;
};
    
console.log(getElementsByAttribute("src", "ch04-functions.js")[0]);
    
console.log("===");

// Make a factorial function with tail
// recursion. It is tail recursive because
// it returns the result of calling itself.
// JavaScript does not currently optimize this form.
var factorial = function factorial (i, a) {
   a = a || 1;
   if (i < 2) {
      return a;
   }
   return factorial(i - 1, a * i);
};

console.log(factorial(4));  // 24
    
    
console.log("=== Function Scope ===");
// The parameters and variables defined in a function are not visible outside of the function,
// and a variable defined anywhere within a function is visible everywhere within the function.
// Declare all of the variables used in a function at the top of the function body!

var foo = function () {
   var a = 3, b = 5;

   var bar = function () {
     var b = 7, c = 11;
     console.log('2: a = ' + a + ', b = ' + b + ', c = ' + c); // a = 3, b = 7, c = 11
     
     a += b + c;
     console.log('3: a = ' + a + ', b = ' + b + ', c = ' + c); // a = 21, b = 7, c = 11
   }; 

   console.log('1: a = ' + a + ', b = ' + b); // a = 3, b = 7, c is not defined 
   
   bar();
   console.log('4: a = ' + a + ', b = ' + b); // a = 21, b = 5

};

foo();
    
    
console.log("=== Closure ===");
// function has access to the context in which it was created, this is called closure

var myObject = function () {
    var value = 0; // available to the increment and getValue methods and hidden to the rest of the program

    return { //returns an object containing two methods
        increment: function (inc) {
            value += typeof inc === 'number' ? inc : 1;
        },
        getValue: function () {
            return value;
        }
    }
}();
    
// Create a maker function called quo. It makes an
// object with a get_status method and a private
// status property.
var quo = function (status) {
   return {
      get_status: function () {
         return status;
      }
   };
};

// Make an instance of quo.
var myQuo = quo("amazed");
console.log(myQuo.get_status());
    
// Define a function that sets a DOM node's color
// to yellow and then fades it to white.
var fade = function (node) {
   var level = 1;
   var step = function () {
      var hex = level.toString(16);
      node.style.background = '#FFFF' + hex + hex;
      if (level < 15) {
         level += 1;
         setTimeout(step, 100);
      }
   };
   setTimeout(step, 100);
};
fade(document.body);
    
// inner function has access to the actual variables of the outer functions!

// The add_the_handlers function was intended to give each handler a unique number (i)    

// BAD EXAMPLE
// Make a function that assigns event handler functions to an array of nodes the wrong way.
// When you click on a node, an alert box is supposed to display the ordinal of the node.
// But it always displays the number of nodes instead.
var add_the_handlers = function (nodes) {
   var i;
   for (i = 0; i < nodes.length; i += 1) {
      nodes[i].onclick = function (e) {
         alert(i);  // fails because the handler functions are bound to the variable i, 
                    // not the value of the variable i at the time the function was made
      }
   }
};
// END BAD EXAMPLE

// BETTER EXAMPLE
// Make a function that assigns event handler functions to an array of nodes the right way.
// When you click on a node, an alert box will display the ordinal of the node.
var add_the_handlers = function (nodes) {
   var i;
   for (i = 0; i < nodes.length; i += 1) {
      nodes[i].onclick = function (i) { // define a function
         return function (e) { // assigned to onclick
            alert(i);
         };
      }(i);  // immediately invoke it, passing in i.
   }
};

    
console.log("=== Callbacks ===");

// Example: sequence that begins with a user interaction, 
// making a request of the server, 
// and finally displaying the server’s response

// naive approach
// request = prepare_the_request(  );
// response = send_request_synchronously(request); // client is blocked
// display(response);

// better approach - an asynchronous request, providing a callback function
// that will be invoked when the server’s response is received
// request = prepare_the_request(  );
// send_request_asynchronously(request, function (response) {
//         display(response);
//     });
    
console.log("=== Module ===");
// module is a function that defines private variables and functions;
// creates privileged functions which, through closure, will have access to the private
// variables and functions; and that returns the privileged functions or stores them
// in an accessible place

// augment String with a deentityify method that looks for HTML entities in a string 
// and replace them with their equivalents
String.method('deentityify', function () {

   // The entity table in a closure. 
   // It maps entity names to characters
   var entity = { // it is private, only the deentityify method has access to it
      quot: '"',
      lt: '<',
      gt: '>'
   };

   // Return the deentityify method
   return function () {

      // This is the deentityify method. It calls the string
      // replace method, looking for substrings that start
      // with '&' and end with ';'. If the characters in
      // between are in the entity table, then replace the
      // entity with the character from the table. It uses
      // a regular expression (Chapter 7).

      return  this.replace( /&([^&;]+);/g, 
         function (a, b) {
            var r = entity[b];
            return typeof r === 'string' ? r : a;
         }
      );    
   };
}());
    
console.log('&lt;&quot;&gt;'.deentityify(  ));  // <">
    
console.log("===");

// an object that produces a serial number
var serial_maker = function () {

    // Produce an object that produces unique strings. A
    // unique string is made up of two parts: a prefix
    // and a sequence number. The object comes with
    // methods for setting the prefix and sequence
    // number, and a gensym method that produces unique
    // strings.
    
   var prefix = '';
   var seq = 0;
   return {
      set_prefix: function (p) {
         prefix = String(p);
      },
      set_seq: function (s) {
         seq = s;
      },
      gensym: function () {
         var result = prefix + seq;
         seq += 1;
         return result;
      }
   };
};

var seqer = serial_maker();
seqer.set_prefix('Q');
seqer.set_seq(1000);

console.log(seqer.gensym()); // 'Q1000'  
console.log(seqer.gensym()); // 'Q1001'  
    
console.log("=== Cascade ===");
// if methods return this instead of undefined, we can enable cascades. 
// In a cascade, we can call many methods on the same object in sequence in a single statement.

// getElement('myBoxDiv').
//   move(350, 150).
//   width(100).
//   height(100).
//   color('red').
//   border('10px outset').
//   padding('4px').
//   appendText("Proszę czekać").
//   on('mousedown', function (m) {
//      this.startDrag(m, this.getNinth(m));
//   }).
//   on('mousemove', 'drag').
//   on('mouseup', 'stopDrag').
//   later(2000, function () {
//      this.
//        color('yellow').
//        setHTML('Halo!').
//        slide(400, 40, 200, 200);
//   }).
//   tip('This box is resizeable');
    
    
console.log("=== Curry ===");
// producing a new function by combining a function and an argument 
 
Function.method('curry', function () {
    var slice = Array.prototype.slice,
        args = slice.apply(arguments), // arguments is not an array, so it does not have the concat method.
        that = this;
    return function (  ) {
        return that.apply(null, args.concat(slice.apply(arguments)));
    };
});

var add1 = add.curry(1);
console.log(add1(6));    // 7
    
console.log("=== Memoization ===");
// memoization - optimization, remembering the results of previous operations, 
// making it possible to avoid unnecessary work

var fibonacci = function (n) {
    return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
};
// fibonacci called 453 times 
for (var i = 0; i <= 10; i += 1) {
    console.log('// ' + i + ': ' + fibonacci(i));
}
// 0: 0
// 1: 1
// 2: 1
// 3: 2
// 4: 3
// 5: 5
// 6: 8
// 7: 13
// 8: 21
// 9: 34
// 10: 55
    
var fibonacci = function () {
    var memo = [0, 1]; // keep our memoized results
    var fib = function (n) {
        var result = memo[n];
        if (typeof result !== 'number') {
            result = fib(n - 1) + fib(n - 2);
            memo[n] = result;
        }
        return result;
    };
    return fib;
}();
// fibonacci called 29 times 
for (var i = 0; i <= 10; i += 1) {
    console.log('// ' + i + ': ' + fibonacci(i));
}
    
    
// general approach
var memoizer = function (memo, fundamental) {
    var shell = function (n) {
        var result = memo[n];
        if (typeof result !== 'number') {
            result = fundamental(shell, n);
            memo[n] = result;
        }
        return result;
    };
    return shell;
};
    
var fibonacci = memoizer([0, 1], function (shell, n) {
    return shell(n - 1) + shell(n - 2);
});
// fibonacci called 29 times 
for (var i = 0; i <= 10; i += 1) {
    console.log('// ' + i + ': ' + fibonacci(i));
}    
    

var factorial = memoizer([1, 1], function (shell, n) {
    return n * shell(n - 1);
});

console.log("5! = " + factorial(5));
