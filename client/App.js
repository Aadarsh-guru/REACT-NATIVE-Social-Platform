import { StatusBar } from 'react-native';
import RootNavigation from './RootNavigation'
import { NavigationContainer } from '@react-navigation/native';

export default function App() {

  return (
    <NavigationContainer>
      <RootNavigation />
      <StatusBar barStyle={'dark-content'} />
    </NavigationContainer>
  );
}