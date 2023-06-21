const MAX_COLUMN_SHOW = 15

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBYgGuPlBm0mPVJt3SqOfhNBZUd_wbb2N0",
  authDomain: "mm300-2df21.firebaseapp.com",
  databaseURL: "https://mm300-2df21-default-rtdb.firebaseio.com",
  projectId: "mm300-2df21",
  storageBucket: "mm300-2df21.appspot.com",
  messagingSenderId: "162320643708",
  appId: "1:162320643708:web:f82e81bd20743b553abbf9",
  measurementId: "G-KVW1G8KHL9"
}

firebase.initializeApp(FIREBASE_CONFIG);
var firestore = firebase.firestore()


const getRowsData = async (number) => {
  const response = await new Promise((resolve, reject) => {
    firestore.collection("data")
      .orderBy("time", "desc")
      .limit(number)
      .get()
      .then((querySnapshot) => {
        const data = []
        querySnapshot.forEach((doc) => {
          data.push(doc.data())
        });
        resolve(data)
      });
  })

  return response.reverse()
}

const toDateTime = (miliSecond) => {
  const date = new Date(miliSecond)
  return `0${date.getDate()}`.slice(-2) + '-' + `0${date.getMonth() +1}`.slice(-2) + '-' + date.getFullYear() + ' ' + `0${date.getHours()}`.slice(-2) + ':' + `0${date.getMinutes()}`.slice(-2)
}
firestore.collection("data")
.onSnapshot(async (snapshot) => {
    const response = await getRowsData(MAX_COLUMN_SHOW)
    const tbodyElement = document.getElementById("tbody")
    let tbodyContent = ''
    response.map((item, index) => {
      tbodyContent += `
      <tr>
        <th scope="row">${index + 1}</th>
        <td scope="col">${item.Vab}</td>
        <td scope="col">${item.Van}</td> 
        <td scope="col">${item.Vaux}</td>
        <td scope="col">${item.Ia}</td>
        <td scope="col">${item.Ib}</td>
        <td scope="col">${item.Ic}</td>
        <td scope="col">${item.Iavg}</td>
        <td scope="col">${item.ApparentPower}</td>
        <td scope="col">${item.Powerfactor}</td>
        <td scope="col">${item.Realpower}</td>
        <td scope="col">${item.Motorload}</td>
        <td scope="col">${item.line}</td>
        <td scope="col">${item.thermal}</td>
        <td scope="col">${item['tan so']}</td>
        <td scope="col">${item.Start}</td>
        <td scope="col">${item.Stop}</td>
        <td scope="col">${item.AutoManual}</td>   
        <td scope="col">${item.trangthai}</td>
        <td scope="col">${toDateTime(item.time)}</td>
      </tr>
    `
    })
    tbodyElement.innerHTML = tbodyContent
}, (error) => {
  console.log(error)
});
