import React,{useState, useEffect} from 'react'
import {
  StyleSheet, 
  Text, 
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Alert
 } from 'react-native';

 // importando icones

import {MaterialCommunityIcons} from '@expo/vector-icons'

import {StatusBar} from 'react-native';

// importando firebase

import db from '../config/db'

// imports do firebase responsaveis pelo login  e criar usuario

import { getAuth, signInWithEmailAndPassword,onAuthStateChanged,createUserWithEmailAndPassword} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";


// imports do firebase para cadastro do usuario 



export default function LoginECadastro({navigation}) {
  // hooks dos campos do formulario 
  const [email,setEmail]=useState('teste2@gmail.com')
  const [password,setPassword]=useState('123456')
  const [nome,setNome]=useState('USUARIO TESTE')
  const[error,setError]=useState('')
 

  // funcao de validar campos 

  const validar=()=>{
    if(nome===''){  
      setError("Preencha o campo nome")
      return false
    }
     // fazendo as VALIDAÇÕES do formulario
    else if (email==='' || (!email.includes('@'))){
        setError("Email incorreto")
        return false
        }
    else if(password===''){
        setError("Senha vazia")
        return false
      }
    else if(password.length<6){
        setError("Senha deve ser de no mínimo 6 caracteres")
        return false
      }
    else{
     
      return true
    }
  }
  
  const Cadastro=()=>{
    const auth = getAuth();
    if(!validar()){
     return null 
    }
    else
    {
       
          // código do cadastro
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // se o usuario foi criado com sucesso
            let user = userCredential.user;
              // redirecionando para a tela de login 
              navigation.navigate("Home",{
                idUser:user.uid
              }) 
             /*,{
                idUser:user.uid, // pegando id do usuario logado
                nomeUsuarioLogado:nome,
            })*/
         })
          .catch((error) => {
            if(password.length<6){
              setError("senha deve ser de no minimo 6 caracteres ")
          }
            if(email.includes('@')){
              setError("email em uso, use outro  ")
            }
              let errorCode = error.code;
              let errorMessage = error.message;
              setError(errorMessage)
                
            });
        
    }
  
   
  }

  /*useEffect(()=>{
    // ao carregar a tela verifica se o usuario esta logado
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) { 
          // se o usuario estiver conectado  o rediciona para a home
          navigation.navigate("Home",{
            idUser:user.uid, // pegando id do usuario logado
            nomeUsuarioLogado:nome,
        })
        } 

    });

},[]);*/
  return (
   
  <KeyboardAvoidingView style={styles.container}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
     <StatusBar/>
      <Text style={styles.title}> Criar conta </Text>
        <TextInput placeholder='Nome'
            onChangeText={(nome) => setNome(nome)}
            value={nome}
            style={styles.input}
        /> 
      <TextInput placeholder='Email'
        onChangeText={(email) => setEmail(email)}
        value={email}
        style={styles.input} />
      <TextInput placeholder='Senha'
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
        value={password}
        style={styles.input} />
     
      {error ?
        <TouchableOpacity onPress={() => {
          setError(false);
        } }
        >
          <View style={styles.contentAlert}>
            <MaterialCommunityIcons name={'alert-circle'}
              color='#721c24'
              size={24} />
            <Text style={styles.warningAlert}>
              {error}
            </Text>

            <Text style={styles.clearErrorText}> X</Text>


          </View>


        </TouchableOpacity>
        : null}
      <TouchableOpacity style={styles.Button} onPress={Cadastro}>

        <Text style={styles.textLogin}>Cadastrar   </Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row" }}>
        <Text> 'Já possui uma conta?'  </Text>
        <TouchableOpacity style={styles.Link} onPress={() => {
         navigation.navigate('LoginUsuario')
        
        } }>
          <Text style={styles.textLink}> clique aqui para logar   </Text>
        </TouchableOpacity>

      </View>

    </KeyboardAvoidingView>
    
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    // eixo centro
    alignItems: 'center',
    justifyContent: 'center',
    // pois está havendo uma sobreposição do texto á status bar, por isso peguei a altura do status bar e dei um padding top
    // no android usa status bar por isso se a plataforma for android pega  a altura da status bar
    paddingTop: Platform.OS =='android' ? StatusBar.currentHeight : 0    
  },
  title:{
    color:'#f92e6a',
    fontSize:25,
  },
  input:{
    marginTop:15,
    borderBottomWidth:1,
    borderBottomColor:'#f92e6a',
    width:300,
    padding:20,
    paddingBottom:5, // para o texto não ficar muito longe da liha do campo
    marginLeft:'auto',
    marginRight:'auto',
    
  },
  Button:{
    marginTop:15,
    backgroundColor:'#f92e6a',
    color:'#FFF',
    width:150,
    height:50,
    borderRadius:30,
    alignItems:'center',
    justifyContent: 'center',
    marginBottom:10
  },
  textLogin:{
    color:'#FFF'
  },
  Link:{
    marginBottom:10
  },
  textLink:{
    color:'#0000FF',
    textDecorationLine: "underline"
  },
  contentAlert:{
    marginTop:20,
    flexDirection:'row',// para o icone ficar alinhado ao texto
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#f8d7da', // rosa forte  do bootstrap,
    padding:20
},
warningAlert:{
  paddingLeft:10,
  color:'#721c24', // cor vermelha do bootstrap
  fontSize:12,
},
clearErrorText:{
  color:'#721c24',
  fontWeight:'bold',
  fontSize:20
},

});
