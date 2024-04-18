import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projeto-calculadora';

  expression = '';
  result = '';
  resultProv = 0;
  soma = false;
  multiplicacao = false;
  divisao = false;
  subtracao = false;

  clear() {
    let resultStr = String(this.expression);

    if (resultStr.length > 0) {
      resultStr = resultStr.slice(0, -1);

      if (resultStr.length > 0) {
        this.expression = resultStr;
      } else {
        this.expression = '0';
      }
    }
  }

  clearAll() {
    this.expression = '';
    this.result = '0';
  }

  digit(digita: string) {
    let digitStr = String(digita);
    this.expression += digitStr;
  }

  sum() {
    this.resultProv = parseFloat(this.expression);
    this.expression += ' + ';
  }

  multi() {
    this.resultProv = parseFloat(this.expression);
    this.expression += ' * ';
  }

  divi() {
    this.resultProv = parseFloat(this.expression);
    this.expression += ' / ';
  }

  sub() {
    this.resultProv = parseFloat(this.expression);
    this.expression += ' - ';
  }

  inverte() {
    let inverter = parseFloat(this.expression);
    inverter = -1 * inverter;
    this.expression = String(inverter);
  }

  equal() {
    let expression = this.expression;

    const elements = expression.split(/\s+/);

    const operands = [];
    const operators = [];

    for (let i = 0; i < elements.length; i++) {
      if (i % 2 === 0) {
        operands.push(parseFloat(elements[i]));
      } else {
        while (operators.length > 0 && this.precedence(elements[i]) <= this.precedence(operators[operators.length - 1])) {
          this.calculate(operands, operators);
        }
        operators.push(elements[i]);
      }
    }

    while (operators.length > 0) {
      this.calculate(operands, operators);
    }

    this.result = operands[0].toString();
    this.expression = this.result;
  }

  precedence(operator: string): number {
    switch (operator) {
      case '+':
      case '-':
        return 1;
      case '*':
      case '/':
        return 2;
      default:
        return 0;
    }
  }

  calculate(operands: number[], operators: string[]): void {
    const operand2 = operands.pop();
    const operand1 = operands.pop();
  
    if (operand1 === undefined || operand2 === undefined) {
      console.error('Erro: Operandos inválidos');
      return;
    }
  
    const operator = operators.pop();
  
    switch (operator) {
      case '+':
        operands.push(operand1 + operand2);
        break;
      case '-':
        operands.push(operand1 - operand2);
        break;
      case '*':
        operands.push(operand1 * operand2);
        break;
      case '/':
        operands.push(operand1 / operand2);
        break;
      default:
        break;
    }
  }  
}
