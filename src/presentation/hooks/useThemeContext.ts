import {useContext} from 'react';
import {ThemeContext} from '../context/ThemeContext';

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (!context) throw new Error('ThemeContext should be used within a ThemeContextProvider');

  return context;
};
