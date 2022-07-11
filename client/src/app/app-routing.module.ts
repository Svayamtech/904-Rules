import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PropertyComponent } from './components/property/property.component';

const routes: Routes = [
  { path: '', component:HomeComponent },
  { path: 'prop', component:PropertyComponent },
  { path: 'prop/:page', component:PropertyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
