import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {EquipmentListComponent} from './equipment-list/equipment-list.component';
import {EquipmentDataComponent} from './equipment-data/equipment-data.component';
import {EquipmentDataResolve} from './equipment-data/equipment-data.resolve';
import {AddEquipmentComponent} from './add-equipment/add-equipment.component';
import {AppComponent} from '../app.component';
import {DateTimeFormatPipe} from './pipes/date-time-format-pipe';
import {EquipmentCategoryListComponent} from './equipment-category-list/equipment-category-list.component';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AlertModule} from 'ngx-bootstrap';
import {EquipmentDataService} from './equipment-data/equipment-data.service';
import {EquipmentListService} from './equipment-list/equipment-list.service';
import {AddEquipmentService} from './add-equipment/add-equipment.service';
import {TokenStorage} from '../core/token.storage';
import {Interceptor} from '../core/interceptor';
import {AuthService} from '../core/auth.service';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import {HeaderService} from './layout/header/header.service';
import {EquipmentCategoryListResolve} from './equipment-category-list/equipment-category-list.resolve';
import {EquipmentCategoryListService} from './equipment-category-list/equipment-category-list.service';

const routes: Routes = [
  { path: 'equipment-list', component: EquipmentListComponent },
  { path: 'equipment-data/:equipment.id', component: EquipmentDataComponent, resolve: {equipment: EquipmentDataResolve} },
  { path: 'add-equipment', component: AddEquipmentComponent},
  { path: 'equipment-category-list/:category.id', component: EquipmentCategoryListComponent, resolve: {category: EquipmentCategoryListResolve} },


];



@NgModule({
  declarations: [
    DateTimeFormatPipe,
    EquipmentListComponent,
    EquipmentDataComponent,
    AddEquipmentComponent,
    EquipmentCategoryListComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FormsModule,
    AlertModule.forRoot(),
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [
    DatePipe,
    EquipmentDataService, EquipmentDataResolve,
    EquipmentListService,
    AddEquipmentService,
    EquipmentCategoryListService, EquipmentCategoryListResolve,
    HeaderService,

    TokenStorage,
    {provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi : true},
    AuthService
  ]
})
export class ServiceModule {
  static routes = routes;
}
