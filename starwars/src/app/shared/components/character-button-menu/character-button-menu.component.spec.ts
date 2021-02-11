import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterButtonMenuComponent } from './character-button-menu.component';

describe('CharacterButtonMenuComponent', () => {
  let component: CharacterButtonMenuComponent;
  let fixture: ComponentFixture<CharacterButtonMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterButtonMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterButtonMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
