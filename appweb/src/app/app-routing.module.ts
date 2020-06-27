import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


// import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './home/components/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InstructionsCreativityComponent } from './instructions-creativity/components/instructionsCreativity.component';
import { TestCreativityComponent } from './testCreativity/components/testCreativity.component';
import { SelectTestComponent } from './components/select-test/select-test.component';


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
    component: SelectTestComponent,
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

