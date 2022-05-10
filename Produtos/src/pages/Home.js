import React,{useState,useEffect} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar,TouchableOpacity, Alert } from 'react-native';

import db from '../config/db'
// autenticacao e logout  firebase
//importação do firebase 

import { getAuth, signOut } from "firebase/auth";

import { collection,onSnapshot,doc, query } from 'firebase/firestore';

import {MaterialCommunityIcons} from '@expo/vector-icons'


export default function Home({navigation,route}){
  const[produtos,setProdutos]=useState([])
  useEffect(()=>{
    const consulta=query(collection(db,"Produto"))
    const arrays=onSnapshot(consulta,(QuerySnapshot)=>{
      const lista=[]
      // for each do select
      QuerySnapshot.forEach(doc => {
         lista.push({...doc.data(),id:doc.id});
      });
 
      // preenchendo hook dos produtos com a lista do select
      setProdutos(lista)
      console.log("produtos:"+lista)
 
    })
   },[])
  return(
    <View style={styles.container}>
      <TouchableOpacity style={styles.Add} onPress={()=>{
        navigation.navigate("Cadastrar")
      }}>
       <Text style={styles.texto}>  <MaterialCommunityIcons name="plus" size={30} color="#fff" /> </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.ButtonLogout} onPress={()=>{
        Alert.alert("Logout")
      }}>
       <Text style={styles.texto}>  <MaterialCommunityIcons name="logout" size={30} color="#fff" /> </Text>
      </TouchableOpacity>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#FFF',
    //marginTop: StatusBar.currentHeight || 0,
  },
  Add:{
    position:'absolute', // o position absolute ajuda a fixar no rodape do celular
    backgroundColor:'#f92e6a',
    // deixando em formato de circulo 
    width:60,
    height:60,
    borderRadius:50,
    // fim 
    justifyContent:'center',
    alignItems:'center',
    bottom:40,
    left:20,
  },
  ButtonLogout:{
    position:'absolute', // o position absolute ajuda a fixar no rodape do celular
    backgroundColor:'#f92e6a',
    // deixando em formato de circulo 
    width:60,
    height:60,
    borderRadius:50,
    // fim 
    justifyContent:'center',
    alignItems:'center',
    bottom:40,
    right:20,
  },
  texto:{
    color:'#fff',
  }

});

