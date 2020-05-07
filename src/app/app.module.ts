import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { MatInputModule } from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JoinGameComponent } from './components';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GameComponent } from './components/game/game.component';
import { configureSocket } from './utils';
import { GameService } from './services';

@NgModule({
  declarations: [
    AppComponent,
    JoinGameComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MatInputModule
  ],
  providers: [
    {provide: APP_INITIALIZER, useFactory: configureSocket, deps: [GameService], multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
