import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: 'customer', redirectTo: 'customer/index', pathMatch: 'full'},
  { path: 'customer/index', component: IndexComponent },
  { path: 'customer/:postId/view', component: ViewComponent },
  { path: 'customer/create', component: CreateComponent },
  { path: 'customer/:postId/edit', component: EditComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
