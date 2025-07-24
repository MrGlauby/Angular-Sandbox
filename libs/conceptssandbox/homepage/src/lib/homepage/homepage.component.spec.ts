import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomepageComponent } from './homepage.component';
import { ProductServiceTsService } from '../service/product.service.ts.service';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;
  // Den Spy direkt hier deklarieren
  let productServiceSpy: jest.Mocked<ProductServiceTsService>;

  beforeEach(async () => {
    const spy = {
      getAllProducts: jest.fn().mockReturnValue([]),
      getAllPosts: jest.fn().mockResolvedValue([]),
      updatePostById: jest.fn(),
      createPost: jest.fn(),
      deletePostById: jest.fn(),
      getProductsById: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [HomepageComponent],
      providers: [
        { provide: ProductServiceTsService, useValue: spy }, // ← spy, nicht spy()
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    productServiceSpy = spy as any; // ← Direkt zuweisen
    fixture.detectChanges();
  });

  it('sollte initial eine leere fizzBuzzList Eigenschaft haben.', () => {
    expect(component.fizzBuzzList).toEqual([]);
  });

  it('sollte die onSubmit Methode die fizzBuzzList Eigenschaft korrekt mit Werten füllen.', () => {
    component.onSubmit();
    expect(component.fizzBuzzList.length).toBe(25);
    expect(component.fizzBuzzList[2]).toBe('fizz');
    expect(component.fizzBuzzList[4]).toBe('buzz');
    expect(component.fizzBuzzList[14]).toBe('fizzbuzz');
  });

  it('sollte die onSubmit Methode aufrufen, wenn der Button geklickt wird.', () => {
    // Spy auf die Methode der Komponente, um den Aufruf zu prüfen
    const onSubmitSpy = jest.spyOn(component, 'onSubmit');
    const button = fixture.nativeElement.querySelector('button');

    button.click();

    expect(onSubmitSpy).toHaveBeenCalled();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // -------------- ANGULAR TESTS ohne Library mit Testbed und Jesmine + Karma und die Methode testen!
  // Check die Codevoverage

  describe('updatePost', () => {
    // Die Methode ist async, also muss der Test auch async sein
    it('sollte das updatedData Objekt korrekt mit neuen Werten erstellen', async () => {
      // 1. ARRANGE: Bereite alle nötigen Testdaten vor
      const originalPost = {
        id: 1,
        title: 'Alter Titel',
        body: 'Alter Text',
        userId: 1,
      };
      const newTitle = 'Neuer Titel';
      const newBody = 'Neuer Text';

      // Wir sagen dem Spy, was er zurückgeben soll, wenn er aufgerufen wird
      productServiceSpy.updatePostById.mockResolvedValue({
        ...originalPost,
        title: newTitle,
        body: newBody,
      });

      // 2. ACT: Rufe die zu testende Methode auf
      await component.updatePost(originalPost, newTitle, newBody);

      // 3. ASSERT: Prüfe, ob der Service mit den richtigen Daten aufgerufen wurde
      expect(productServiceSpy.updatePostById).toHaveBeenCalledWith(
        1, // Prüft die ID
        {
          // Prüft das zusammengesetzte "updatedData"-Objekt
          id: 1,
          title: 'Neuer Titel',
          body: 'Neuer Text',
          userId: 1,
        }
      );
    });

    it('sollte den ProductService mit der richtigen ID aufrufen', async () => {
      // Test für Service-Aufruf mit postToUpdate.id
      // 1. ARRANGE
      const originalPost = {
        id: 1,
        title: 'Alter Titel',
        body: 'Alter Text',
        userId: 1,
      };
      const newTitle = 'Neuer Titel';
      const newBody = 'Neuer Text';

      // Mock setup
      productServiceSpy.updatePostById.mockResolvedValue({
        ...originalPost,
        title: newTitle,
        body: newBody,
      });

      // 2. ACT: Rufe die zu testende Methode auf
      await component.updatePost(originalPost, newTitle, newBody);

      // 3. ASSERT - Prüfe nur die ID (erster Parameter)
      expect(productServiceSpy.updatePostById).toHaveBeenCalledWith(
        1, // ← Nur die ID prüfen
        expect.any(Object) // ← Zweiter Parameter ist egal
      );
    });

    it('sollte den ProductService mit den korrekten updatedData aufrufen', async () => {
      // 1. ARRANGE
      const originalPost = {
        id: 1,
        title: 'Alter Titel',
        body: 'Alter Text',
        userId: 1,
      };
      const newTitle = 'Neuer Titel';
      const newBody = 'Neuer Text';

      // Mock setup
      productServiceSpy.updatePostById.mockResolvedValue({
        ...originalPost,
        title: newTitle,
        body: newBody,
      });

      // 2. ACT
      await component.updatePost(originalPost, newTitle, newBody);

      // 3. ASSERT - Prüfe die exakten updatedData (zweiter Parameter)
      expect(productServiceSpy.updatePostById).toHaveBeenCalledWith(
        expect.any(Number), // ← ID ist egal
        {
          // ← Prüfe die exakten updatedData
          id: 1,
          title: 'Neuer Titel', // ← Neue Werte
          body: 'Neuer Text', // ← Neue Werte
          userId: 1,
        }
      );
    });

    // it('sollte den Post im posts Array finden und ersetzen', () => {
    //   // Test für findIndex und Array-Update
    // });

    // it('sollte den Post nicht ersetzen wenn er nicht gefunden wird', () => {
    //   // Test für index === -1 Fall
    // });

    // it('sollte Fehler abfangen und in der Konsole ausgeben', () => {
    //   // Test für catch Block und console.error
    // });

    // it('sollte das posts Array unverändert lassen bei Service-Fehlern', () => {
    //   // Test für Fehlerbehandlung ohne Array-Änderung
    // });

    // it('sollte die Methode erfolgreich abschließen ohne Rückgabewert', () => {
    //   // Test für Promise<void> Return Type
    // });
  });
});
