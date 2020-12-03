import firebase from 'firebase/app'
import 'firebase/firestore'
// import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyANSeiCCKJ6e6yWebxzmYsClQECXqZyw0Y',
  authDomain: 'ine5646-projeto-final.firebaseapp.com',
  databaseURL: 'https://ine5646-projeto-final.firebaseio.com',
  projectId: 'ine5646-projeto-final',
  storageBucket: 'ine5646-projeto-final.appspot.com',
  messagingSenderId: '556409254247',
  appId: '1:556409254247:web:9792562ba1597944ae7fc2',
}

export const app = firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()

export const createTest = (object) => {
  db.collection('test')
    .add({
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      randomNumber: Math.random(),
      ...object,
    })
    .then(() => console.log('createTest: collection added to Firebase'))
  return null
}

export const readTest = async () => {
  const snapshot = await db.collection('test').get()
  const data = snapshot.docs.map((doc) => doc.data())
  return data
}

// ==============
/* real things */

// TODO: don't have a way to update yet, just create
export const submitImovel = (dataPublic, dataPrivate) => {
  // Get a new write batch
  let batch = db.batch()

  // Set the value in imovel
  let imovelRef = db.collection('imovel').doc()
  batch.set(imovelRef, {
    ...dataPublic,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  })

  // Set the value in imovel private
  let imovelPrivateRef = db.collection('imovelPrivate').doc()
  batch.set(imovelPrivateRef, {
    ...dataPrivate,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  })

  // Commit the batch
  batch.commit().then(function () {
    console.log('submitImovel: imovel and imovelPrivate submited')
  })

  return null
}
