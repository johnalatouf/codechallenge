import {Component, OnDestroy, OnInit} from '@angular/core';
import {CharacterApiService} from '../../services/character-api.service';
import {Character} from '../../models/character';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-character-shell',
  templateUrl: './character-shell.component.html',
  styleUrls: ['./character-shell.component.css']
})
export class CharacterShellComponent implements OnInit, OnDestroy {

  public selectedCharacter: Character;

  public characterSub: Subscription;

  constructor(private characterService: CharacterApiService) { }

  ngOnInit(): void {
    this.fetchCharacter(5);
  }

  ngOnDestroy(): void {
    if (this.characterSub) {
      this.characterSub.unsubscribe();
      this.characterSub = null;
    }
  }

  public fetchCharacter(id: number): void {
    this.characterSub = this.characterService.getCharacter(id).subscribe((data) => {
      this.selectedCharacter = data;
      console.log(this.selectedCharacter);
    });
  }
}
