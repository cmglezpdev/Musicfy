import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Auth } from "./pages";
import { LoggedLayout } from './layouts';
import { LogoutInFirebase, setUserInSotre } from './actions/authActions';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const App = () => {

  const { currentUser:user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
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
      {( user ) ? <LoggedLayout /> : <Auth />}
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
