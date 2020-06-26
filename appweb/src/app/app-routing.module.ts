import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

// import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { InstructionsCreativityComponent } from './components/instructionsCreativity/instructionsCreativity.component';
import { SelectTestComponent } from './components/select-test/select-test.component';


const routes: Routes = [
  {
    path: 'instructions-creativity',
    component: InstructionsCreativityComponent,
  },
  {
    path: 'test-creativity',
    // routea un modulo
    loadChildren: () => import('./components/testCreativity/testCreativity.module')
      .then(m => m.TestCreativityModule)
  },
  {
    path: 'select-test',
    component: SelectTestComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
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
  imports: [RouterModule.forRoot(routes, {
    // estrategia de precarga, ayuda al navegador con la carga de archivos js
    preloadingStrategy: PreloadAllModules
  }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }

