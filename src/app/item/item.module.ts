import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ItemRoutingModule } from './item-routing.module';
import { LayoutComponent } from './layout.component';
import { DetailsComponent } from './details.component';
import { CreateComponent } from './create.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ItemRoutingModule
    ],
    declarations: [
        LayoutComponent,
        DetailsComponent,
        CreateComponent
    ]
})
export class ItemModule { }