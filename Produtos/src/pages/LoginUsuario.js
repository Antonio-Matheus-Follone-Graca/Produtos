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

// imports do firebase responsaveis pelo login 
import { getAuth, signInWithEmailAndPassword,onAuthStateChanged   } from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";



// imports do firebase para cadastro do usuario 



export default function LoginUsuario({navigation}) {
  // hooks dos campos do formulario 
  const [email,setEmail]=useState('teste2@gmail.com')
  const [password,setPassword]=useState('123456')
  const[error,setError]=useState('')
  // hook de mostrar senha


  // funcao de login 
  
  const Login=()=>{
  
       // fazendo as VALIDAÇÕES do formulario
     if (email==='' || (!email.includes('@'))){
        setError("Email incorreto")
        }
    else if(password===''){
        setError("Senha vazia")
      }
    else if(password.length<6){
        setError("Senha deve ser de no mínimo 6 caracteres")
      }
      // código do cadastro
      else{ 
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            //se o usuário foi logado com sucesso
            const user = userCredential.user;
          
            // redireciona para home
            navigation.navigate("Home")
          })
         
          .catch((error) => {
          
            const errorCode = error.code;
            const errorMessage = error.message;
            setError('senha ou email errados')
          });
        
        
       
     
      } 
    
 
  }

  useEffect(()=>{
    // ao carregar a tela verifica se o usuario esta logado
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) { 
          // se o usuario estiver conectado  o rediciona para a home
          navigation.navigate("Home")//{
           /* idUser:user.uid, // pegando id do usuario logado
            nomeUsuarioLogado:nome,
        })*/
        } 

    });

},[]);
  return (
   
  <KeyboardAvoidingView style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
     <StatusBar/>
      <Text style={styles.title}> Login </Text>
        
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
      <TouchableOpacity style={styles.Button} onPress={()=>{Login()}}>

        <Text style={styles.textLogin}>Logar   </Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row" }}>
        <Text> Não possui conta?  </Text>
        <TouchableOpacity style={styles.Link} onPress={() => {
         navigation.navigate('CadastrarUsuario')
        
        } }>
          <Text style={styles.textLink}> crie uma   </Text>
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
    paddingTop: Platform.OS='android' ? StatusBar.currentHeight : null    
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
