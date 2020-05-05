import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { AgGridModule } from 'ag-grid-angular';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { EditClientInfoComponent } from './edit-client-info/edit-client-info.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'home', component: MainScreenComponent, canActivate: [AuthGuard]},
  { path: 'editclient/:id', component: EditClientInfoComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: 'login', pathMatch: 'full'},
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
