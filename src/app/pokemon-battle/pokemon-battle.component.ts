import { Component, OnInit } from '@angular/core';
import { Subject, map, tap } from 'rxjs';
import { PokemonSharingService } from '../shared/services/pokemon-sharing.service';
import { Pokemon } from '../shared/interfaces/pokemon.interface';
import { PokeapiService } from '../shared/services/pokeapi.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pokemon-battle',
  templateUrl: './pokemon-battle.component.html',
  styleUrls: ['./pokemon-battle.component.scss']
})
export class PokemonBattleComponent implements OnInit{
  
  damageSubject$: Subject<number> = new Subject();
  pokemon?: Pokemon;
  form?: FormGroup;
  isLoading = false;
  showForm = true;

  constructor(
    private pokeApiService: PokeapiService,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      pokemonName: '',
      pokemonIndex: null
    })
  }

  onSubmit(): void {

    let pokemon = {
      index: this.form?.get("pokemonIndex")?.value, 
      name: this.form?.get("pokemonName")?.value 
    };

    if (!pokemon.index && !pokemon.name) {
      return;
    }

    this.isLoading = true;

    this.pokeApiService.getPokemon(pokemon.index || pokemon.name).pipe(
      map((pokemon) => this.mapToBattlePokemon(pokemon))
    ).subscribe((pokemon) => {
      this.pokemon = pokemon;
      this.isLoading = false;
      this.showForm = false;
    });
  } 

  onClickHit(damage: number): void {
    this.damageSubject$.next(damage);
  }

  mapToBattlePokemon(pokemon: any): Pokemon {

    return {
      name: pokemon.name,
      pokedexIndex: pokemon.id,
      spriteUrl: pokemon.sprites.front_default,
      totalHp: pokemon.stats[0].base_stat,
      currentHp: pokemon.stats[0].base_stat,
      types: pokemon.types.map((pokemontype: any) => pokemontype.type.name)
    }
  }
}
