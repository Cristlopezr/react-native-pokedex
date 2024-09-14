import {pokeApi} from '../../config/api/pokeApi';
import type {Pokemon} from '../../domain/entities';
import type {PokeAPIPaginatedResponse, PokeAPIPokemon} from '../../infrastructure/interfaces/pokeApi.interfaces';
import {PokemonMapper} from '../../infrastructure/mappers/pokemon.mapper';

export const getPokemons = async (page: number, limit: number = 10): Promise<Pokemon[]> => {
  try {
    const url = `/pokemon?offset=${page * limit}&limit${limit}`;

    const {data} = await pokeApi.get<PokeAPIPaginatedResponse>(url);

    const pokemonPromises = data.results.map(info => pokeApi.get<PokeAPIPokemon>(info.url));

    const pokeApiPokemons = await Promise.all(pokemonPromises);

    return pokeApiPokemons.map(item => PokemonMapper.pokeApiPokemonToEntity(item.data));
  } catch (error) {
    throw new Error('Error getting pokemons');
  }
};
