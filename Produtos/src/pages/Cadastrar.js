import React,{useState,useEffect} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar,TouchableOpacity, Alert, TextInput, Button } from 'react-native';

import db from '../config/db'
// importando o que vou usar 

// importacoes do que eu vou usar no firebase 
import { collection, addDoc } from "firebase/firestore";

import {MaterialCommunityIcons} from '@expo/vector-icons'




export default function Cadastrar({navigation,route}){
  const[nomeProduto,setNomeProduto]=useState("")
  const[preco,setPreco]=useState("")
  const[descricao,setDescricao]=useState("")

  const cadastrar=()=>{
    
    const documento=addDoc(collection(db,"produtos"),{
      preco:preco,
      nome:nomeProduto,
      descricao:descricao
    })
    if(documento){
      return true
    }
    else{
      return false
    }
  }
  const validar=()=>{
    // se os campos nome e preço estiverem vazios dar um alerta
    if(nomeProduto===''){
      Alert.alert('Campo nome vazio')
    }
    else if(preco===''){
      Alert.alert('Campo preço vazio')
    }
    
    else{
     // se retornar true é pq deu tudo certo
      if(!cadastrar()){
        Alert.alert('Aconteceu um erro tente novamente')
       
      }
      else{
        navigation.navigate('Home')
      }
    }
  }

  // formatacao para R$ real
  const formatacao=(value)=>{
    // é um regex
    // fazer a formatação ainda 
    setPreco(value)
  }
  
  return(
    <View style={styles.container}>
      <Text style={styles.titulo}> Cadastrar Produto</Text>
        <View style={styles.formulario}> 
          <TextInput placeholder='Nome do produto'
            value={nomeProduto}
            onChangeText={setNomeProduto}
            style={styles.inputs}
          />

          <TextInput placeholder='Preço em reais do produto'
            value={preco}
            onChangeText={( t )=>formatacao( t )}
            keyboardType="numeric"
            style={styles.inputs}
          />
          
          <TextInput placeholder='Descrição(opcional)'
            value={descricao}
            onChangeText={setDescricao}
            style={styles.inputDescricao}
            multiline={true}
            numberOfLines={4}
            maxLength={256}
            
          />
      </View>
      <TouchableOpacity style={styles.button} onPress={validar}>
        <Text style={styles.text}> Cadastrar produto </Text>
      </TouchableOpacity>
    </View>
  )
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
  titulo:{
    paddingTop:25,
    fontSize:25,
    color:'#f92e6a',
    fontWeight:'bold'
  },
  inputs:{
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
  inputDescricao:{
    height:100,
    borderColor:'#f92e6a',
    borderWidth:1,
    paddingLeft:10,
    textAlignVertical: 'top' // para deixar o texto da text area no topo
   
  },
  button:{
    marginTop:15,
    backgroundColor:'#f92e6a',
    padding:15,
    borderRadius:25,
    justifyContent:'center',
    alignItems:'center'
  },
  text:{
    color:'#FFF',
    fontSize:20,
    fontWeight:'bold'
  }


});

