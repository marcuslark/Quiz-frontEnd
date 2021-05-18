//import * as firebase from 'firebase/app'
import { firebase } from '@firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init - add your own config here
const firebaseConfig = {
    // apiKey: '',
    // authDomain: '',
    // databaseURL: '',
    // projectId: '',
    // storageBucket: '',
    // messagingSenderId: '',
    // appId: ''
    apiKey: "AIzaSyBixx7o9SZPmetWcN5O__9gkzyUyreSpis",
    authDomain: "quiz-db87c.firebaseapp.com",
    projectId: "quiz-db87c",
    storageBucket: "quiz-db87c.appspot.com",
    messagingSenderId: "1064940566091",
    appId: "1:1064940566091:web:12d6a4028e59e81eabbfce",
    measurementId: "G-QPQ4STLXNT"
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

// export utils/refs
export {
    db,
    auth,
    usersCollection,
    postsCollection,
    commentsCollection,
    likesCollection
}