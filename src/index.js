class SmartCalculator {
  constructor(initialValue) {
    this.data = [+initialValue];
  }

  add(number) {
    this.data.push('+');
    this.data.push(+number);
    return this;
  }

  subtract(number) {
    this.data.push('-');
    this.data.push(+number);
    return this;
  }

  multiply(number) {
    this.data.push('*');
    this.data.push(+number);
    return this;
  }

  devide(number) {
    if (number === 0) {
      return 'Error: zero division!';
    }
    this.data.push('/');
    this.data.push(+number);
    return this;
  }

  pow(number) {
    this.data.push('**');
    this.data.push(+number);
    return this;
  }

  toString() {
    const chooseOperation = (a, b = -1) => {
      if (a > 0 && b > 0) {
        return Math.min(a, b);
      }
      return Math.max(a, b);
    };

    const findOper = (operator1, operator2) => {
      if (operator1 === '**') {
        return this.data.lastIndexOf(operator1);
      }

      return chooseOperation(this.data.indexOf(operator1),
        this.data.indexOf(operator2));
    };

    const calculate = (position) => {
      const operation = this.data[position];
      const a = this.data[position - 1];
      const b = this.data[position + 1];

      if (operation === '**') return a ** b;
      if (operation === '*') return a * b;
      if (operation === '/') return a / b;
      if (operation === '+') return a + b;
      if (operation === '-') return a - b;

      return null;
    };

    const applyOperators = (operator1, operator2) => {
      let currentOperPosition = findOper(operator1, operator2);

      while (currentOperPosition > 0) {
        const tempResult = calculate(currentOperPosition);
        this.data.splice(currentOperPosition - 1, 3, tempResult);
        currentOperPosition = findOper(operator1, operator2);
      }
    };

    applyOperators('**');
    applyOperators('*', '/');
    applyOperators('+', '-');

    return this.data[0];
  }
}

module.exports = SmartCalculator;
