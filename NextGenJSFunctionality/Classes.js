//Taking a look at how to use classes without constructors and arrow-functions for class methods.

class Human {
    gender = 'Male';

    printGender= () => {
        console.log(this.gender);
    }
}

class Person extends Human {
    name = 'Fredrik';
    gender = 'Female';

    printMyName = () => {
        console.log(this.name);
    }
}

const person = new Person();
person.printMyName();
person.printGender();