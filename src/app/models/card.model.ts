import { Board } from "./board.model";
import { List } from "./list.model";

export interface Card {
  id: string;
  title: string;
  description: string;
  position: number;
  list: List;
  board: Board;
}

export interface CreateCardDto extends Omit<Card, 'id' | 'list' | 'board' | 'description'> {
  description?: string;
  listId: string;
  boardId: string;
}

export interface UpdateCardDto extends Partial<CreateCardDto> {}
