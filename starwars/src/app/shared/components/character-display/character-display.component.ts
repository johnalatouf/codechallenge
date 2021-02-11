import {Component, Input, OnInit} from '@angular/core';
import {Character} from '../../models/character';

@Component({
  selector: 'app-character-display',
  templateUrl: './character-display.component.html',
  styleUrls: ['./character-display.component.css']
})
export class CharacterDisplayComponent implements OnInit {

  @Input()
  public character: Character;

  constructor() { }

  ngOnInit(): void {
  }

}
