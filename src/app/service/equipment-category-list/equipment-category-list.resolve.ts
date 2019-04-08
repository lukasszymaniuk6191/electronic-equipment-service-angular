import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {EquipmentCategoryListService} from './equipment-category-list.service';

@Injectable()
export class EquipmentCategoryListResolve implements Resolve<any> {

  constructor(private equipmentCategoryListService: EquipmentCategoryListService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.params['category.id'];
    return this.equipmentCategoryListService.getEquipmentsByCategoryId(id);
  }
}
