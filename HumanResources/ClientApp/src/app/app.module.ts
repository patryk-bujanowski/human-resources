import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { SearchMenuComponent } from './search-menu/search-menu.component';
import { SharedModule } from './shared/shared.module';
import { AuthorizationInterceptor } from './shared/authorization/authorization.interceptor';
import { AuthorizationGuard } from './shared/authorization/authorization.guard';
import { AccountMenuComponent } from './account-menu/account-menu.component';
import { BlogModule } from './blog/blog.module';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'user/dashboard' },
  { path: 'account', loadChildren: () => import('src/app/account/account.module').then(m => m.AccountModule) },
  { path: 'user', loadChildren: () => import('src/app/user/user.module').then(m => m.UserModule), canActivate: [AuthorizationGuard] },
  { path: 'search', loadChildren: () => import('src/app/search/search.module').then(m => m.SearchModule), canActivate: [AuthorizationGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    SearchMenuComponent,
    AccountMenuComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forRoot(routes),
    BlogModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
