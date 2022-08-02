import { Component, Input } from '@angular/core';

import { Colors } from '@models/colors.model';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
})
export class BoardCardComponent {
  @Input() color: Colors =  'sky';

  mapColors = {
    sky: {
      'bg-sky-700': true,
      'hover:bg-sky-800': true,
      'focus:ring-sky-300': true,
      'text-white': true,
    },
    yellow: {
      'bg-yellow-700': true,
      'hover:bg-yellow-800': true,
      'focus:ring-yellow-300': true,
      'text-white': true,
    },
    green: {
      'bg-green-700': true,
      'hover:bg-green-800': true,
      'focus:ring-green-300': true,
      'text-white': true,
    },
    red: {
      'bg-red-200': true,
      'hover:bg-red-500': true,
      'focus:ring-red-50': true,
      'text-gray-700': true,
    },
    violet: {
      'bg-violet-700': true,
      'hover:bg-violet-800': true,
      'focus:ring-violet-300': true,
      'text-white': true,
    },
    gray: {
      'bg-gray-700': true,
      'hover:bg-gray-800': true,
      'focus:ring-gray-300': true,
      'text-white': true,
    },
  };

  constructor() {}

  get colors() {
    const colors = this.mapColors[this.color];
    if (colors) {
      return colors;
    }
    return {};
  }
}
