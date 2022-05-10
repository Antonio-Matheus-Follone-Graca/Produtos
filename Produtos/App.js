import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// importando telas

import Home from './src/pages/Home'

import Cadastrar from './src/pages/Cadastrar'

const Stack= createNativeStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home"
          component={Home}
          options={{
            headerTintColor:'#f92e6a'
          }}
        />

      <Stack.Screen name="Cadastrar"
          component={Cadastrar}
          options={{
            headerTintColor:'#f92e6a'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}