import React,{useState,useEffect} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar,TouchableOpacity, Alert } from 'react-native';

import db from '../config/db'
// autenticacao e logout  firebase
//importação do firebase 

import { getAuth, signOut } from "firebase/auth";

import { collection,  query, onSnapshot,deleteDoc, doc,}  from "firebase/firestore";

import {MaterialCommunityIcons} from '@expo/vector-icons'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import {faBrazilianRealSign} from '@fortawesome/free-solid-svg-icons' 



export default function Home({navigation,route}){
  const[produtos,setProdutos]=useState([])

  const deletar=(idProduto)=>{
    //Alert.alert("produto deletado com sucesso","id:"+idProduto)

    Alert.alert(
      "Deletar Produto",
      "Tem certeza que quer excluir o produto?",
      [
        // se clicar no cancelar nada acontece
        {
          text: "Cancelar",
          //onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        // se clicar no sim, deleta o produto
        { text: "Sim", onPress: () =>  deleteDoc(doc(db, "produtos",idProduto)) }
      ]
    );
    
  }

  function logout (){
    const auth = getAuth();
    signOut(auth).then(() => {
        // logout  deu certo
        // redireciona para tela de login 
        navigation.navigate('LoginUsuario')

    }).catch((error) => {
        // se um erro aconteceu
    }); 
}

  // funcao que faz a busca dos dados do documento produtos 
  async function busca (){
    try{
      const consulta=query(collection(db,"produtos"))
      const arrays=onSnapshot(consulta,(QuerySnapshot)=>{
        const lista=[]
        // for each do select
        QuerySnapshot.forEach(doc => {
           lista.push({...doc.data(),id:doc.id});
        });
   
        // preenchendo hook dos produtos com a lista do select
        setProdutos(lista)
        console.log(lista)
        console.log("rodando")
   
      })
    }
    catch(err){
      console.log('erro:'+err)
    }
    
  }
  useEffect(()=>{
    busca()
   },[])

   
  return(
    <View style={styles.container}>
      {/* ao tirar a flatlist some o erro*/ }
      
      <TouchableOpacity style={styles.ButaoAdd} onPress={()=>{
        navigation.navigate("Cadastrar")
      }}>
       <Text style={styles.texto}>  <MaterialCommunityIcons name="plus" size={30} color="#fff" /> </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.ButaoAddLogout} onPress={logout}>
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
  ButaoAdd:{
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
  ButaoAddLogout:{
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
  },
  ProdutosFlatlist:{
    width:'100%', // cada produto vai ocupar 100% da tela
    marginTop:20,
    marginLeft:'auto',
    marginRight:'auto',
    
  },
  StyleProdutos:{
    backgroundColor:'#f5f5f5cf',
   
  },
  textoDados:{
    marginBottom:10,
    marginTop:10,
    marginRight:10,
    color:'#000',
    fontWeight:'bold'
  },
  StyleInfo:{
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row'
  },
  icones:{
    justifyContent:'space-between',
    flexDirection:'row',
    marginLeft:15,
    marginRight:15
  },
  iconePreco:{
    flexDirection:'row',
    // alinha o iconde de real ao valor 
    justifyContent:'center',
    alignItems:'center'
  }

});

