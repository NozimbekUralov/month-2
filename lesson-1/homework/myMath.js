function add(a, b) {
    const res = a + b;
    console.log(res);
    return res;
}
function subtract(a, b) {
    const res = a - b;
    console.log(res);
    return res;
}

module.exports = {
    add,
    subtract
};