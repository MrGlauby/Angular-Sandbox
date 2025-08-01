import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductServiceTsService } from '../service/product.service.ts.service';
import { Post, Product } from '../models/product.interface';
import { ButtonComponent } from '@angular-concepts-sandbox/controls';
import { FormInputComponent } from '@angular-concepts-sandbox/controls';
import { CreateProductComponent } from '@angular-concepts-sandbox/controls';
import { PostsStore } from '../store/posts.store';


// posts-state.interface.ts
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
  private productService: ProductServiceTsService = inject(ProductServiceTsService);

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

postsStore = inject(PostsStore);


  public newPostTitle: string = '';
  public newPostBody: string = '';

  public onTitleChanged(name: string): void {
    this.newPostTitle = name;
  }

  public onBodyChanged(body: string): void {
    this.newPostBody = body;
  }

  allPosts = this.postsStore.posts; // ← Signal-Referenz
  // public posts: Post[] = [];

  public async getAllPosts(): Promise<void> {
    try {
      await this.postsStore.getAllPosts();
    } catch (error) {
      console.error('Fehler beim Laden der Posts:', error);
    }
  }

  // Neuen Eintrag generieren!
  public async createPost(): Promise<void> {
    try {
      await this.postsStore.createPost({
        title: this.newPostTitle,
        body: this.newPostBody,
        userId: 1,
      });
    } catch (error) {
      console.error('Fehler beim Erstellen des Posts:', error);
    }
  }

  // Upate Eintrag - Event!
  public async updatePost(
    postToUpdate: Post,
    newTitle: string,
    newBody: string
  ): Promise<void> {
    try {
      // Erstelle ein Update-Objekt mit den neuen Werten
      const updatedData = { ...postToUpdate, title: newTitle, body: newBody };

      const updatedPost = await this.postsStore.updatePostById(
        postToUpdate.id,
        updatedData // Sende die neuen Daten
      );
      await this.postsStore.updatePostById(postToUpdate.id, updatedData);

      // Signal neu laden
      await this.getAllPosts();
    } catch (error) {
      console.error('Fehler beim Updaten eines Posts:', error);
    }
  }

  // Eintrag löschen!
  // public async deletePost(id: number): Promise<void> {
  //   try {
  //     await this.productService.deletePostById(id);
  //     await this.getAllPosts();
  //   } catch (error) {
  //     console.error('Fehler beim Löschen des Posts:', error);
  //   }
  // }

  // // Methoden Training! --------------------------------------------
  // // Kann ich hier auch signals verwenden?

  // public textList: string[] = [];

  // public async createNewText() {
  //   const newText = `Text ${this.textList.length + 1}`;
  //   this.textList.push(newText);
  // }

  // // update -------------------------------------

  // public updateText(index: number): void {
  //   const currentText = this.textList[index];
  //   const updatedText = prompt('Text aktualisieren:', currentText);
  //   if (updatedText !== null && updatedText.trim()) {
  //     this.textList[index] = updatedText;
  //   }
  // }

  // delete

  // read




public textList: { id: number; text: string }[] = [];

public createNewText(): void {
  const newText = {
    id: Date.now(), // Eindeutige ID basierend auf Timestamp
    text: `Text ${this.textList.length + 1}`
  };
  this.textList.push(newText);
}

// update mit ID statt Index
public updateText(id: number): void {
  const item = this.textList.find(text => text.id === id);
  if (item) {
    const updatedText = prompt('Text aktualisieren:', item.text);
    if (updatedText !== null && updatedText.trim()) {
      item.text = updatedText;
    }
  }
}

// // delete mit ID
public deleteText(id: number): void{
this.textList = this.textList.filter(text => text.id !== id)
}
// public deleteText(id: number): void {
//   this.textList = this.textList.filter(text => text.id !== id);
// }





}
