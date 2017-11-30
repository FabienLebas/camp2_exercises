// Add a function `introduceMyself` which takes no arguments and return a little introductory sentence
//
// Example
//
// person.introduceMyself() # => "Hello! I'm Abdel Sadki and I'm 42"
const person = {
  firstname: "Abdel",
  lastname: "Sadki",
  age: 42,
  fullname: function() {
    return `${this.firstname} ${this.lastname}`;
  },
  introduceMyself: function() {
    return `Hello! I'm ${this.firstname} ${this.lastname} and I'm ${this.age}`;
  }
}

console.log(person.introduceMyself());

module.exports = person;
