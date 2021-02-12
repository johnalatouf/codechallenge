import { Component, OnDestroy, OnInit } from '@angular/core';
import { CharacterApiService } from '../../services/character-api.service';
import { Character, CharacterOption } from '../../models/character';
import { Subscription } from 'rxjs';

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
  public loading: boolean = false;

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
    this.loading = true;
    this.characterSub = this.characterService.getCharacter(id).subscribe((data) => {
      this.selectedCharacter = data;
      this.loading = false;
    }, (error) => {
      this.loading = false;
      console.log(error);
    });
  }

  public fetchCharactersToShow(id: number): void {
    this.loading = true;
    this.charactersToShowSub = this.characterService.getCast(id).subscribe((data) => {
      this.charactersToShow = data;
      this.loading = false;
    }, (error) => {
      this.loading = false;
      console.log(error);
    });
  }

  public displayCharacter(id: string): void {
    const num = parseInt(id);
    this.fetchCharacter(num);
  }
}
