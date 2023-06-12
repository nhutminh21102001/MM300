
         // For Firebase JS SDK v7.20.0 and later, measurementId is optional
         const firebaseConfig = {
         apiKey: "AIzaSyBYgGuPlBm0mPVJt3SqOfhNBZUd_wbb2N0",
         authDomain: "mm300-2df21.firebaseapp.com",
         databaseURL: "https://mm300-2df21-default-rtdb.firebaseio.com",
         projectId: "mm300-2df21",
         storageBucket: "mm300-2df21.appspot.com",
         messagingSenderId: "162320643708",
         appId: "1:162320643708:web:00de52419f5668ff3abbf9",
         measurementId: "G-K4P7V5Z690"
         };
 firebase.initializeApp(firebaseConfig);
 var database = firebase.database();

 database.ref("/tan so").on("value", function (snapshot) {
    var tanso = snapshot.val();
    document.getElementById("tanso").innerHTML=tanso;
 }) ;

 database.ref("/Vab").on("value", function (snapshot) {
    var vab = snapshot.val();
    document.getElementById("vab").innerHTML=vab;
 });

 database.ref("/Vbc").on("value", function (snapshot) {
   var vbc = snapshot.val();
   document.getElementById("vbc").innerHTML=vbc;
});
 
database.ref("/Vca").on("value", function (snapshot) {
   var vca = snapshot.val();
   document.getElementById("vca").innerHTML=vca;
});

 database.ref("/Vaux").on("value", function (snapshot) {
    var vaux = snapshot.val();
    document.getElementById("vaux").innerHTML=vaux;
 });

 database.ref("/Iavg").on("value", function (snapshot) {
   var iavg = snapshot.val();
   document.getElementById("iavg").innerHTML=iavg;
});

database.ref("/Ia").on("value", function (snapshot) {
   var ia = snapshot.val();
   document.getElementById("ia").innerHTML=ia;
});

database.ref("/Ib").on("value", function (snapshot) {
   var ib = snapshot.val();
   document.getElementById("ib").innerHTML=ib;
});

database.ref("/Ic").on("value", function (snapshot) {
   var ic = snapshot.val();
   document.getElementById("ic").innerHTML=ic;
});

database.ref("/Van").on("value", function (snapshot) {
   var van = snapshot.val();
   document.getElementById("van").innerHTML=van;
});

database.ref("/Realpower").on("value", function (snapshot) {
   var real_power = snapshot.val();
   document.getElementById("real_power").innerHTML=real_power;
});

database.ref("/Powerfactor").on("value", function (snapshot) {
   var power_factor = snapshot.val();
   document.getElementById("power_factor").innerHTML=power_factor;
});

database.ref("/ApparentPower").on("value", function (snapshot) {
   var apparent_power = snapshot.val();
   document.getElementById("apparent_power").innerHTML=apparent_power;
});

