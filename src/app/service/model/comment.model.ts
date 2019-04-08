import {EquipmentModel} from './equipment.model';

export class CommentModel {
  id: number;
  date: Date;
  author: string;
  commentText: string;
  equipment: EquipmentModel;
}
