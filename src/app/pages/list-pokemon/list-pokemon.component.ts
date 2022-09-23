import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.css']
})
export class ListPokemonComponent implements OnInit {
  pokemons: any[] = [];
  filteredPokemons: any[] = [];
  page: number = 1;
  filter: string = '';
  order: string = 'order';

  constructor(
    private pokemonService: PokemonService
  ) { }

  ngOnInit() {
    this.getAllpokemon()
  }

  getAllpokemon() {
    this.pokemonService.getAllpokemon()
    .subscribe((response: any) => {
      response.results.forEach((result: any) => {
        this.pokemonService.getMorePokemon(result.name).subscribe((responsePokemon: any) => {
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
