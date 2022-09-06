import React, { useState } from 'react';

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ToastContainer } from 'react-toastify';
import { Auth } from "./pages/Auth/Auth";
import { LoggedLayout } from './layouts/Logged/LoggedLayout';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutInFirebase, setUserInSotre } from './actions/authActions';
import { useEffect } from 'react';

const App = () => {

  const { currentUser:user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [,setReloadApp] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
      console.log("1")
      if( !currentUser?.emailVerified ) {
          dispatch(LogoutInFirebase());
      } else {
        dispatch(setUserInSotre(currentUser));
      }
      setLoading(false);
    });
    // eslint-disable-next-line
  }, [])


  if( loading ) {
    return null;
  }

  return (
    <>      
      {( user ) ? <LoggedLayout setReloadApp={setReloadApp} /> : <Auth />}
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

export default App;
