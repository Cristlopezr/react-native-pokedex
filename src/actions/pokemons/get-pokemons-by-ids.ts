import {Pokemon} from '../../domain/entities';
import {getPokemonById} from './get-pokemon-by-id';

export const getPokemonsByIds = async (ids: number[]): Promise<Pokemon[]> => {
  try {
    console.log('Fetching');
    const pokemonPromises: Promise<Pokemon>[] = ids.map(id => getPokemonById(id));

    return Promise.all(pokemonPromises);
  } catch (error) {
    throw new Error(`Error getting pokemons by ids ${ids}`);
  }
};
