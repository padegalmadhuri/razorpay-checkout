import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { PaySuccessComponent } from './pay-success/pay-success.component';

const routes: Routes = [{
  path:"",
  component:ProductsComponent
},{
  path:"payment-successfull",
  component:PaySuccessComponent
}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
