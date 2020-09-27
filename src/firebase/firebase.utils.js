import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: 'AIzaSyAxNHwJpKssmW-1EYYPR6jE9gk-7sPu0w4',
    authDomain: 'ecommerce-5b635.firebaseapp.com',
    databaseURL: 'https://ecommerce-5b635.firebaseio.com',
    projectId: 'ecommerce-5b635',
    storageBucket: 'ecommerce-5b635.appspot.com',
    messagingSenderId: '648310903781',
    appId: '1:648310903781:web:73323de73fd4c230df950c',
    measurementId: 'G-XDE7H6J7BW'
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
