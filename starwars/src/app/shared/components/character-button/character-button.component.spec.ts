import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterButtonComponent } from './character-button.component';

describe('CharacterButtonComponent', () => {
  let component: CharacterButtonComponent;
  let fixture: ComponentFixture<CharacterButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
