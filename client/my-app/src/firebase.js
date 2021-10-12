import firebase from 'firebase';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: 'AIzaSyAwg1TxKotC6xXf-VtSfRLFkR0PDrS5UXo',
    authDomain: 'henry-app-gp07.firebaseapp.com',
    projectId: 'henry-app-gp07',
    storageBucket: 'gs://henry-app-gp07.appspot.com',
    messagingSenderId: '373248329222',
    appId: '1:373248329222:web:8fc0e8981be6b0383e6587',
    measurementId: 'G-Y20ZRFTBWK'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
