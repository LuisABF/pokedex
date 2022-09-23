import { Component, OnInit } from '@angular/core';
import { Pokedex, PokedexResult, Pokemon} from 'src/app/models/pokedex';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.css']
})
export class ListPokemonComponent implements OnInit {
  pokemons: Pokemon[] = [];
  filteredPokemons: Pokemon[] = [];
  page: number;
  filter: string;
  order: string;

  constructor(
    private pokemonService: PokemonService
  ) { 
    this.filter = '';
    this.page  = 1;
    this.order = 'order';
   }

  ngOnInit() {
    this.getAllpokemon()
  }

  getAllpokemon() {
    this.pokemonService.getAllpokemon()
    .subscribe((response: Pokedex) => {
      response.results.forEach(async (result: PokedexResult) => {
        await this.pokemonService.getMorePokemon(result.name).subscribe((responsePokemon: Pokemon) => {
          this.pokemons.push(responsePokemon);
          this.filteredPokemons.push(responsePokemon);
        })
      });
    });
  }

  search() {
    this.filteredPokemons = this.pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(this.filter.toLowerCase()));
    this.orderBy();
    this.page = 1;
  }

  orderBy() {
      this.filteredPokemons.sort(this.compareFunction.bind(this));
  }

  deletePokemon(orden: number) {
    const index = this.pokemons.findIndex((pokemon) => pokemon.order == orden);
    this.pokemons.splice(index, 1);
    this.search()
  }

  compareFunction(pokemonA: any, pokemonB: any) {
    let valueA;
    let valueB;
    if (this.order === 'type') {
      valueA = pokemonA.types[0].type.name;
      valueB = pokemonB.types[0].type.name;
    } else {
      valueA = pokemonA[this.order];
      valueB = pokemonB[this.order];
    }
    if (valueA > valueB) {
      return 1;
    }
    if (valueA < valueB) {
      return -1;
    }
    return 0;
  }

}
