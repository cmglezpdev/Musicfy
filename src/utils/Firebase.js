import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC2gaH698LItwaXDmKTUqRfxgi0ZHU8DZk",
    authDomain: "musicfy-51048.firebaseapp.com",
    projectId: "musicfy-51048",
    storageBucket: "musicfy-51048.appspot.com",
    messagingSenderId: "41140408520",
    appId: "1:41140408520:web:bed0292c24c87d8703d5fd"
};

export const firebaseApp = initializeApp(firebaseConfig);