import {FlatList, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {globalTheme} from '../../../config/theme/global-theme';
import {ActivityIndicator, Text, TextInput} from 'react-native-paper';
import {PokemonCard} from '../../components/pokemons';
import {useQuery} from '@tanstack/react-query';
import {getPokemonNamesWithId, getPokemonsByIds} from '../../../actions/pokemons';
import {useMemo, useState} from 'react';
import {FullScreenLoader} from '../../components/ui';
import {useDebounce} from '../../hooks';

export const SearchScreen = () => {
  const {top} = useSafeAreaInsets();
  const [term, setTerm] = useState('');
  const {value} = useDebounce(term);
  const {isLoading, data: pokemonNameList} = useQuery({
    queryKey: ['pokemons', 'all'],
    queryFn: () => getPokemonNamesWithId(),
  });

  const pokemonNameIdList = useMemo(() => {
    if (!pokemonNameList) return [];

    if (value.length === 0) return [];

    if (!isNaN(Number(value))) {
      const pokemon = pokemonNameList.find(pokemon => pokemon.id === Number(value));
      return pokemon ? [pokemon] : [];
    }

    if (value.length < 2) return [];

    return pokemonNameList.filter(pokemon => pokemon.name.includes(value.toLowerCase()));
  }, [value]);

  const {data = [], isLoading: isLoadingPokemons} = useQuery({
    queryKey: ['pokemons', 'by', pokemonNameIdList],
    queryFn: () => getPokemonsByIds(pokemonNameIdList.map(pokemon => pokemon.id)),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <FullScreenLoader />;

  return (
    <View style={[globalTheme.globalMargin, {paddingTop: top + 10}]}>
      <TextInput
        placeholder="Buscar Pokémon"
        mode="flat"
        autoFocus
        autoCorrect={false}
        onChangeText={setTerm}
        value={term}
      />
      {isLoadingPokemons && <ActivityIndicator style={{paddingTop: 20}} />}

      <FlatList
        data={data}
        keyExtractor={(item, i) => `${item.id}+${i}`}
        numColumns={2}
        renderItem={({item: pokemon}) => <PokemonCard pokemon={pokemon} />}
        style={{paddingTop: top + 20}}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{height: 120}} />}
      />
    </View>
  );
};
