import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Board, CreateBoardDto } from '@models/board.model';
import { Card } from '@models/card.model';
import { checkToken } from '@interceptors/token.interceptor';
import { List } from '@models/list.model';
import { BehaviorSubject, tap } from 'rxjs';
import { Colors } from '@models/colors.model';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  apiUrl = environment.API_URL;
  buffer = 655358;
  backgroundColor$ = new BehaviorSubject<Colors>('sky');

  constructor(private http: HttpClient) {}

  create(dto: CreateBoardDto) {
    return this.http.post<Board>(`${this.apiUrl}/api/v1/boards/`, dto, {
      context: checkToken()
    });
  }

  getBoard(id: Board['id']) {
    return this.http.get<Board>(`${this.apiUrl}/api/v1/boards/${id}`, {
      context: checkToken(),
    })
    .pipe(
      tap(board => this.setBackgroundColor(board.backgroundColor))
    );
  }

  getPosition(cards: Card[], currentIndex: number) {
    if (cards.length === 1) {
      return this.buffer;
    }
    if (cards.length > 1  && currentIndex === 0) {
      const onTopPosition = cards[1].position;
      return onTopPosition / 2;
    }
    const lastIndex = cards.length - 1;
    if (cards.length > 0 && currentIndex > 0 && currentIndex < lastIndex) {
      const prevPosition = cards[currentIndex - 1].position;
      const nextPosition = cards[currentIndex + 1].position;
      return (prevPosition + nextPosition) / 2;
    }
    if (cards.length > 0 && currentIndex === lastIndex) {
      const onBottomPosition = cards[lastIndex].position;
      return onBottomPosition + this.buffer;
    }
    return 0;
  }

  getPositionForNewElement(cards: Card[] | List[]) {
    if (cards.length === 0) {
      return this.buffer;
    }
    const lastIndex = cards.length - 1;
    const onBottomPosition = cards[lastIndex].position;
    return onBottomPosition + this.buffer;
  }

  setBackgroundColor(color: Colors) {
    this.backgroundColor$.next(color);
  }
}
