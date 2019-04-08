import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class EquipmentListService {


  constructor(private http: HttpClient) {
  }

  getEquipmentList() {
    return this.http.get<any[]>('http://localhost:8080/api/equipments');
  }
}
