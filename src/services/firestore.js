import firebase from 'firebase/app'
import 'firebase/firestore'
import '@firebase/storage';
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

export const storage = firebase.storage();

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
export const submitImovel = (dataPublic, dataSnippet, cod) => {
  // Get a new write batch
  let batch = db.batch()

  // Get user
  let user = firebase.auth().currentUser
  console.log('user.uid', user.uid)

  // -----
  // Set the value in usuarios > imoveis
  let usuarios_imoveis_ref = db
    .collection('usuarios')
    .doc(user.uid)
    .collection('imoveis')
    .doc()
  batch.set(usuarios_imoveis_ref, {
    cod,
    userUidRef: user.uid,
    ...dataPublic,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  })

  // -----
  // Set the value in imovel_resumo
  let snippet_imovel_ref = db.collection('imoveis_resumo').doc()
  batch.set(snippet_imovel_ref, {
    codRef: cod,
    userUidRef: user.uid,
    ...dataSnippet,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  })

  // Commit the batch
  batch.commit().then(function () {
    console.log(
      'submitImovel: created usuarios/userUid/imoveis and snippet_imovel'
    )
  })

  return null
}

// request snippet imoveis
export const getImoveisResumo = async () => {
  const snapshot = await db
    .collection('imoveis_resumo')
    .orderBy('createdAt', 'desc')
    .get()
  const data = snapshot.docs.map((doc) => doc.data())
  console.log({ data })
  return data
}
