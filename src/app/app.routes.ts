import { Routes, RouterModule, provideRouter } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { LoginsComponent } from './logins/logins.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';


export const routes: Routes = [
    { path: '', redirectTo: '/logins', pathMatch: 'full' }, 
    { path: 'logins', component: LoginsComponent },
    {path: 'home', component: HomeComponent},
    { path: 'dashboard', component: DashboardComponent },
    { path: 'post/:id', component: PostDetailsComponent },

];
@NgModule({
    // declarations:[
    //         AppComponent
    //         // HomeComponent,
    // ],
    imports: [RouterModule.forRoot(routes, {enableTracing:true}),
            FormsModule,
            CommonModule
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  export const aboutlist = {LoginsComponent}

