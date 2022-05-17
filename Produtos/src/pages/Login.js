/* 
       else{
      if(email===''){
        setError("Email incorreto")
      }
      else if(password===''){
        setError("senha vazia")
      }
      else{
         // funcao de login do firebase 
         signInWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
           //se o usuário foi logado com sucesso
           const user = userCredential.user;
           // redireciona para home
           navigation.navigate("Home",{
            idUser:user.uid, // pegando id do usuario logado
            nomeUsuarioLogado:nome,
            emailLogado:email
        })
         })
         .catch((error) => {
           
           const errorCode = error.code;
           const errorMessage = error.message;
           setError("Email ou senha errados")
         });
        
      }
    }
*/