import React,{useState} from 'react';
import {  View,  StyleSheet, Text, TouchableOpacity,  TextInput, Alert } from 'react-native';

import db from '../config/db'
// importando o que vou usar 

// importacoes do que eu vou usar no firebase 
import { doc, updateDoc } from "firebase/firestore";






export default function Alterar({navigation,route}){
    let idProduto=route.params.idProduto
    const[nomeProdutoNovo,setNomeProdutoNovo]=useState(route.params.nomeProdutoNovo)
    const[precoNovo,setPrecoNovo]=useState(route.params.precoNovo)
    const[descricaoNova,setDescricaoNova]=useState(route.params.descricaoNova)

  function editar(descricaoNova,idProduto,precoNovo,nomeProduto){
      if(nomeProduto==='' || precoNovo==='' ){
        Alert.alert("Preencha os campos",'nome e preço')
      }
      else{
       
    updateDoc(doc(db,"produtos",route.params.idProduto),{
        descricao:descricaoNova,
        preco:precoNovo,
        nome:nomeProduto
    })
   // navigation.navigate('Home')
    }
   
    
  
}
 



  // formatacao para R$ real
  const formatacao=(value)=>{
    // é um regex
    // fazer a formatação ainda 
    setPrecoNovo(value)
  }
  
  return(
    <View style={styles.container}>
      <Text style={styles.titulo}> Alterar Produto</Text>
        <View style={styles.formulario}> 
          <TextInput placeholder='Nome do produto'
            value={nomeProdutoNovo}
            onChangeText={setNomeProdutoNovo}
            style={styles.inputs}
          />

          <TextInput placeholder='Preço em reais do produto'
            value={precoNovo}
            onChangeText={( t )=>formatacao( t )}
            keyboardType="numeric"
            style={styles.inputs}
          />
          
          <TextInput placeholder='Descrição(opcional)'
            value={descricaoNova}
            onChangeText={setDescricaoNova}
            style={styles.inputDescricao}
            multiline={true}
            numberOfLines={4}
            maxLength={256}
            
          />
      </View>
      <TouchableOpacity style={styles.button} onPress={()=>editar(descricaoNova,idProduto,precoNovo,nomeProdutoNovo)}>
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

