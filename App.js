import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './views/HomeScreen';
import ScannerScreen from './views/ScannerScreen';
import SaveItem from './views/SaveItem';
import Item from './views/Item';

const Stack = createNativeStackNavigator();


export default function App() {


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name='Scanner' component={ScannerScreen} />
        <Stack.Screen name='SaveItem' component={SaveItem} />
        <Stack.Screen name='Item' component={Item} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
