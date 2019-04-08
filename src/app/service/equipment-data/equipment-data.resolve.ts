import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {EquipmentDataService} from './equipment-data.service';

@Injectable()
export class EquipmentDataResolve implements Resolve<any> {

  constructor(private equipmentDataService: EquipmentDataService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.params['equipment.id'];
    return this.equipmentDataService.getEquipmentById(id);
  }
}
