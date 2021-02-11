import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterShellComponent } from './containers/character-shell/character-shell.component';
import { CharacterDisplayComponent } from './components/character-display/character-display.component';
import { CharacterButtonComponent } from './components/character-button/character-button.component';
import { CharacterButtonMenuComponent } from './components/character-button-menu/character-button-menu.component';



@NgModule({
  declarations: [CharacterShellComponent, CharacterDisplayComponent, CharacterButtonComponent, CharacterButtonMenuComponent],
  exports: [
    CharacterShellComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
