import firebase from 'firebase';

const fbConfig = {
    apiKey: "AIzaSyCeQSPmKuUDXHElg_10acCYp8ycP3U1ygU",
    authDomain: "react-realtime-todo-bbb8b.firebaseapp.com",
    databaseURL: "https://react-realtime-todo-bbb8b.firebaseio.com",
    projectId: "react-realtime-todo-bbb8b",
    storageBucket: "react-realtime-todo-bbb8b.appspot.com",
    messagingSenderId: "318755490705"
  };

const fire = firebase.initializeApp(fbConfig);

export {fire as default, fbConfig};