import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { List, CreateListDto, UpdateListDto } from '@models/list.model';
import { checkToken } from '@interceptors/token.interceptor';

@Injectable({
  providedIn: 'root',
})
export class ListsService {
  apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  create(data: CreateListDto) {
    return this.http.post<List>(
      `${this.apiUrl}/api/v1/lists`,
      { ...data },
      { context: checkToken() }
    );
  }

  update(id: List['id'], changes: UpdateListDto) {
    return this.http.put<List>(
      `${this.apiUrl}/api/v1/lists/${id}`,
      { ...changes },
      { context: checkToken() }
    );
  }
}
