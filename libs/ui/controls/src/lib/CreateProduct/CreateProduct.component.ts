import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';




@Component({
  selector: 'lib-create-product',
  templateUrl: './CreateProduct.component.html',
  styleUrl: './CreateProduct.component.css',
  imports: [CommonModule, ReactiveFormsModule],
})
export class CreateProductComponent implements OnInit { 
  
  @Input() placeholder: string = '';
  
  @Output() valueChanged = new EventEmitter<string>(); 
  

  public productFormGroup = new FormGroup({
    name: new FormControl(''),
  });

  ngOnInit(): void {
    this.productFormGroup.get('name')?.valueChanges.subscribe(newValue => {
      this.valueChanged.emit(newValue || '');

    });
  }


}


