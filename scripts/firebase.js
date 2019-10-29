  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDlsEOHYbGrBq5rjFWD6fd5u4BFt1RI5cE",
    authDomain: "myblog-20a1c.firebaseapp.com",
    databaseURL: "https://myblog-20a1c.firebaseio.com",
    projectId: "myblog-20a1c",
    appId: "1:144592108694:web:cc2924c881c18a179256b7",
    measurementId: "G-RJL8NRT88W"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  //make auth and firestore references
  const auth = firebase.auth();
  const db = firebase.firestore();
  const functions = firebase.functions();