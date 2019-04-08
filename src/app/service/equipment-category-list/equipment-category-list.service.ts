import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, take} from 'rxjs/operators';
import {EquipmentModel} from '../model/equipment.model';

@Injectable()
export class EquipmentCategoryListService {
  constructor(private http: HttpClient) {
  }

  getEquipmentsByCategoryId(id: number) {
    const url = 'http://localhost:8080/api/equipments/category/' + String(id);
    return this.http.get<EquipmentModel[]>(url)
      .pipe(
        take(1),
        map((equipments: EquipmentModel[]) => equipments));
  }


}
