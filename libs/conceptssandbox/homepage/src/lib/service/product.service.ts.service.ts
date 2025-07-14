import { Injectable } from '@angular/core';
import { Product, Post } from '../models/product.interface';
import { CalendarEvent } from '../models/product.interface';
import { environment } from 'apps/AngularConceptsSandbox/src/app/environments/environment';
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

  // deleteProduct
  public deleteProductById(id: number): void {
    this.#products = this.#products.filter((product) => product.id !== id);
  }

  // Ich will ein neues Array, das eine Kopie jedes Elements ist, aber das eine Element mit der passenden ID wird durch das geupdatete ersetzt.

  public updateProductById(id: number, updateProduct: Product): void {
    this.#products = this.#products.map((product) =>
      product.id === id ? updateProduct : product
    );
  }

  // Ich will ein neues Array, das alle alten Elemente UND zusätzlich das neue Element enthält.
  public addNewProduct(newProduct: Product): void {
    this.#products = [...this.#products, newProduct];
  }

  // Fun with Arrays and Objects --------------------------------------------------

  //  hier muss ich nur nur noch die Methoden in der richtigen Component aufrufen!
  // Du rufst die Methoden des Services aus der Komponente heraus auf.
  #calendarEvents: CalendarEvent[] = [
    { date: '2025-06-27', time: '10:00', note: 'Zahnarzt', day: 'Freitag' },
    { date: '2025-06-28', time: '14:00', note: 'Meeting', day: 'Samstag' },
  ];

  public getAllCalendarEvents(): CalendarEvent[] {
    return [...this.#calendarEvents];
  }

  public getOneCalendarEvent(): CalendarEvent | undefined {
    return this.#calendarEvents[0];
  }

  // add new calendar event
  public addNewCalendarEvent(newEvent: CalendarEvent): void {
    this.#calendarEvents.push(newEvent);
  }

  // delete calendar event
  public deleteEventByDate(date: string): void {
    this.#calendarEvents = this.#calendarEvents.filter(
      (event) => event.date !== date
    );
  }

  //update calendar event
  public updateCalenderEvent(
    date: string,
    time: string,
    updatedEvent: CalendarEvent
  ): void {
    const index = this.#calendarEvents.findIndex(
      (event) => event.date === date && event.time === time
    );
    if (index !== -1) {
      this.#calendarEvents[index] = updatedEvent;
    }
  }

  // ------------------------------------------------------- API PRACTICE

  private readonly API_URL = environment.apiUrls.posts;

  public async getAllPosts(): Promise<Post[]> {
    try {
      const response = await fetch(this.API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Fehler beim Laden der Posts:', error);
      throw error;
    }
  }

  public async getPostById(id: number): Promise<Post> {
    try {
      const response = await fetch(`${this.API_URL}/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Fehler beim Laden des Posts ${id}:`, error);
      throw error;
    }
  }

  public async createPost(post: Omit<Post, 'id'>): Promise<Post> {
    try {
      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Fehler beim Erstellen des Posts:', error);
      throw error;
    }
  }

  public async updatePostById(id: number, post: Post): Promise<Post> {
    try {
      const response = await fetch(`${this.API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Fehler beim Aktualisieren des Posts ${id}:`, error);
      throw error;
    }
  }

  public async deletePostById(id: number): Promise<void> {
    try {
      const response = await fetch(`${this.API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // DELETE requests typically don't return content
    } catch (error) {
      console.error(`Fehler beim Löschen des Posts ${id}:`, error);
      throw error;
    }
  }
}
