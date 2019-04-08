import { BrowserModule } from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {AlertModule} from 'ngx-bootstrap';
import {CommonModule, DatePipe} from '@angular/common';
import {Interceptor} from './core/interceptor';
import {TokenStorage} from './core/token.storage';
import { LoginComponent } from './login/login.component';
import {AuthService} from './core/auth.service';
import { ErrorComponent } from './error/error.component';

export let InjectorInstance: Injector;



const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'error', component: ErrorComponent},
  {
    path: 'service',
    loadChildren: './service/service.module#ServiceModule'
  }
];



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    AlertModule.forRoot(),
    CommonModule,
  ],
  providers: [
    TokenStorage,
    {provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi : true},
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    InjectorInstance = this.injector;
  }
}
