const countBy = (start, count) => {
    const res = [];
    for (let i = start; i <= count * start; i += start) res.push(i);
    return res;
}
// console.log(countBy(2, 5));

const myFunc = (arr) => arr.filter((val) => val % 2 === 0);
// console.log(myFunc([1, 2, 3, 4, 5, 6]));

const getSum = (arr) => arr.flat(Infinity).reduce((acc, val) => acc + val, 0);
// console.log(getSum([[1, 2], [3, 4]]));

const getMax = (arr) => Math.max(...arr);
// console.log(getMax([22, 55, 33, 130, 11, 66, 123]));

const filterArr = (arr) => arr.filter(val => val % 3 == 0 || val % 5 == 0);
// console.log(filterArr([1, 3, 5, 10, 15, 20, 22]));

const editArr = (arr) => arr.map(val => val.toUpperCase());
// console.log(editArr(["salom", "nima", "gap"]));

const countLetters = (arr) => arr.reduce((acc, val) => acc += val.trim().length, 0);
// console.log(countLetters(["nimdur", "gap"]));

const sortArr = (arr) => arr.sort((a, b) => a.length - b.length);
// console.log(sortArr(["cat", "apple", "banana", "car"]));

const filterArray = (arr) => arr.filter(val => val.length > 4);
console.log(filterArray(["pear", "grape", "melon", "kiwi", "banana"]));

const firstLetters = (arr) => arr.reduce((acc, val) => acc += val[0], "");
console.log(firstLetters(["animal", "needle", "run", "swim"]));