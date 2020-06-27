import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/components/page-not-found.component';


const routes: Routes = [
  {
    path: 'instructions-creativity',
    loadChildren:  () => import('./instructions-creativity/instructions-creativity.module')
      .then(m => m.InstructionsCreativityModule)
  },
  {
    path: 'test-creativity',
    // routea un modulo
    loadChildren: () => import('./testCreativity/testCreativity.module')
      .then(m => m.TestCreativityModule)
  },
  {
    path: 'select-test',
    loadChildren: () => import('./select-test/select-test.module')
      .then(m => m.SelectTestModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module')
      .then(m => m.HomeModule)
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadChildren: () => import('./page-not-found/page-not-found.module')
      .then(m => m.PageNotFoundModule)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // estrategia de precarga, ayuda al navegador con la carga de archivos js
    preloadingStrategy: PreloadAllModules
  }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }

