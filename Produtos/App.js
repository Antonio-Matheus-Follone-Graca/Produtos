import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// importando telas

import Home from './src/pages/Home'

import Cadastrar from './src/pages/Cadastrar'

import Alterar from './src/pages/Alterar'

import CadastrarUsuario from "./src/pages/CadastrarUsuario";

import LoginUsuario from './src/pages/LoginUsuario'

const Stack= createNativeStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CadastrarUsuario">
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

      <Stack.Screen name="Alterar"
          component={Alterar}
          options={{
            headerTintColor:'#f92e6a'
          }}
        />

      <Stack.Screen name="Criar conta"
          component={CadastrarUsuario}
          options={{
            headerTintColor:'#f92e6a',
            headerShown:'false'
           
          }}
        />

        <Stack.Screen name="LoginUsuario"
          component={LoginUsuario}
          options={{
            headerTintColor:'#f92e6a',
            headerShown:'false'
           
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}