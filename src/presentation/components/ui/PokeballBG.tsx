import {Image, ImageStyle, StyleProp} from 'react-native';
import {useThemeContext} from '../../hooks';

interface Props {
  style?: StyleProp<ImageStyle>;
}

export const PokeballBG = ({style}: Props) => {
  const {isDark} = useThemeContext();

  const pokeballImg = isDark ? require('../../../assets/pokeball-light.png') : require('../../../assets/pokeball-dark.png');

  return <Image source={pokeballImg} style={[{width: 300, height: 300, opacity: 0.3}, style]} />;
};
