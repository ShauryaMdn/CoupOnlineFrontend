import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JoinGameComponent, GameComponent } from './components';
import { ROUTES } from './constants';


const routes: Routes = [
  {path: ROUTES.JOIN, component: JoinGameComponent},
  {path: ROUTES.GAME + '/:gameId', component: GameComponent},
  {path: '', redirectTo: ROUTES.JOIN, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
