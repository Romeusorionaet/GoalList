import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_AUTH_DOMAIN,
  projectId: 'twoheart-e9e33',
  storageBucket: 'twoheart-e9e33.appspot.com',
  messagingSenderId: '370000725044',
  appId: '1:370000725044:web:c036741ea90ea09822b661',
  measurementId: 'G-CF8J9J7069',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
