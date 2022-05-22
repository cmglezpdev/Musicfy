import React from 'react';
import firebase from "./utils/Firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const App = () => {
  
  const auth = getAuth();
  onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser ? "Estamos logeados" : "No estamos logeados");
  });

  return (
    <div>
      <h1>App Electron + React + Firebase</h1>
    </div>
  );
}

export default App;
