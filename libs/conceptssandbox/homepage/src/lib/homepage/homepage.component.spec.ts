import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomepageComponent } from './homepage.component';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('sollte initial eine leere fizzBuzzList Eigenschaft haben.', () => {
    expect(component.fizzBuzzList).toEqual([]);
  });

  it('sollte die onSubmit Methode die fizzBuzzList Eigenschaft korrekt mit Werten füllen.', () => {
    component.onSubmit();
    expect(component.fizzBuzzList).toEqual([
      1,
      2,
      'fizz',
      4,
      'buzz',
      'fizz',
      7,
      8,
      'fizz',
      'buzz',
      11,
      'fizz',
      13,
      14,
      'fizzbuzz',
      16,
      17,
      'fizz',
      19,
      'buzz',
      'fizz',
      22,
      23,
      'fizz',
      'buzz',
    ]);
  });

  it('sollte die onSubmit Methode aufrufen, wenn der Button geklickt wird.', () => {
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    expect(component.fizzBuzzList.length).toBeGreaterThan(0);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

