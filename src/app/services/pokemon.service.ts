import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
    private http: HttpClient
  ) {
  
  }

  getMorePokemon(name: string){
    return this.http.get(`${GLOBAL.url}/${name}`);
  }

  getAllpokemon(){
    return this.http.get(`${GLOBAL.url}/?limit=151`);
  }
}
