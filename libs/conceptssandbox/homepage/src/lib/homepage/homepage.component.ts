import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductServiceTsService } from '../service/product.service.ts.service';
import { Post, Product } from '../models/product.interface';
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
export class HomepageComponent implements OnInit {
  //  Methoden Training Arrays

  public thingsWithArrays = [
    'apple',
    'banana',
    'cherry',
    'date',
    'elderberry',
    'fig',
    'grape',
  ];

  public giveMeAllThings() {
    return this.thingsWithArrays;
  }

  // Ausgeben und UPDATEN!
  public updateArray(newstring: string): string[] {
    this.thingsWithArrays.push(newstring);
    return this.thingsWithArrays;
  }

  // im HTML zeigen! mit controlFlows! NgFor!

  // Füge ein Element am Anfang des Arrays hinzu.
  public addElementAtStart(newElement: string): void {
    this.thingsWithArrays.unshift(newElement);
  }

  // mit dem button!
  // <button (click)="addElementAtStart('asdasd')">Am Anfang einfügen</button>

  // <ul>
  //   <li *ngFor="let fruit of thingsWithArrays">{{ fruit }}</li>
  // </ul>

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
    this.getAllProducts();
    this.getAllPosts(); // ← Das fehlte!
  }

  // ShoppingListe
  private productService: ProductServiceTsService = inject(
    ProductServiceTsService
  );

  // Diese Methoden Umscreiben, damit sie die Service Methoden nutzen! ----------
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

  // ------------------------------------ ADD NEW PRODUCT ------------------------------------
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

  // Fun with Arrays and Objects!-------------------------------------------------

  // ngOnInit(): void {// }
  // neuer Eintrag!
  public posts: Post[] = [];
  public async getAllPosts(): Promise<void> {
    try {
      this.posts = await this.productService.getAllPosts();
    } catch (error) {
      console.error('Fehler beim Laden der Posts:', error);
    }
  }

  // Neuen Eintrag generieren!
  public async createPost(): Promise<void> {
    try {
      const newPost = await this.productService.createPost({
        title: '',
        body: '',
        userId: 1,
      });

      // RICHTIG: Füge den neuen Post zum bestehenden Array hinzu
      this.posts.push(newPost);
    } catch (error) {
      console.error('Fehler beim Erstellen des Posts:', error);
    }
  }

  // Upate Eintrag - Event!  
  public async updatePost(postToUpdate: Post, newTitle: string, newBody: string): Promise<void> {
  try {
    // Erstelle ein Update-Objekt mit den neuen Werten
    const updatedData = { ...postToUpdate, title: newTitle, body: newBody };

    const updatedPost = await this.productService.updatePostById(
      postToUpdate.id,
      updatedData // Sende die neuen Daten
    );

    const index = this.posts.findIndex(post => post.id === postToUpdate.id);
    if (index !== -1) {
      this.posts[index] = updatedPost;
    }
  } catch (error) {
    console.error('Fehler beim Updaten eines Posts:', error);
  }
}
  
  
  
  
  
  
  
  
  
  // Eintrag löschen!
}
