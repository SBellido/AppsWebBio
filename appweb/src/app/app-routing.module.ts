import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { HomeComponent } from './components/home/home.component';
import { InstructionsCreativityComponent } from './components/instructionsCreativity/instructionsCreativity.component';
import { TestCreativityComponent } from './components/testCreativity/testCreativity.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SelectTestComponent } from './components/select-test/select-test.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'instructions-creativity',
        component: InstructionsCreativityComponent,
      },
      {
        path: 'test-creativity',
        component: TestCreativityComponent,
      },
    ]
  },
  {
    path: 'select-test',
    component: SelectTestComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

