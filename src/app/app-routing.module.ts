import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyProfileComponent } from './my-profile/my-profile.component';

const appRoute: Routes = [
  { path: '', loadChildren: () => import('./sell/sell.module').then(m => m.SellModule) },
  { path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },
  { path: 'payment', loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule) },
  { path: 'purchase', loadChildren: () => import('./purchase/purchase.module').then(m => m.PurchaseModule) },
  { path: 'sell', loadChildren: () => import('./sell/sell.module').then(m => m.SellModule) },
  { path: 'my-profile', component: MyProfileComponent },
  { path: '**', redirectTo: '/sell', pathMatch: 'full' }
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoute)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
