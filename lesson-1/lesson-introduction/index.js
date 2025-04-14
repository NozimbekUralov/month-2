Promise.any([
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 1000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then((d) => console.log(d));

class Animal {
    constructor(name) {
        this.name = name;
    }
    feed() {
        console.log(this.name + " is fed!");
    }
}

class Cat extends Animal {
    constructor(name) {
        super(name);
    }
}

class Dog extends Animal {
    constructor(name) {
        super(name);
    }
}

class Bird extends Animal {
    constructor(name) {
        super(name);
    }
}

const cat = new Cat("Cat");
const dog = new Dog("Dog");
const bird = new Bird("Bird");
cat.feed();
dog.feed();
bird.feed();

class MyMath {
    static add(a, b) {
        return a + b;
    }
    static subtract(a, b) {
        return a - b;
    }
}
console.log(MyMath.add(1, 2));
console.log(MyMath.subtract(1, 2));

class Person {
    #age;
    constructor(name) {
        this.name = name;
    }

    get age() {
        return this.#age;
    }

    set age(age) {
        if (age < 0) {
            throw new Error("Age cannot be negative");
        }
        this.#age = age;
    }
}