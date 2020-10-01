import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { DetailsComponent } from './details.component';
import { CreateComponent } from './create.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'create', component: CreateComponent },
            { path: ':itemid', component: DetailsComponent }            
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ItemRoutingModule { }