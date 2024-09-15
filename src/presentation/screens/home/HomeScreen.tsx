import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {FlatList, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {getPokemons} from '../../../actions/pokemons';
import {PokeballBG} from '../../components/ui';
import {globalTheme} from '../../../config/theme/global-theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PokemonCard} from '../../components/pokemons';

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();

  //Forma tradicional de una peticion http
  /*   const {
    data: pokemons = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['pokemons'],
    queryFn: () => getPokemons(0),
    staleTime: 1000 * 60 * 60, //60 minutes
  }); */

  const {data, isLoading, isError, fetchNextPage} = useInfiniteQuery({
    queryKey: ['pokemons', 'infinite'],
    initialPageParam: 0,
    queryFn: params => getPokemons(params.pageParam),
    getNextPageParam: (lastPage, pages) => pages.length,
    staleTime: 1000 * 60 * 60, //60 minutes
  });

  return (
    <View style={globalTheme.globalMargin}>
      <PokeballBG style={styles.imgPosition} />
      <FlatList
        data={data?.pages.flat() ?? []}
        keyExtractor={(item, i) => `${item.id}+${i}`}
        numColumns={2}
        renderItem={({item: pokemon}) => <PokemonCard pokemon={pokemon} />}
        ListHeaderComponent={() => <Text variant="displayMedium">Pokédex</Text>}
        style={{paddingTop: top + 20}}
        onEndReachedThreshold={0.6}
        onEndReached={() => fetchNextPage()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imgPosition: {
    position: 'absolute',
    top: -100,
    right: -100,
  },
});
