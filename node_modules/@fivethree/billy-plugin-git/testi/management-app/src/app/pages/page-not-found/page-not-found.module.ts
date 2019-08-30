import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PageNotFoundPage } from './page-not-found.page';

const routes: Routes = [
  {
    path: '',
    component: PageNotFoundPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PageNotFoundPage]
})
export class PageNotFoundPageModule {}
