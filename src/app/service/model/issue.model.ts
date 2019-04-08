import {StatusModel} from './status.model';
import {EquipmentModel} from './equipment.model';

export class IssueModel {
  id: number;
  auhor: string;
  date: Date;
  description: string;
  status: StatusModel;
  equipment: EquipmentModel;
}

