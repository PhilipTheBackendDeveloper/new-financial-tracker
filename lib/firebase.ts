import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCUgTi6rcBcNu9eiuIGYEwxUO6CJmoqbjI",
  authDomain: "financial-web-tracker.firebaseapp.com",
  projectId: "financial-web-tracker",
  storageBucket: "financial-web-tracker.firebasestorage.app",
  messagingSenderId: "1063774958765",
  appId: "1:1063774958765:web:51420cb4621ebdd53e4224",
  measurementId: "G-3FFSS2EJ00",
}


  akldfsjgkljskldfzgj's
    klsafdgkjfkgsjlsdfjg
jakjlskfzdg
klklsjgdkljl;gsd
kjgfklsjgkjl;jsfdhufsdl
kajgsjkajopjadskljklj'sd
  kjdfskgjkjsdgfjlksdfgjos;l
kdfjsgkljfkds;sd
kjfsdkgljsdkfgj

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)

// Export the app for other uses
export default app
