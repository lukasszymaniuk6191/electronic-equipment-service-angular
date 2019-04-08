import {Component, OnInit} from '@angular/core';
import {EquipmentModel} from '../model/equipment.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-equipment-category-list',
  templateUrl: './equipment-category-list.component.html',
  styleUrls: ['./equipment-category-list.component.css']
})
export class EquipmentCategoryListComponent implements OnInit {

  private equipments: EquipmentModel[];

  constructor(private activatedroute: ActivatedRoute) {
  }

  ngOnInit() {
    this.equipments = this.activatedroute.snapshot.data['category'];
  }
}
