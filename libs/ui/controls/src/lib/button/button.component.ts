import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Output() customClick = new EventEmitter<MouseEvent>();

  public onClick(event: MouseEvent) {
    this.customClick.emit(event);
  }

  @Input() isPrimary: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() label: string = '';

  // @HostBinding('class.primary') get primary() {
  //   return this.isPrimary;
  // }

  // @HostBinding('class.disabled') get disabled() {
  //   return this.isDisabled;
  // }
}
