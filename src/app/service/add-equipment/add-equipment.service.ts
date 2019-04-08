import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CommentModel} from '../model/comment.model';
import {EquipmentModel} from '../model/equipment.model';
import {map, take} from 'rxjs/operators';
import {IssueModel} from '../model/issue.model';

@Injectable()
export class AddEquipmentService {

  constructor(private http: HttpClient) {
  }

  getCategories() {
    return this.http.get<any[]>('http://localhost:8080/api/categories');
  }

  saveEquipment(equipment: EquipmentModel) {
    return new Promise(resolve => {
      this.http.post('http://localhost:8080/api/equipment', equipment)
        .subscribe(
          value => {
            console.log('[POST] success - equipment saved');
            resolve(value);
          }, error => {
            resolve(false);
            console.log('FAIL - saving a equipment!');
          },
          () => {
            console.log('POST saving equipment - now completed.');
          });
    });
  }

  getStatuses() {
    return this.http.get<any[]>('http://localhost:8080/api/statuses');
  }


  saveIssue(issue: IssueModel) {
    return new Promise(resolve => {
      this.http.post('http://localhost:8080/api/issue', issue)
        .subscribe(
          value => {
            console.log('[POST] success - issue saved');
            resolve(value);
          }, error => {
            resolve(false);
            console.log('FAIL - saving  issue!');
          },
          () => {
            console.log('POST saving issue - now completed.');
          });
    });
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
