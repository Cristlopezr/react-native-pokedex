import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {useThemeContext} from '../../hooks';

export const FullScreenLoader = () => {
  const {
    theme: {colors},
  } = useThemeContext();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background}}>
      <ActivityIndicator color={colors.primary} size={50} />
    </View>
  );
};
