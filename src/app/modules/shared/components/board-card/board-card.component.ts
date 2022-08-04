import { Component, Input } from '@angular/core';

import { COLORS, Colors } from '@models/colors.model';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
})
export class BoardCardComponent {
  @Input() color: Colors =  'sky';

  mapColors = COLORS;

  constructor() {}

  get colors() {
    const colors = this.mapColors[this.color];
    if (colors) {
      return colors;
    }
    return {};
  }
}
