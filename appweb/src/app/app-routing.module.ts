import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  // routea modulos
  {
    path: 'home',
    loadChildren: () => import('./home/home.module')
      .then(m => m.HomeModule)
  },
  {
    path: 'select-test',
    loadChildren: () => import('./select-test/select-test.module')
    .then(m => m.SelectTestModule)
  },
  {
    path: 'instructions-creativity/:code',
    loadChildren:  () => import('./instructions-creativity/instructions-creativity.module')
    .then(m => m.InstructionsCreativityModule)
  },
  {
    path: 'personal-info',
    loadChildren: () => import('./personal-info/personal-info.module')
    .then(m => m.PersonalInfoModule)
  },
  {
    path: 'message-ok-prev-test',
    loadChildren: () => import('./message-ok-prev-test/message-ok-prev-test.module')
    .then(m => m.MessageOkPrevTestModule)
  },
  {
    path: 'test-creativity',
    loadChildren: () => import('./testCreativity/testCreativity.module')
    .then(m => m.TestCreativityModule)
  },
  {
    path: 'test-result',
    loadChildren: () => import('./test-result/test-result.module')
    .then(m => m.TestResultModule)
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

