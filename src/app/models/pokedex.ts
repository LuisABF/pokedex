export interface Pokemon {
    height:                   number;
    name:                     string;
    order:                    number;
    sprites:                  Sprites;
    stats:                    Stat[];
    types:                    Type[];
    weight:                   number;
}

export interface Type {
    slot: number;
    type: Species;
}

export interface Sprites {
    front_default:      string;
}

export interface Stat {
    base_stat: number;
    effort:    number;
    stat:      Species;
}

export interface Species {
    name: string;
    url:  string;
}

export interface PokedexResult {
    name: string;
    url:  string;
}

export interface Pokedex {
    count:    number;
    next:     string;
    previous: null;
    results:  PokedexResult[];
}
