import {pokeApi} from '../../config/api/pokeApi';
import {Pokemon} from '../../domain/entities';
import {PokeAPIPokemon} from '../../infrastructure/interfaces/pokeApi.interfaces';
import {PokemonMapper} from '../../infrastructure/mappers/pokemon.mapper';

export const getPokemonById = async (id: number): Promise<Pokemon> => {
  try {
    const {data} = await pokeApi.get<PokeAPIPokemon>(`/pokemon/${id}`);

    return PokemonMapper.pokeApiPokemonToEntity(data);
  } catch (error) {
    throw new Error(`Error getting pokemon by id: ${id}`);
  }
};
