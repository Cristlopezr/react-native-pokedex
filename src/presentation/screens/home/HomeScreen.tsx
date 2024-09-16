import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import {FlatList, StyleSheet, View} from 'react-native';
import {FAB, Text} from 'react-native-paper';
import {getPokemons} from '../../../actions/pokemons';
import {PokeballBG} from '../../components/ui';
import {globalTheme} from '../../../config/theme/global-theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PokemonCard} from '../../components/pokemons';
import {useThemeContext} from '../../hooks';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigator/StackNavigator';

interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'> {}

export const HomeScreen = ({navigation}: Props) => {
  const {top} = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const {
    isDark,
    theme: {colors},
  } = useThemeContext();

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
    queryFn: async params => {
      const pokemons = await getPokemons(params.pageParam);

      pokemons.forEach(pokemon => {
        queryClient.setQueryData(['pokemon', pokemon.id], pokemon);
      });

      return pokemons;
    },
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
      <FAB
        label="Buscar"
        style={[globalTheme.fab, {backgroundColor: colors.primary}]}
        mode="elevated"
        color={isDark ? 'black' : 'white'}
        onPress={() => navigation.push('SearchScreen')}
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
