const SECOND_TO_DRAW = 2 // tính là giây
const MAX_COLUMN_SHOW = 20 // số cột thời gian hiển thị

// ------------------------------------------------------------
var dataLocalR = []
const firebaseConfig = {
  apiKey: "AIzaSyBYgGuPlBm0mPVJt3SqOfhNBZUd_wbb2N0",
  authDomain: "mm300-2df21.firebaseapp.com",
  databaseURL: "https://mm300-2df21-default-rtdb.firebaseio.com",
  projectId: "mm300-2df21",
  storageBucket: "mm300-2df21.appspot.com",
  messagingSenderId: "162320643708",
  appId: "1:162320643708:web:b09047cb7b3786253abbf9",
  measurementId: "G-EXC2ERDQS1"
};

firebase.initializeApp(firebaseConfig);

var chartR = null
const initChart = () => {
  const ctxR = document.getElementById('real_power');
  let dataR = {
    labels: [],
    datasets: [{
      label: 'RealPower',
      data: [],
      fill: false,
      borderColor: '#800000',
      tension: 0.1
    }]
  };
  chartR = new Chart(ctxR, {
    type: 'line', 
    data: dataR,
  });
}

initChart()

const updateChart = (dataRealtime) => {
  if (chartR === null) initChart()
  const resultChain = dataRealtime.map(item => {
    const date = new Date(item.time)
    return (
      {
        value: item.RealPower,
        date: `0${date.getHours()}`.slice(-2) + ':' + `0${date.getMinutes()}`.slice(-2) + ":" + `0${date.getSeconds()}`.slice(-2)
      }
    )
  })
  let labels = resultChain.map(item => item.date);
  let datas = resultChain.map(item => item.value);
  var chart_data_r = chartR.config.data
  chart_data_r.datasets[0].data = datas
  chart_data_r.labels = labels
  chartR.update()
}

var ref = firebase.database().ref('/');
var firestore = firebase.firestore()
var renderCount = 0

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
          console.log(doc.id, " => ", doc.data())
        });
        resolve(data)
      });
  })

  return response.reverse()
}

const updateToFireStore = (data) => {    
  firestore.collection("data").add({
    ...data,
    time: new Date().getTime()
  })
  .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
      console.error("Error adding document: ", error);
  });

}

const insertDataToLocal = (data) => {
  if (dataLocalR.length < MAX_COLUMN_SHOW)
    dataLocalR.push({
      ...data,
      time: new Date().getTime()
    })
  else {
    for (let i = 0; i < dataLocalR.length - 1; i++) {
      dataLocalR[i] = dataLocalR[i + 1]
    }
    dataLocalR[MAX_COLUMN_SHOW - 1] = {
      ...data,
      time: new Date().getTime()
    }
  }
}

const response = await getRowsData(MAX_COLUMN_SHOW)
dataLocalR = response

updateChart(dataLocalR)

ref.on('value', async(snapshot) => {
  renderCount++
  if (renderCount <= 1) return
  const data = snapshot.val();
  const currentData = await getRowsData(1)
  if (currentData && currentData.length > 0) {
    const miliseconds = currentData[currentData.length - 1].time
    let date = new Date(miliseconds).setSeconds(new Date(miliseconds).getSeconds() + SECOND_TO_DRAW)
    date = new Date(date)
    if (date.getTime() <= new Date().getTime()) {
      insertDataToLocal(data)
      updateChart(dataLocalR)
      updateToFireStore(data)
    }
  } else {
    insertDataToLocal(data)
    updateChart(dataLocalR)
    updateToFireStore(data)
  }
});

// firestore.collection("data")
// .onSnapshot(async (snapshot) => {
//     const response = await getRowsData(MAX_COLUMN_SHOW)
//     updateChart(response)
// }, (error) => {
//   console.log(error)
// });



