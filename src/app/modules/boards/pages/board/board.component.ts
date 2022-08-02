import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Dialog } from '@angular/cdk/dialog';
import { TodoDialogComponent } from '@boards/components/todo-dialog/todo-dialog.component';

import { Card } from '@models/card.model';
import { Board } from '@models/board.model';
import { BoardsService } from '@services/boards.service';
import { RequestStatus } from '@models/request-status.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styles: [
    `
      .cdk-drop-list-dragging .cdk-drag {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }
      .cdk-drag-animating {
        transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
      }
    `,
  ],
})
export class BoardComponent implements OnInit {

  board: Board | null = null;
  status: RequestStatus = 'init';

  constructor(
    private dialog: Dialog,
    private boardService: BoardsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.getBoard(id);
      }
    });
  }

  getBoard(id: Board['id']) {
    this.status = 'loading';
    this.boardService.getBoard(id).subscribe({
      next: (board) => {
        this.status = 'success';
        this.board = board;
      },
      error: () => {
        this.status = 'failed';
      }
    });
  }

  drop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    const newPosition = this.boardService.getPosition(event.container.data,  event.currentIndex);
    const card = event.container.data[event.currentIndex];
    this.updatePosition(card, newPosition);
  }

  addColumn() {
    // this.lists.push({
    //   title: 'New Column',
    //   cards: [],
    // });
  }

  openDialog(card: Card) {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      minWidth: '300px',
      maxWidth: '50%',
      data: { card },
    });
    dialogRef.closed.subscribe((output) => {
      if (output) {
        console.log(output);
      }
    });
  }

  updatePosition(card: Card, newPosition: number) {
    console.log(card.id, card.title, newPosition);
  }
}
