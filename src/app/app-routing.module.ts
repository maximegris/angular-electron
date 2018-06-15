import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from "./components/login/login.component";
import { OrdersComponent } from "./components/orders/orders.component";
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'home',
        component: OrdersComponent
    },
    {
        path: '',
        component: LoginComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
