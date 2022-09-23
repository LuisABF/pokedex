import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Pokedex, Pokemon } from '../models/pokedex';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
    private http: HttpClient
  ) {
  
  }

  getMorePokemon(name: string){
    return this.http.get<Pokemon>(`${GLOBAL.url}/${name}`);
  }

  getAllpokemon(){
    return this.http.get<Pokedex>(`${GLOBAL.url}/?limit=151`);
  }
}
