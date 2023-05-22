const SECOND_TO_DRAW = 5 // tính là giây
const MAX_COLUMN_SHOW = 20 // số cột thời gian hiển thị

// ------------------------------------------------------------
var dataLocalV = []
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

var chartVab = null
var chartVan = null
var chartVaux = null

const initChart = () => {
  const ctxVab = document.getElementById('vab');
  const ctxVan = document.getElementById('van');
  const ctxVaux = document.getElementById('vaux');

  let dataVab = {
    labels: [],
    datasets: [{
      label: 'Vab',
      data: [],
      fill: false,
      borderColor: '#FF6000',
      tension: 0.1
    }]
  };
  chartVab = new Chart(ctxVab, {
    type: 'line', 
    data: dataVab,
  });

  let dataVan = {
    labels: [],
    datasets: [{
      label: 'Van',
      data: [],
      fill: false,
      borderColor: '#000000',
      tension: 0.1
    }]
  };
  chartVan = new Chart(ctxVan, {
    type: 'line', 
    data: dataVan,
  });

  let dataVaux = {
    labels: [],
    datasets: [{
      label: 'Vaux',
      data: [],
      fill: false,
      borderColor: '#800000',
      tension: 0.1
    }]
  };
  chartVaux = new Chart(ctxVaux, {
    type: 'line', 
    data: dataVaux,
  });
}

initChart()

const updateChart = (dataRealtime) => {
  if (chartVab === null || chartVan === null || chartVaux === null) initChart()

  const resultChainVab = []
  const resultChainVan = []
  const resultChainVaux = []

  dataRealtime.forEach(item => {
    const date = new Date(item.time)
    resultChainVab.push({
      value: item.Vab,
      date: `0${date.getHours()}`.slice(-2) + ':' + `0${date.getMinutes()}`.slice(-2) + ":" + `0${date.getSeconds()}`.slice(-2)
    })

    resultChainVan.push({
      value: item.Van,
      date: `0${date.getHours()}`.slice(-2) + ':' + `0${date.getMinutes()}`.slice(-2) + ":" + `0${date.getSeconds()}`.slice(-2)
    })

    resultChainVaux.push({
      value: item.Vaux,
      date: `0${date.getHours()}`.slice(-2) + ':' + `0${date.getMinutes()}`.slice(-2) + ":" + `0${date.getSeconds()}`.slice(-2)
    })
  });

  let labelsVab = []
  let datasVab = []
  resultChainVab.forEach(item => {
    labelsVab.push(item.date)
    datasVab.push(item.value)
  });
  var chart_data_vab = chartVab.config.data
  chart_data_vab.datasets[0].data = datasVab
  chart_data_vab.labels = labelsVab
  chartVab.update()

  let labelsVan = []
  let datasVan = []
  resultChainVan.forEach(item => {
    labelsVan.push(item.date)
    datasVan.push(item.value)
  });
  var chart_data_van = chartVan.config.data
  chart_data_van.datasets[0].data = datasVan
  chart_data_van.labels = labelsVan
  chartVan.update()

  let labelsVaux = []
  let datasVaux = []
  resultChainVaux.forEach(item => {
    labelsVaux.push(item.date)
    datasVaux.push(item.value)
  });
  var chart_data_vaux = chartVaux.config.data
  chart_data_vaux.datasets[0].data = datasVaux
  chart_data_vaux.labels = labelsVaux
  chartVaux.update()
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
  try {
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
  } catch (error) {
    console.log(error)    
  }  
}

const insertDataToLocal = (data) => {
  if (dataLocalV.length < MAX_COLUMN_SHOW)
    dataLocalV.push({
      ...data,
      time: new Date().getTime()
    })
  else {
    for (let i = 0; i < dataLocalV.length - 1; i++) {
      dataLocalV[i] = dataLocalV[i + 1]
    }
    dataLocalV[MAX_COLUMN_SHOW - 1] = {
      ...data,
      time: new Date().getTime()
    }
  }
}

const response = await getRowsData(MAX_COLUMN_SHOW)
dataLocalV = response
updateChart(dataLocalV)

ref.on('value', async(snapshot) => {
  renderCount++
  if (renderCount === 1) return
  const data = snapshot.val();
  const currentData = await getRowsData(1)
  if (currentData && currentData.length > 0) {
    const miliseconds = currentData[0].time
    let date = new Date(miliseconds).setSeconds(new Date(miliseconds).getSeconds() + SECOND_TO_DRAW)
    date = new Date(date)
    if (date.getTime() <= new Date().getTime()) {
      insertDataToLocal(data)
      updateChart(dataLocalV)
      updateToFireStore(data)
    }
  } else {
    insertDataToLocal(data)
    updateChart(dataLocalV)
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



