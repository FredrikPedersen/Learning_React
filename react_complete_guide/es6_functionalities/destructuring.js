//Destructuring an array
const numbers = [1, 2, 3];
[num1, , num3] = numbers;
console.log(num1, num3);

//Destructuring an object
const {name} = {name: 'Fredrik', age: 28};
console.log(name);
console.log(age); //Not defined