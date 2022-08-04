import { Card } from "./card.model";

export interface List {
  id: string;
  title: string;
  position: number;
  cards: Card[];
  showCardForm?: boolean;
}

export interface CreateListDto extends Omit<List, 'id' | 'list' | 'cards'> {
  boardId: string;
}

export interface UpdateListDto extends Partial<CreateListDto> {}
