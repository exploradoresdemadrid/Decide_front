import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login', 
  loadChildren: './login/login.module#LoginPageModule' 
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  { path: 'detail-vote', loadChildren: './detail-vote/detail-vote.module#DetailVotePageModule' },
  
  { path: 'detail-vote/:uuid', loadChildren: './detail-vote/detail-vote.module#DetailVotePageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
