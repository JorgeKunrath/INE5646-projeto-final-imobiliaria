import firebase from 'firebase/app'
import 'firebase/firestore'
import '@firebase/storage'
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

// ========================================================================
// ========================================================================
// ========================================================================

// FIRESTORE DATABASE

export const db = firebase.firestore()

// exemplo
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

// exemplo
export const readTest = async () => {
  const snapshot = await db.collection('test').get()
  const data = snapshot.docs.map((doc) => doc.data())
  return data
}

// ==============
/* real things */

// create a new entry in imoveis and imoveis_resumo
export const createImovel = (dataPublic, dataSnippet, setLoading) => {
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
    userUidRef: user.uid,
    ...dataPublic,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  })

  // -----
  // Set the value in imovel_resumo
  let snippet_imovel_ref = db.collection('imoveis_resumo').doc()
  batch.set(snippet_imovel_ref, {
    userUidRef: user.uid,
    ...dataSnippet,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  })

  // Commit the batch
  batch.commit().then(function () {
    console.log(
      'submitImovel: created usuarios/userUid/imoveis and snippet_imovel'
    )
    setLoading(false)
  })

  return null
}

// update the infos with a ref based in cod
export const updateImovel = async (
  databaseSchema,
  snippetDatabaseSchema,
  setLoading,
  cod
) => {
  // Get user
  let user = firebase.auth().currentUser

  // read current doc and then write
  db.collectionGroup('imoveis')
    .where('cod', '==', cod)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        db.doc(`/usuarios/${user.uid}/imoveis/${doc.id}`).set(
          {
            ...databaseSchema,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        )
      })
    })
    .catch(function (error) {
      console.log('ops... ', error)
    })

  // find respective snippetDoc and then write in it
  db.collection('imoveis_resumo')
    .where('codRef', '==', cod)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        db.doc(`/imoveis_resumo/${doc.id}`).update({
          ...snippetDatabaseSchema,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
      })
    })
    .catch(function (error) {
      console.log('ops... ', error)
    })

  setLoading(false)

  return null
}

// request snippet imoveis
export const getImoveisResumo = async () => {
  console.log('Firebase: getImoveisResumo')

  const snapshotDisponivel = await db
    .collection('imoveis_resumo')
    .where('status', '==', 'disponível')
    .orderBy('createdAt', 'desc')
    .get()
  const data = snapshotDisponivel.docs.map((doc) => doc.data())

  const snapshotReservado = await db
    .collection('imoveis_resumo')
    .where('status', '==', 'reservado')
    .orderBy('createdAt', 'desc')
    .get()
  const data2 = snapshotReservado.docs.map((doc) => doc.data())

  return [...data, ...data2]
}

// request imovel
export const getImovel = async (cod) => {
  let data
  // 1. busca todas as coleções chamada imoveis
  // 2. seleciona os campos desejados
  const query = await db
    .collectionGroup('imoveis')
    .where('cod', '==', cod)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log('success: getImovel')
        data = doc.data()
      })
    })
    .catch(function (error) {
      console.log('Error getting documents: ', error)
    })

  return data
}

// user that show interest in a house
export const submitSchedule = (object) => {
  db.collection('visitas')
    .add({
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      ...object,
    })
    .then(() => console.log('submitSchedule: "schedule" added to Firebase'))
  return null
}

// get all houses for current user
export const getUserHouses = async (setData) => {
  // Get user
  let user = firebase.auth().currentUser

  const snapshot = await db
    .collection('usuarios')
    .doc(user.uid)
    .collection('imoveis')
    .orderBy('createdAt', 'desc')
    .get()
  const data = snapshot.docs.map((doc) => doc.data())
  setData(data)
  return data
}

// get all schedules for current user
export const getSchedulesForUser = async (setData) => {
  // Get user
  let user = firebase.auth().currentUser

  const snapshot = await db
    .collection('visitas')
    .where('userUidRef', '==', user.uid)
    .orderBy('createdAt', 'desc')
    .get()
  const data = snapshot.docs.map((doc) => doc.data())
  setData(data)
  return data
}

// ========================================================================
// ========================================================================
// ========================================================================

// CLOUD STORAGE

export const storage = firebase.storage()

// BUG FIX TODO
// UPLOAD ASSIM ESTÁ SOBRESCREVENDO A IMAGEM SE ELA TEM O MESMO NOME
// se pá usar algum hash adicional no nome, n sei bem
// ou pelo menos ter uma pasta para cada usuário
export const uploadOneImageToCloudStorageAndSetUrl = (image, setUrl) => {
  let dbImageUrl

  // Get user
  let user = firebase.auth().currentUser
  console.log('user.uid', user.uid)

  const uploadTask = storage.ref(`images/${user.uid}/${image.name}`).put(image)
  uploadTask.on(
    'state_changed',
    (snapshot) => {},
    (error) => {
      console.log(error)
    },
    () => {
      storage
        .ref(`images/${user.uid}`)
        .child(image.name)
        .getDownloadURL()
        .then((url) => {
          console.log('Imagem salva com sucesso:', url)
          setUrl(url)
        })
    }
  )

  return null
}
