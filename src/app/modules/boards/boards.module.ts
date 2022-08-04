import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { DialogModule } from '@angular/cdk/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedModule } from '@shared/shared.module';
import { BoardsRoutingModule } from './boards-routing.module';
import { BoardsComponent } from './pages/boards/boards.component';
import { BoardComponent } from './pages/board/board.component';
import { TodoDialogComponent } from './components/todo-dialog/todo-dialog.component';
import { CardFormComponent } from './components/card-form/card-form.component';


@NgModule({
  declarations: [
    BoardsComponent,
    BoardComponent,
    TodoDialogComponent,
    CardFormComponent
  ],
  imports: [
    CommonModule,
    BoardsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    DragDropModule,
    CdkAccordionModule,
    DialogModule,
    FontAwesomeModule
  ]
})
export class BoardsModule { }
