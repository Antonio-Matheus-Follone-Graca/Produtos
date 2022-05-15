import React,{useState,useEffect} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar,TouchableOpacity, Alert, TextInput, Button } from 'react-native';

import db from '../config/db'
// importando o que vou usar 

// importacoes do que eu vou usar no firebase 
import { doc, updateDoc } from "firebase/firestore";






export default function Alterar({navigation,route}){

    let idProduto=route.params.idProduto
    const[nomeProduto,setNomeProduto]=useState(route.params.nomeProduto)
    const[preco,setPreco]=useState(route.params.preco)
    const[descricao,setDescricao]=useState(route.params.descricao)

  function editar(descricaoNova,idProduto,precoNovo,nomeProduto){
    // doc(banco de dados, documento e parametro){
        // campo que quero mudar 
    //}
    /*updateDoc(doc(db,"produtos",idProduto),{
        descricao:descricaoNova,
        preco:precoNovo,
        nome:nomeProduto
    })
    navigation.navigate('Home')*/
    
  
}



  // formatacao para R$ real
  const formatacao=(value)=>{
    // é um regex
    // fazer a formatação ainda 
    setPreco(value)
  }
  
  return(
    <View style={styles.container}>
      <Text style={styles.titulo}> Alterar Produto</Text>
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
      <TouchableOpacity style={styles.button} onPress={editar(descricao,idProduto,preco,nomeProduto)}>
        <Text style={styles.text}> Atualizar  </Text>
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

