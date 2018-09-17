
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDehVTK8bKydeja68w3D1UaMgoMtJJ73Ck",
    authDomain: "test-5e833.firebaseapp.com",
    databaseURL: "https://test-5e833.firebaseio.com",
    projectId: "test-5e833",
    storageBucket: "test-5e833.appspot.com",
    messagingSenderId: "635088554189"
  };
  firebase.initializeApp(config);

var ref = firebase.database().ref();                           
ref.on("value", function(snapshot){
    var info = snapshot.val()
    console.log(info.sxdscx)
    document.getElementById("data").innerHTML = info.sxdscx;
});