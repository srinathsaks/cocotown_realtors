import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects/projects.component';


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, 
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'projects/srn', component: ProjectsComponent },
    { path: 'contact', component: ContactComponent }

];
@NgModule({
    // declarations:[
    //         AppComponent
    //         // HomeComponent,
    //         // AboutComponent,
    //         // ContactComponent
    // ],
    imports: [RouterModule.forRoot(routes, {enableTracing:true}),
            FormsModule,
            CommonModule
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  export const aboutlist = {AboutComponent, ContactComponent}

