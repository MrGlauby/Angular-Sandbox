import { Injectable } from '@angular/core';
import { Product } from '../models/product.interface';
@Injectable({
  providedIn: 'root',
})
export class ProductServiceTsService {
  // Erstmal ohne RXJS
  #products: Product[] = [
    { id: 1, name: 'Tofu', price: 2, origin: 'Germany', quantity: 0 },
    { id: 2, name: 'Kichererbsen', price: 1, origin: 'Holland', quantity: 0 },
    { id: 3, name: 'Pizza', price: 3, origin: 'Italy', quantity: 0 },
  ];

  public getAllProducts(): Product[] {
    return [...this.#products];
  }

  public getProductsById(id: number): Product | undefined {
    return this.#products.find((product) => product.id === id);
  }

  // machdas nochmals mit mit RXJS
}

// das hier kommt die methoden von JS rein!

// Kurz: Weil die find()-Methode undefined zurückgibt, wenn kein Produkt mit dieser ID im Array #products existiert.
// Wenn ein Produkt gefunden wird, gibt die Methode das Product-Objekt zurück. Wenn nicht, gibt sie undefined zurück. Der Rückgabetyp Product | undefined spiegelt diese beiden Möglichkeiten korrekt wider.