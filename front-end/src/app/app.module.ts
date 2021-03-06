import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { AgGridModule } from 'ag-grid-angular';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { EditClientInfoComponent } from './edit-client-info/edit-client-info.component';
import { HttpAuthInterceptor } from './http-interceptor.service';
import { EditCompanyInfoComponent } from './edit-company-info/edit-company-info.component';
import { AddClientComponent } from './add-client/add-client.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'home', component: MainScreenComponent, canActivate: [AuthGuard]},
  { path: 'editclient/:id', component: EditClientInfoComponent, canActivate: [AuthGuard]},
  { path: 'editcompany/:id', component: EditCompanyInfoComponent, canActivate: [AuthGuard]},
  { path: 'addclient', component: AddClientComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: '**', redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    RouterModule.forRoot(
      routes
    )
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    MainScreenComponent,
    EditClientInfoComponent,
    EditCompanyInfoComponent,
    AddClientComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
