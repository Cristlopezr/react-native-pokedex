import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';

export const HomeScreen = () => {
  //getPokemons();
  return (
    <View>
      <Text variant="displaySmall">HomeScreen</Text>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => console.log('Pressed')}>
        Press me
      </Button>
    </View>
  );
};
