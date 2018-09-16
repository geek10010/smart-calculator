class SmartCalculator {
  constructor(initialValue) {
    this.expr = [+initialValue];
  }

  add(number) {
    this.expr.push('+');
    this.expr.push(+number);
    return this;
  }
  
  subtract(number) {
    this.expr.push('-');
    this.expr.push(+number);
    return this;
  }

  multiply(number) {
    this.expr.push('*');
    this.expr.push(+number);
    return this;
  }

  devide(number) {
    if (number === 0) {
      return 'Error: zero division!';
    } else {
    this.expr.push('/');
    this.expr.push(+number);
    return this;
    }
  }

  pow(number) {
     this.expr.push('**');
     this.expr.push(+number);
     return this;
  }
  
  toString() {
    // console.log(`${this.expr}`);

    const chooseOperation = (a, b = -1) => {
      if (a > 0 && b > 0) {
        return Math.min(a, b);
      }
      return Math.max(a, b);
    };

    const findOper = (operator1, operator2) => {
      if (operator1 === '**') {
        return this.expr.lastIndexOf(operator1);
      }

      return chooseOperation(this.expr.indexOf(operator1),
      this.expr.indexOf(operator2));
    };

    const calculate = (position) => {
      let operation = this.expr[position];
      let a = this.expr[position - 1];
      let b = this.expr[position + 1];
      if (operation === '**') return a ** b;
      if (operation === '*') return a * b;
      if (operation === '/') return a / b;
      if (operation === '+') return a + b;
      if (operation === '-') return a - b;
    };

    
    // applyOperators('**');
    let currentOperatorPosition;
    currentOperatorPosition = findOper('**');

    while (currentOperatorPosition > 0) {
      let tempResult = calculate(currentOperatorPosition);
      this.expr.splice(currentOperatorPosition - 1, 3, tempResult);
      currentOperatorPosition = findOper('**');
    }


    // applyOperators('*','/');
    currentOperatorPosition = findOper('*','/');

    while (currentOperatorPosition > 0) {
      let tempResult = calculate(currentOperatorPosition);
      this.expr.splice(currentOperatorPosition - 1, 3, tempResult);
      currentOperatorPosition = findOper('*','/');
    }


    // applyOperators('+','-');
    currentOperatorPosition = findOper('+','-');

    if (currentOperatorPosition > 0) {
      while (currentOperatorPosition > 0) {
        let tempResult = calculate(currentOperatorPosition);
        this.expr.splice(currentOperatorPosition - 1, 3, tempResult);
        currentOperatorPosition = findOper('+','-');
      }
    }

    // console.log(`result: ${this.expr}`);

    return this.expr[0];
  }
};

module.exports = SmartCalculator;
