import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {EquipmentModel} from '../model/equipment.model';
import {map, mergeMap, take} from 'rxjs/operators';
import {CommentModel} from '../model/comment.model';

@Injectable()
export class EquipmentDataService {
  constructor(private http: HttpClient) {
  }

  getEquipmentById(id: number) {
    const params = new HttpParams().set('id', String(id));
    return this.http.get<EquipmentModel>('http://localhost:8080/api/equipment', {params}).pipe(
      take(1),
      map((equipment: EquipmentModel) => equipment));
  }

  saveComment(comment: CommentModel) {
    return new Promise(resolve => {
      this.http.post('http://localhost:8080/api/comment', comment)
        .subscribe(
          value => {
            console.log('[POST] success - comment saved');
            resolve(true);
          }, error => {
            resolve(false);
            console.log('FAIL - saveing a comment!');
          },
          () => {
            console.log('POST saving comment - now completed.');
          });
    });
  }

  getCommentsByEquipmentId(id: number) {
    const url = 'http://localhost:8080/api/comments/equipment/' + String(id);
    return this.http.get<CommentModel[]>(url)
      .pipe(
        take(1),
        map((comments: CommentModel[]) => comments));
  }


}
