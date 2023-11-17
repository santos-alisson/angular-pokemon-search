export interface Pokemon {
  name: string;
  pokedexIndex: number;
  spriteUrl: string;
  totalHp?: number;
  currentHp?: number;
  types?: Array<string>;
}