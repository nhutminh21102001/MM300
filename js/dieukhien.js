  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBYgGuPlBm0mPVJt3SqOfhNBZUd_wbb2N0",
    authDomain: "mm300-2df21.firebaseapp.com",
    databaseURL: "https://mm300-2df21-default-rtdb.firebaseio.com",
    projectId: "mm300-2df21",
    storageBucket: "mm300-2df21.appspot.com",
    messagingSenderId: "162320643708",
    appId: "1:162320643708:web:270ae8da246126513abbf9",
    measurementId: "G-RQ0VQ2ET1J"
  };
    
    firebase.initializeApp(firebaseConfig);
    var database = firebase.database();
 
    var btn_on= document.getElementById("chay");
    var btn_off= document.getElementById("dung");
    var btn_auto= document.getElementById("flexRadioDefault1");
    var btn_manual= document.getElementById("flexRadioDefault2");

    database.ref("/AutoManual").on("value", function (snapshot) {

    var AutoManual= snapshot.val();
    if( AutoManual== "1"){
      btn_auto.checked = true
    btn_on.onclick=function(){
      console.log("On")
        const data = {
          Start: 1,
          Stop: 0
        }
        database.ref().update(data)
    }
    btn_off.onclick=function(){
      console.log("On")
        const data = {
          Start: 0,
          Stop: 1
        }
        database.ref().update(data)
    }
  } else {
      btn_manual.checked = true
      btn_on.onclick=function(){ alert('Vui lòng chuyển sang chế độ Auto')}
      btn_off.onclick=function(){ alert('Vui lòng chuyển sang chế độ Auto')} 
    
    } });

    btn_auto.onclick=function(){
      console.log("On")
        const data = {
            AutoManual:1
        }
        database.ref().update(data)
    }
    btn_manual.onclick=function(){
      console.log("On")
        const data = {
          AutoManual:0
        }
        database.ref().update(data)
    }

    database.ref("/Start").on("value", function (snapshot) {
      var start= snapshot.val();
      if(start=="1"){
          document.getElementById("running").src = "./src/img/xanh_sáng-removebg-preview.png"}
      else document.getElementById("running").src = "./src/img/tắt-removebg-preview.png"
   });
   database.ref("/Stop").on("value", function (snapshot) {
      var stop= snapshot.val();
      if(stop=="1"){
          document.getElementById("stopped").src = "./src/img/tắt_chinsua-removebg-preview.png"}
      else document.getElementById("stopped").src = "./src/img/tắt-removebg-preview.png"
   });

   database.ref("/Stop").on("value", function (snapshot) {
    var stop= snapshot.val();
    if(stop=="1"){
        document.getElementById("hinh_stop").src = "./src/img/anh_stop.png"}
    else document.getElementById("hinh_stop").src = "./src/img/anh_start.png"
 });

  database.ref("/trangthai").on("value", function (snapshot) {
    var trangthai= snapshot.val();
      if(trangthai=="128" || trangthai=="136")
      {
        document.getElementById("hinh_stop").src = "./src/img/anh_stop.png"
        document.getElementById("stopped").src = "./src/img/tắt_chinsua-removebg-preview.png"
        document.getElementById("running").src = "./src/img/tắt-removebg-preview.png"
      }
      else {document.getElementById("hinh_stop").src = "./src/img/anh_start.png"
      document.getElementById("running").src = "./src/img/xanh_sáng-removebg-preview.png"
      document.getElementById("stopped").src = "./src/img/tắt-removebg-preview.png"
    }
});

   database.ref("/Motorload").on("value", function (snapshot) {
    var motorload = snapshot.val();
    document.getElementById("motorload").innerHTML=motorload;
 });

 database.ref("/thermal").on("value", function (snapshot) {
  var therm = snapshot.val();
  document.getElementById("therm").innerHTML=therm;
});

database.ref("/line").on("value", function (snapshot) {
  var line = snapshot.val();
  document.getElementById("line").innerHTML=line;
});

database.ref("/PowerFactor").on("value", function (snapshot) {
   var power_factor = snapshot.val();
   document.getElementById("power_factor").innerHTML=power_factor;
});
