import { HomeComponent } from './components/home/home.component';
import { NewItemComponent } from './components/new-item/new-item.component';
import { ItemsComponent } from './components/items/items.component';
import { InvoicingComponent } from './components/invoicing/invoicing.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './components/customers/customers.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: 'new-item',
                component: NewItemComponent
            },
            {
                path: 'invoicing',
                component: InvoicingComponent
            },
            {
                path: 'items',
                component: ItemsComponent
            },
            {
                path: 'customers',
                component: CustomersComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
