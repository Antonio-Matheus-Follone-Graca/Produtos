import React,{useState,useEffect} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar,TouchableOpacity, Alert } from 'react-native';

import db from '../config/db'
// autenticacao e logout  firebase
//importação do firebase 

import { getAuth, signOut } from "firebase/auth";

import { collection,onSnapshot,doc, query } from 'firebase/firestore';

import {MaterialCommunityIcons} from '@expo/vector-icons'


export default function Cadastrar({navigation,route}){
  const[produtos,setProdutos]=useState([])
  
  return(
    <View style={styles.container}>
      <Text> Cadastrar</Text>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#FFF',
    //marginTop: StatusBar.currentHeight || 0,
  },


});

