import {CategoryModel} from './category.model';
import {Parameter} from '@angular/compiler-cli/src/ngtsc/host';
import {ParameterModel} from './parameter.model';
import {CommentModel} from './comment.model';
import {IssueModel} from './issue.model';

export class EquipmentModel {

  id: number;
  model: string;
  mark: string;
  owner: string;

  category: CategoryModel;
  parameters: ParameterModel[];
  comments: CommentModel[];
  issue: IssueModel;
}
