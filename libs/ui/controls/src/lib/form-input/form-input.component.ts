import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-form-input',
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.css',
  providers: [CommonModule],
})
export class FormInputComponent {
  @Input() value: number = 0;
  @Input() placeholder: string = '';
  @Input() isReadonly: boolean = false; 
  @Input() unit: string ='';
  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();

  public onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const newValue = parseInt(target.value, 10);
    if (!isNaN(newValue)) {
      this.valueChange.emit(newValue); // Den neuen Wert an den Parent senden
    } else {
      // Optional: Ungültige Eingabe behandeln, z.B. den alten Wert erneut emitten oder 0
      this.valueChange.emit(this.value); // oder 0
    }
  }
}
