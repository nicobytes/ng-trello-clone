import { User } from "./user.model";
import { Colors } from "./colors.model";

export interface Board {
  id: string;
  title: string;
  backgroundColor: Colors;
  members: User[];
}
