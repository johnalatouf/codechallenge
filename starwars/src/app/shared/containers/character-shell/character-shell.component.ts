import {Component, OnDestroy, OnInit} from '@angular/core';
import {CharacterApiService} from '../../services/character-api.service';
import {Character, CharacterOption} from '../../models/character';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-character-shell',
  templateUrl: './character-shell.component.html',
  styleUrls: ['./character-shell.component.css']
})
export class CharacterShellComponent implements OnInit, OnDestroy {

  public selectedCharacter: Character;

  public characterSub: Subscription;
  public charactersToShowSub: Subscription;

  public charactersToShow: Array<CharacterOption>;

  constructor(private characterService: CharacterApiService) { }

  ngOnInit(): void {
    this.fetchCharactersToShow(1);
  }

  ngOnDestroy(): void {
    if (this.characterSub) {
      this.characterSub.unsubscribe();
      this.characterSub = null;
    }
    if (this.charactersToShowSub) {
      this.charactersToShowSub.unsubscribe();
      this.charactersToShowSub = null;
    }
  }

  public fetchCharacter(id: number): void {
    this.characterSub = this.characterService.getCharacter(id).subscribe((data) => {
      this.selectedCharacter = data;
      console.log(this.selectedCharacter);
    });
  }

  public fetchCharactersToShow(id: number): void {
    this.charactersToShowSub = this.characterService.getCast(id).subscribe((data) => {
      this.charactersToShow = data;
      console.log(this.charactersToShow);
    });
  }

  public displayCharacter(id: string): void {
    const num = parseInt(id);
    this.fetchCharacter(num);
  }
}
