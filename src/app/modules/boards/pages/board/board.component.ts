import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { ListsService } from '@services/lists.service';
import { CardService } from '@services/cards.service';
import { RequestStatus } from '@models/request-status.model';
import { List } from '@models/list.model';
import { FormControl } from '@angular/forms';
import { bgColors } from '@models/colors.model';

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
export class BoardComponent implements OnInit, OnDestroy {

  board: Board | null = null;
  status: RequestStatus = 'init';
  inputCard = new FormControl('', {nonNullable: true});
  showColumnForm = false;
  inputColumn = new FormControl('', {nonNullable: true});
  mapColors = bgColors;

  constructor(
    private dialog: Dialog,
    private boardService: BoardsService,
    private cardService: CardService,
    private listsService: ListsService,
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

  ngOnDestroy() {
    this.boardService.setBackgroundColor('sky');
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
    const position = this.boardService.getPosition(event.container.data,  event.currentIndex);
    const card = event.container.data[event.currentIndex];
    this.cardService.update(card.id, { position, listId: event.container.id })
    .subscribe();
  }

  createColumn() {
    const title = this.inputColumn.value;
    if (this.board) {
      this.listsService.create({
        title,
        position: this.boardService.getPositionForNewElement(this.board.lists),
        boardId: this.board.id,
      })
      .subscribe(list => {
        this.board?.lists.push(list);
        this.showColumnForm = false;
      });
    }
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

  openCardForm(list: List) {
    if (this.board?.lists) {
      this.board.lists = this.board.lists.map(iteratorList => {
        if (iteratorList.id === list.id) {
          return {
            ...iteratorList,
            showCardForm: true,
          }
        }
        return {
          ...iteratorList,
          showCardForm: false,
        }
      });
    }
  }

  createCard(list: List) {
    const title = this.inputCard.value;
    if (this.board) {
      this.cardService.create({
        title,
        listId: list.id,
        boardId: this.board.id,
        position: this.boardService.getPositionForNewElement(list.cards)
      })
      .subscribe(card => {
        list.cards.push(card);
        this.inputCard.setValue('');
      });
    }
  }

  get colors() {
    if (this.board) {
      const colors = this.mapColors[this.board.backgroundColor]
      if (colors) {
        return colors;
      }
    }
    return {};
  }
}
