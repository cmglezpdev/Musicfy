import React, { useState } from 'react';
import firebase from "./utils/Firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import { ToastContainer } from 'react-toastify';
import { Auth } from "./pages/Auth/Auth";

const App = () => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const auth = getAuth();
  onAuthStateChanged(auth, (currentUser) => {

    if( !currentUser?.emailVerified ) {
        signOut(auth);
        setUser(null);
    } else {
      setUser( currentUser );
    }
    setLoading(false);
  });

  if( loading ) {
    return null;
  }

  return (
    <>      
      {(user) ? <UserLogged /> : <Auth />}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme={"colored"}
      />
    </>
  )
}

const UserLogged = () => {

  const logout = () => {
      signOut( getAuth() );
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
