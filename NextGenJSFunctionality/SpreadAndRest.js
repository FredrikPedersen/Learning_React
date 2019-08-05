//Spread
const numbers = [1, 2, 3];
const newNumbersWrong = [numbers, 4];
const newNumbersSpread = [...numbers, 4]; //Usig spread-operator to copy an existing array into a new one, then adding more elements
console.log(newNumbersWrong);
console.log(newNumbersSpread);

const person =  {
    name: 'Fredrik'
};

const newPerson = {
    ...person, //Using spread-operator to copy an existing object's variables into a new one
    age: 25
};

console.log(newPerson);


//Rest
const filter = (...args) => { //Using the rest-operator create a function which can take in any number of arguments, putting them in an array
    return args.filter(el => el === 1);
};

console.log(filter(1,2,3,4,5,6));
console.log(filter("Hello", "There", "General", "Kenobi"));
console.log(filter(5,7,8,2));

