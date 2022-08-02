import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ButtonComponent } from './components/button/button.component';
import { BoardCardComponent } from './components/board-card/board-card.component';

@NgModule({
  declarations: [ButtonComponent, BoardCardComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [ButtonComponent, BoardCardComponent],
})
export class SharedModule {}
