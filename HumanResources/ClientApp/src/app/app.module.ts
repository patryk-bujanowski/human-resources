import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ApiAuthorizationModule } from 'src/app/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/app/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/app/api-authorization/authorize.interceptor';
import { SearchMenuComponent } from './search-menu/search-menu.component';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    SearchMenuComponent,
    ProfileMenuComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ApiAuthorizationModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'employee', loadChildren: () => import('src/app/employee/employee.module').then(m => m.EmployeeModule), canActivate: [AuthorizeGuard] },
      { path: 'search', loadChildren: () => import('src/app/search/search.module').then(m => m.SearchModule), canActivate: [AuthorizeGuard] }
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
