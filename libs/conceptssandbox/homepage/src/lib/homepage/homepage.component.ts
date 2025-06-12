import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductServiceTsService } from '../service/product.service.ts.service';
import { Product } from '../models/product.interface';
import { ButtonComponent } from '@angular-concepts-sandbox/controls';
import { FormInputComponent } from '@angular-concepts-sandbox/controls';
import { CreateProductComponent } from '@angular-concepts-sandbox/controls';

// export * from './lib/CreateProduct/CreateProduct.component';

@Component({
  selector: 'lib-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
  imports: [
    CommonModule,
    ButtonComponent,
    FormInputComponent,
    CreateProductComponent,
  ],
})
export class HomepageComponent {
  // FizzBuzz!-------------------------------------------------
  // <!--
  // Create a program that introducing a number it return a list that starts on 1 and ends with that number. Every time a number in that list is divisible by 3 replace the number with "fizz". Every time a number is divisible by 5 replace the number with "buzz".
  // When a number is divisible between 3 and 5 at the same time replace with "fizzbuzz". -->
  // <!--
  // Erstellen Sie ein Programm, das eine Zahl einführt und eine Liste zurückgibt, die bei 1 beginnt und mit dieser Zahl endet. Jedes Mal, wenn eine Zahl in dieser Liste durch 3 teilbar ist, ersetzt es die Zahl durch „fizz“. Jedes Mal, wenn eine Zahl durch 5 teilbar ist, ersetze die Zahl durch „buzz“.
  // Wenn eine Zahl gleichzeitig durch 3 und 5 teilbar ist, ersetze sie durch „fizzbuzz“. -->
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

  // ShoppingLIST!-------------------------------------------------
  ngOnInit(): void {
    this.getAllProducts();
  }

  // ShoppingListe
  private productService: ProductServiceTsService = inject(
    ProductServiceTsService
  );

  // Ja, public productsList: Product[] = []; wird deklariert, um eine initial leere Liste zu haben. Diese Liste wird dann mit den Produkten gefüllt, die vom Service (this.productService.getAllProducts()) abgerufen werden, und dient dazu, diese Produkte in der Komponente zu speichern (z.B. für die Anzeige im Template).
  public productsList: Product[] = [];
  public selectedProduct: Product | undefined;

  // Ergebnis in productsList speichern
  public getAllProducts(): void {
    this.productsList = this.productService.getAllProducts();
  }
  // Ergebnis in selectedProduct speichern
  public getAllProductsById(id: number): void {
    this.selectedProduct = this.productService.getProductsById(id);
  }

  // Forminput -----------------------------------------------------------

  public productQuantity: number = 0;

  public incrementQuantity(item: Product): void {
    if (item) {
      item.quantity++;
    }
  }

  public deleteProduct(item: Product): void {
    if (item && item.quantity > 0) {
      item.quantity--;
    }
  }

  public get totalQuantity(): number {
    return this.productsList.reduce(
      (sum, product) => sum + product.quantity,
      0
    );
  }

  get totalPrice(): number {
    return this.productsList.reduce(
      (sum, product) => sum + product.quantity * product.price,
      0
    );
  }

  public deleteBasket(): void {
    this.productsList.forEach((product) => (product.quantity = 0));
  }







  public newProductName: string = '';
  public newProductPrice: number = 0;

  public onNameChanged(name: string): void {
    this.newProductName = name;
  }

  public onPriceChanged(price: string): void {
    this.newProductPrice = Number(price);
  }

  public addNewProduct(): void {
    if (!this.newProductName || !this.newProductPrice) return;
    const newProduct: Product = {
      id: Date.now(),
      name: this.newProductName,
      price: this.newProductPrice,
      quantity: 1,
    };
    this.productsList.push(newProduct);
    this.newProductName = '';
    this.newProductPrice = 0;
  }


  
}
