import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projeto-calculadora';

  result = '';
  resultProv = 0;
  soma = false;
  multiplicacao = false;
  divisao = false;
  subtracao = false;

  clear(){
    let resultStr = String(this.result);

    if(resultStr.length > 0){
      resultStr = resultStr.slice(0, -1);

      if (resultStr.length > 0) {
        this.result = resultStr;
      } else {
        this.result = '0';
      }
    }
  }
  clearAll(){
    this.result = '0';
  }

  digit(digita: string){
    let resultStr = String(this.result);
    let digitStr = String(digita);  

    if (resultStr == '0' && digitStr != '0'){
      resultStr = resultStr.slice(0, -1);
    }
    if (digitStr == '.' && resultStr == ''){
      resultStr = '0';
    }
    let concat = resultStr.concat(digitStr);

    this.result = concat;
  }

  sum(){
    this.resultProv = parseFloat(this.result);
    this.result = '';  
    this.soma = true;
  }

  multi(){
    this.resultProv = parseFloat(this.result);
    this.result = '';  
    this.multiplicacao = true;
  }

  divi(){
    this.resultProv = parseFloat(this.result);
    this.result = '';  
    this.divisao = true;
  }

  sub(){
    this.resultProv = parseFloat(this.result);
    this.result = '';  
    this.subtracao = true;
  }

  inverte(){
    let inverter = parseFloat(this.result); 
    inverter = -1 * inverter;
    this.result = String(inverter); 
  }

  equal(num: string){
    num = this.result;

    if(num != ''){
      if(this.multiplicacao == true){
        let finalMult = parseFloat(num) * this.resultProv;
        this.result = String(finalMult);
        this.resultProv = parseFloat(this.result);
        this.multiplicacao = false;
      }else if(this.divisao == true){
        let finalDiv = this.resultProv / parseFloat(num); // Invertendo a ordem dos operandos
        this.result = String(finalDiv);
        this.resultProv = finalDiv;
        this.divisao = false;
      }else if(this.soma == true){
        let finalSum = parseFloat(num) + this.resultProv;
        this.result = String(finalSum);
        this.resultProv = parseFloat(this.result);
        this.soma = false;
      }else if(this.subtracao == true){
        let finalSub = this.resultProv - parseFloat(num);
        this.result = String(finalSub);
        this.resultProv = parseFloat(this.result);
        this.subtracao = false;
      }
    }else{
      num = '';
    }
  }
}
