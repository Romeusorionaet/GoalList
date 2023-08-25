import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBZOCnI9IRZ3_cbuc7QRu6ofSt9_1ugee0',
  authDomain: 'twoheart-e9e33.firebaseapp.com',
  projectId: 'twoheart-e9e33',
  storageBucket: 'twoheart-e9e33.appspot.com',
  messagingSenderId: '370000725044',
  appId: '1:370000725044:web:c036741ea90ea09822b661',
  measurementId: 'G-CF8J9J7069',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
