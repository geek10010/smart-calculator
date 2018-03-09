class SmartCalculator {
  constructor(initialValue) {
    this.expression = +initialValue.toString();
  }

  add(number) {
    this.expression += " + " + +number;
    return this;
  }
  
  subtract(number) {
    this.expression += " - " + +number;
    return this;
  }

  multiply(number) {
    this.expression += " * " + +number;
    return this;
  }

  devide(number) {
    if (number === 0) {
      return 'Error: zero division!';
    } else {
    this.expression += " / " + +number;
    return this;
    }
  }

  pow(number) {
     this.expression += " ** " + +number;
     return this;
  }
  
  toString() {
    //this.result = Math.round(eval(this.expression));
    //console.log(`${this.expression} = ${this.result}`);
    //return this.result;
    return Math.round(eval(this.expression));
  }
}

module.exports = SmartCalculator;
