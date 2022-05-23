import React, { useState } from 'react';
import firebase from "./utils/Firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import { Auth } from "./pages/Auth/Auth";
import 'semantic-ui-css/semantic.min.css';

const App = () => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const auth = getAuth();
  onAuthStateChanged(auth, (currentUser) => {
      ( !currentUser ) ? setUser(null) : setUser(currentUser);
      setLoading(false);
  });

  if( loading ) {
    return null;
  }
  
  return (
    (user) ? <UserLogged /> : <Auth />
  );
}

const UserLogged = () => {

  const logout = () => {
      signOut();
  }
  
  return (

      <div style={{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"column",
        height:"100vh"
      }}>
        <h1>Usuario Loggeado</h1>
        <button onClick={logout}>Cerrar Seccion</button>
      </div>
  );
}


export default App;
