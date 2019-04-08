import {Component, OnInit} from '@angular/core';
import {EquipmentListService} from './equipment-list.service';
import {EquipmentModel} from '../model/equipment.model';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css']
})
export class EquipmentListComponent implements OnInit {

  equipmentList: EquipmentModel[];

  constructor(private equipmentListService: EquipmentListService) {
  }

  ngOnInit() {
    this.equipmentListService.getEquipmentList()
      .subscribe(result => {
        this.equipmentList = result;
      });
  }

}
