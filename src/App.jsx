import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { ToastContainer } from 'react-toastify';
import { Auth } from "./pages/Auth/Auth";
import { LoggedLayout } from './layouts/Logged/LoggedLayout';

const App = () => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [,setReloadApp] = useState(false);


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
    <Provider store={store}>      
      {(user) ? <LoggedLayout user={user} setReloadApp={setReloadApp} /> : <Auth />}
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
    </Provider>
  )
}

export default App;



// TODO: Crear context con el user y el setReloadApp