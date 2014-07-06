// literał obiektowy
var empty_object = {};
var stooge = {
    "first-name": "Joe",
    "last-name": "Howard"
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

//pobieranie
console.log(flight.departure.IATA);    // "SYD" 
console.log(stooge["first-name"]);     // "Joe"

//próba pobrania nieistniejącej wartości
console.log(stooge["middle-name"]);    // undefined
console.log(flight.status);            // undefined
console.log(stooge["FIRST-NAME"]);     // undefined


// ustawianie wartości domyśnlej operatorem ||
console.log(stooge["middle-name"] || "(none)");
console.log(flight.status || "unknown");

// uchronienie się operatorem && przed wyjątkiem TypeError podczas próby pobrania wartości z undefined
console.log(flight.equipment);			// undefined
//flight.equipment.model;	// wyjątek "TypeError"
console.log(flight.equipment && flight.equipment.model); // undefined
	
console.log("====================================");
//modyfikacja

//nadpisanie wartości
stooge['first-name'] = 'Jerome';
console.log(stooge['first-name']);

//dodanie wartości
stooge['middle-name'] = 'Lester';
flight.equipment = {
    model: 'Boeing 777'
};
flight.status = 'overdue';

console.log(flight.equipment.model);

console.log("====================================");
//referencja

var x = stooge;
x.nickname = 'Curly';
var nick = stooge.nickname;
// nick ma wartość 'Curly', ponieważ x oraz stooge
//odnoszą się do tego samego obiektu
console.log(nick);
   
var a = {}, b = {}, c = {};
   // a, b, c odnoszą się 
   // do niezależnych pustych obiektów
a = b = c = {};
   // a, b, c odnoszą się
   // do tego samego pustego obiektu

console.log("====================================");
//prototyp

if (typeof Object.beget !== 'function') {
     Object.beget = function (o) {//tworzy nowy obiekt, używająć o jako prototypu
         var F = function () {};
         F.prototype = o;
         return new F();
     };
}
var another_stooge = Object.beget(stooge);

//prototyp pozostaje niezmieniony
another_stooge['first-name'] = 'Harry';
another_stooge['middle-name'] = 'Moses';
another_stooge.nickname = 'Moe';

console.log(another_stooge['first-name'] + " " + another_stooge['middle-name'] + " " + another_stooge.nickname);
console.log(stooge['first-name'] + " " + stooge['middle-name'] + " " + stooge.nickname);

//związki prototypowe są dynamiczne
stooge.profession = 'actor';
console.log(another_stooge.profession);    // 'actor'

console.log("====================================");
//refleksja

console.log(typeof flight.number);      // 'number'
console.log(typeof flight.status);      // 'string'
console.log(typeof flight.arrival);     // 'object'
console.log(typeof flight.manifest);    // 'undefined'
        
// właściwości z prototypów
console.log(typeof flight.toString);    // 'function'
console.log(typeof flight.constructor); // 'function'    
    
// funkcja hasOwnProperty nie przeszukuje łańcucha prototypów
console.log(flight.hasOwnProperty('number'));         // true
console.log(flight.hasOwnProperty('constructor'));    // false
    
    
console.log("====================================");
//wyliczenie

var name;
for (name in another_stooge) {//wszystkie właściwości i funkcję, także z prototypów w losowej kolejności
    if (typeof another_stooge[name] !== 'function') {
        console.log(name + ': ' + another_stooge[name]);
    }
}

console.log("===================================="); 
// wyliczenie interesujących nas właściwości w wymaganym porządku    
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

console.log("====================================");    
// usuwanie

console.log(another_stooge.nickname);  // 'Moe'

// Usuwamy właściwość nickname z another_stooge, odsłaniając
// właściwość nickname prototypu.
delete another_stooge.nickname;

console.log(another_stooge.nickname);  // 'Curly'
    
console.log("====================================");
// ograniczanie liczby zmiennych globalnych

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