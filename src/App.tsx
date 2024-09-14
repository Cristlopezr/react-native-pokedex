import {StackNavigator} from './presentation/navigator';
import {ThemeContextProvider} from './presentation/context/themeContext';

export const App = () => {
  return (
    <ThemeContextProvider>
      <StackNavigator />
    </ThemeContextProvider>
  );
};
