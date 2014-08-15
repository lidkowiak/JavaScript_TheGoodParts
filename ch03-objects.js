console.log("=== Object literals ===");

var empty_object = {};
var stooge = {
    "first-name": "Joe",  // quotes are required, first-name is not legal JavaScript name
    "last-name": "Howard" // quotes are required, last-name is not legal JavaScript name
};

var flight = {
    airline: "Oceanic",
    number: 815,
    departure: {
        IATA: "SYD",
        time: "2008-09-22 14:55",
        city: "Sydney"
    },
    arrival: {
        IATA: "LAX",
        time: "2008-09-23 10:42",
        city: "Los Angeles"
    }
};

console.log("=== Retrieval ===");

console.log(flight.departure.IATA);    // "SYD" 
console.log(stooge["first-name"]);     // "Joe"

// attempt to retrieve a non existent member
console.log(stooge["middle-name"]);    // undefined
console.log(flight.status);            // undefined
console.log(stooge["FIRST-NAME"]);     // undefined


// the || operator can be used to fill in default values
console.log(stooge["middle-name"] || "(none)");
console.log(flight.status || "unknown");

// retrieving values from undefined will throw a TypeError exception, 
// the && operator guards
console.log(flight.equipment);			      // undefined
//flight.equipment.model;	                  // throw "TypeError"
console.log(flight.equipment && flight.equipment.model); // undefined
	
console.log("=== Update ===");

// updating
stooge['first-name'] = 'Jerome';
console.log(stooge['first-name']);

// adding new properties
stooge['middle-name'] = 'Lester';
flight.equipment = {
    model: 'Boeing 777'
};
flight.status = 'overdue';

console.log(flight.equipment.model);

console.log("=== Reference ===");

var x = stooge;
x.nickname = 'Curly';
var nick = stooge.nickname;
// nick is 'Curly', because x and stooge are reference to the same objects
console.log(nick);
   
var a = {}, b = {}, c = {}; // a, b and c each refer to a different empty object 
a = b = c = {}; // a, b and c all refer to the same empty object

console.log("=== Prototype ===");
// Every object is linked to a prototype object from which it can inherit properties. All
// objects created from object literals are linked to Object.prototype, an object that
// comes standard with JavaScript.

if (typeof Object.beget !== 'function') {
     // creates a new object that uses an old object o as its prototype
     Object.beget = function (o) {
         var F = function () {};
         F.prototype = o;
         return new F();
     };
}
var another_stooge = Object.beget(stooge);

// the object’s prototype is not touched
another_stooge['first-name'] = 'Harry';
another_stooge['middle-name'] = 'Moses';
another_stooge.nickname = 'Moe';

console.log(another_stooge['first-name'] + " " + another_stooge['middle-name'] + " " + another_stooge.nickname);
console.log(stooge['first-name'] + " " + stooge['middle-name'] + " " + stooge.nickname);

// the prototype relationship is a dynamic
stooge.profession = 'actor';
console.log(another_stooge.profession);    // 'actor'

console.log("=== Reflection ===");

console.log(typeof flight.number);      // 'number'
console.log(typeof flight.status);      // 'string'
console.log(typeof flight.arrival);     // 'object'
console.log(typeof flight.manifest);    // 'undefined'
        
// any property on the prototype chain can produce a value
console.log(typeof flight.toString);    // 'function'
console.log(typeof flight.constructor); // 'function'    
    
// hasOwnProperty method returns true if the object has a particular property
// does not look at the prototype chain
console.log(flight.hasOwnProperty('number'));         // true
console.log(flight.hasOwnProperty('constructor'));    // false
    
    
console.log("=== Enumeration ===");

// the order of the names is not guarantee
var name;
for (name in another_stooge) { //all of the properties including functions and prototype properties
    if (typeof another_stooge[name] !== 'function') {
        console.log(name + ': ' + another_stooge[name]);
    }
}
console.log("");
// the properties appear in a particular order   
var i;
var properties = [
    'first-name',
    'middle-name',
    'last-name',
    'profession'
];
for (i = 0; i < properties.length; i += 1) {
    console.log(properties[i] + ': ' + another_stooge[properties[i]]);
}

console.log("=== Delete ===");    

console.log(another_stooge.nickname);  // 'Moe'

// Remove nickname from another_stooge, revealing the nickname of the prototype.
delete another_stooge.nickname;

console.log(another_stooge.nickname);  // 'Curly'
    
console.log("===  Global Abatement  ===");

// single global variable becomes the container for application
var MYAPP = {};
   
MYAPP.stooge = {
    "first-name": "Joe",
    "last-name": "Howard"
};

MYAPP.flight = {
    airline: "Oceanic",
    number: 815,
    departure: {
        IATA: "SYD",
        time: "2008-09-22 14:55",
        city: "Sydney"
    },
    arrival: {
        IATA: "LAX",
        time: "2008-09-23 10:42",
        city: "Los Angeles"
    }
};