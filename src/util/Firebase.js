/**
 * Conexão com Firebase
 *-------- original do curso
const firebase = require('firebase');
require('firebase/firestore');
export class Firebase{
 *---------
*/
/** https://firebase.google.com/docs/web/setup?hl=pt-br#aplicativos-node.js*/
import firebase from "firebase";
// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
 
export class Firebase {
    constructor() {
 
        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        this._config = {
            apiKey: "AIzaSyCq3Iso7tf6UT9hdeDLffINHuqLyzWd0sg",
            authDomain: "whatsapp-clone-11cf7.firebaseapp.com",
            projectId: "whatsapp-clone-11cf7",
            storageBucket: "whatsapp-clone-11cf7.appspot.com",
            messagingSenderId: "987267653378",
            appId: "1:987267653378:web:a0b99cd30a652acd412c1b",
            measurementId: "G-E9MHXY1JHG"
        };
        //console.log('Firebase constructor: _config:', this._config);
        this.init();
    }
 
    init(){
        // Initialize Firebase
        //console.log('Firebase init(): !this._initialized', this._initialized);
        if (!window._initializedFirebase) {
            //console.log('Firebase init(): !this._initialized>firebase', firebase);
            firebase.initializeApp(this._config);
            firebase.firestore().settings({
                timestampsInSnapshots: true
            });
            window._initializedFirebase = true;
        }
    }
 
    static db() {
        return firebase.firestore();
    }
 
    static hd() {
        return firebase.storage();
    }
 
    initAuth(){
 
        return new Promise((s, f)=>{
            let provider = new firebase.auth.GoogleAuthProvider();
            //provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
            //console.log('Firebase initAuth(): (S)', provider);
            //
            firebase.auth().signInWithPopup(provider).then(function (result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                let token = result.credential.accessToken;
                // The signed-in user info.
                let user = result.user;
                //console.log('Firebase initAuth(): (result)', user, token);
                s({
                    user,
                    token
                });
               
            }).catch(function (error) {
               
                f(error);
                
            });
            
        });
 
    }
 
}