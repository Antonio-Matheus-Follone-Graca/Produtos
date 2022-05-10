// arquivo que exporta o firebase 
import {initializeApp} from 'firebase/app'

import {
    getFirestore,
    collection, 
    getDocs 
   } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC4psHrFFdamcH76jT8gchcPYH0Q7yIIo8",
    authDomain: "portfolio1-f703e.firebaseapp.com",
    projectId: "portfolio1-f703e",
    storageBucket: "portfolio1-f703e.appspot.com",
    messagingSenderId: "956676142911",
    appId: "1:956676142911:web:daf8dfb030a1102a4b058a"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // iniciando serviços do firebase

  const db=getFirestore(app);
  export default db