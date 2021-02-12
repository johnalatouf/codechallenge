import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { CharacterOption } from '../../models/character';

@Component({
  selector: 'app-character-button-menu',
  templateUrl: './character-button-menu.component.html',
  styleUrls: ['./character-button-menu.component.css']
})
export class CharacterButtonMenuComponent implements OnInit {

  @Input()
  public characters: Array<CharacterOption>;

  @Output()
  public showCharacter: EventEmitter<any> = new EventEmitter();

  constructor(private renderer: Renderer2, private elem: ElementRef) { }

  ngOnInit(): void {
  }

  public displayCharacter(id: string): void {
    const buttons = this.elem.nativeElement.querySelectorAll('.character-button');
    for (const button of buttons) {
      if (button.id === `btn-${id}`) {
        this.renderer.addClass(button, 'selected');
      } else {
        this.renderer.removeClass(button, 'selected');
      }

    }
    this.showCharacter.emit(id);
  }
}
