import {Component, OnInit} from '@angular/core';
import {CategoryModel} from '../../model/category.model';
import {HeaderService} from './header.service';
import {Router} from '@angular/router';
import {TokenStorage} from '../../../core/token.storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private categories: CategoryModel[];

  constructor(private headerService: HeaderService, private router: Router, private tokenStorage: TokenStorage) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {

    this.headerService.getCategories().subscribe(result => {
      this.categories = result;
    });
  }

  changeCategory(id) {
    const url = '/service/equipment-category-list/' + id;
    this.router.navigate([url]);
  }

  logOut() {
    this.tokenStorage.signOut();
  }


}
