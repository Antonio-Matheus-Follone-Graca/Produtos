import React,{useState,useEffect} from 'react';
import {
    StyleSheet, 
    Text, 
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    StatusBar
   } from 'react-native';

   
import {MaterialCommunityIcons} from '@expo/vector-icons'

// importando firebase
import db from '../config/db'

import { getAuth, signInWithEmailAndPassword,onAuthStateChanged   } from "firebase/auth";

export default  function LoginUsuario({navigation}){
    const [email,setEmail]=useState('teste@gmail.com')
    const [password,setPassword]=useState('123456')
    return (<View style={styles.container}>
            <View style={styles.formulario}> 
            <TextInput placeholder='Nome do produto'
            value={email}
            onChangeText={setEmail}
            style={styles.inputs}
          />
            </View>
        </View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#FFF',
    alignItems:'center'
   
  },
  formulario:{
    paddingTop:25
  },
  inputs:{
    backgroundColor:'#000',
    borderBottomWidth:1,
    borderBottomColor:'#f92e6a',
    marginTop:10, // espaçamento entre os campos
    marginBottom:15,
    padding:10,
    height:50,
    width:300, // largura dos campos
    marginLeft:"auto",
    marginRight:"auto",
    color:'#4d5156' // cinza escuro
  },
})


  