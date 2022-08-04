import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Card, CreateCardDto, UpdateCardDto } from '@models/card.model';
import { checkToken } from '@interceptors/token.interceptor';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  create(data: CreateCardDto) {
    return this.http.post<Card>(
      `${this.apiUrl}/api/v1/cards`,
      { ...data },
      { context: checkToken() }
    );
  }

  update(id: Card['id'], changes: UpdateCardDto) {
    return this.http.put<Card>(
      `${this.apiUrl}/api/v1/cards/${id}`,
      { ...changes },
      { context: checkToken() }
    );
  }
}
