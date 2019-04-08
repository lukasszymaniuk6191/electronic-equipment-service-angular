import {Component, Input, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';

import {FormGroup, FormArray, FormBuilder} from '@angular/forms';
import {CategoryModel} from '../model/category.model';
import {AddEquipmentService} from './add-equipment.service';
import {EquipmentModel} from '../model/equipment.model';
import {IssueModel} from '../model/issue.model';
import {StatusModel} from '../model/status.model';
import {forkJoin, Observable} from 'rxjs';
import {CommentModel} from '../model/comment.model';


@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.css']
})
export class AddEquipmentComponent implements OnInit {


  private equipmentFormValid: FormGroup;
  private issueFormValid: FormGroup;
  private equipment = new EquipmentModel();
  private categories: CategoryModel[];
  private issue = new IssueModel();
  private statuses: StatusModel[];

  constructor(private _fb: FormBuilder, private addEquipmentService: AddEquipmentService) {
  }

  ngOnInit() {

    forkJoin([this.addEquipmentService.getCategories(), this.addEquipmentService.getStatuses()]).subscribe(
      (results: [CategoryModel[], StatusModel[]]) => {
        this.categories = results[0];
        this.statuses = results[1];
      });

    this.equipmentFormValid = this._fb.group({
      model: ['', [Validators.required]],
      mark: ['', [Validators.required]],
      owner: ['', [Validators.required]],
      category: [null, [Validators.required]],
      parameters: this._fb.array([
        this.initParameter(),
      ])
    });

    this.issueFormValid = this._fb.group({
      auhor: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: [null, [Validators.required]]
    });
  }

  initParameter() {
    return this._fb.group({
      name: [''],
      description: ['']
    });
  }

  addParameter() {
    const control = <FormArray> this.equipmentFormValid.controls['parameters'];
    control.push(this.initParameter());
  }

  removeParameter(i: number) {
    const control = <FormArray> this.equipmentFormValid.controls['parameters'];
    control.removeAt(i);
  }

  saveEquipment(model) {
    this.equipment.model = model.get('model').value;
    this.equipment.mark = model.get('mark').value;
    this.equipment.owner = model.get('owner').value;
    this.equipment.parameters = model.get('parameters').value;

    this.addEquipmentService.saveEquipment(this.equipment).then(result => {
      if (result) {
        this.equipment = <EquipmentModel> result;
        alert('Equipment added successfully');
      }
    });

  }

  onChangeCategory(category: CategoryModel) {
    this.equipment.category = category;
  }

  saveIssue(model) {
    this.issue.auhor = model.get('auhor').value;
    this.issue.date = new Date(Date.now());
    this.issue.description = model.get('description').value;
    this.issue.equipment = this.equipment;

    this.addEquipmentService.saveIssue(this.issue).then(result => {
      if (result) {
        this.equipment.issue = <IssueModel> result;
        alert('Issue added successfully');
      }
    });
  }

  onChangeStatus(status: StatusModel) {
    this.issue.status = status;
  }

  public saveComment(text: string) {
    const comment = new CommentModel();
    comment.date = new Date(Date.now());
    comment.author = 'logged_author';
    comment.commentText = text;
    comment.equipment = this.equipment;

    this.addEquipmentService.saveComment(comment).then(result => {
      if (result === true) {
        this.addEquipmentService.getCommentsByEquipmentId(this.equipment.id).subscribe(result => {
          this.equipment.comments = result;
        });
      }
    });
  }
}
