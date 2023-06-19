const firebaseConfig = {
apiKey: 'AIzaSyCJusAuajt_rqS-M25vBbZ3q_Ai1rYvzQI',
authDomain: 'authoringtool-b1bfb.firebaseapp.com',
 projectId: 'authoringtool-b1bfb', 
 storageBucket: 'authoringtool-b1bfb.appspot.com',
  messagingSenderId: '850183606717',
 appId: '1:850183606717:web:5bede545f33574497642d4'
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const nombreProyecto='Las frutas';
let tarjetas=[];
db.collection('Proyecto').doc(nombreProyecto).collection('Tarjetas').get().then( querySnapshot =>{
querySnapshot.forEach((doc) => {
 tarjetas.push({tarjeta:doc.data(),id:doc.id},
)
})
})
