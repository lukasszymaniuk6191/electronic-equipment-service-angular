import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EquipmentModel} from '../model/equipment.model';
import {EquipmentDataService} from './equipment-data.service';
import {CommentModel} from '../model/comment.model';

@Component({
  selector: 'app-equipment-data',
  templateUrl: './equipment-data.component.html',
  styleUrls: ['./equipment-data.component.css']
})
export class EquipmentDataComponent implements OnInit {

  private equipment = new EquipmentModel();

  constructor(private activatedroute: ActivatedRoute, private equipmentDataService: EquipmentDataService) {
  }

  ngOnInit() {
    this.equipment = this.activatedroute.snapshot.data['equipment'];
  }

  public saveComment(text: string) {
    const comment = new CommentModel();
    comment.date = new Date(Date.now());
    comment.author = 'logged_author';
    comment.commentText = text;
    comment.equipment = this.equipment;

    this.equipmentDataService.saveComment(comment).then(result => {
      if (result === true) {
        this.equipmentDataService.getCommentsByEquipmentId(this.equipment.id).subscribe(result => {
          this.equipment.comments = result;
        });
      }
    });


  }

}
