import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CharacterOption } from '../../models/character';

@Component({
  selector: 'app-character-button',
  templateUrl: './character-button.component.html',
  styleUrls: ['./character-button.component.css']
})
export class CharacterButtonComponent implements OnInit {

  @Input()
  public character: CharacterOption;

  @Output()
  public showCharacter: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public displayCharacter(id: string): void {
    this.showCharacter.emit(id);
  }

}
