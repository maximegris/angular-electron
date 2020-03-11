import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DiaryComponent } from './diary.component';

const routes: Routes = [
    {
        path: 'diary',
        component: DiaryComponent
    }
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DiaryRoutingModule { }
