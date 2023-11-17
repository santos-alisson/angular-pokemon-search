import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonComponent } from './shared/components/pokemon/pokemon.component';
import { PokemonBattleComponent } from './pokemon-battle/pokemon-battle.component';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from './shared/pipes/capitalize.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CapitalizePipe,
    PokemonComponent,
    PokemonBattleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
