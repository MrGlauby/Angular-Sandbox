import { Component, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@angular-concepts-sandbox/controls';

@Component({
  selector: 'lib-homepage',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {
  public fizzBuzzList: (string | number)[] = []; // Hier wird die Liste gespeichert

  public onSubmit(event?: MouseEvent): void {
    const limit: number = 25;
    const resultList: (string | number)[] = [];

    for (let i = 1; i <= limit; i++) {
      if (i % 3 === 0 && i % 5 === 0) {
        resultList.push('fizzbuzz');
      } else if (i % 3 === 0) {
        resultList.push('fizz');
      } else if (i % 5 === 0) {
        resultList.push('buzz');
      } else {
        resultList.push(i);
      }
    }
    this.fizzBuzzList = resultList;
    console.log(resultList);
  }
}
