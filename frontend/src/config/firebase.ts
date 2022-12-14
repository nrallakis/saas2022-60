import firebase from "firebase/compat/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBIlKx3OXPZ6woX8oq0jIa9zJdz4Kjb-Ic",
    authDomain: "saas-22-60.firebaseapp.com",
    projectId: "saas-22-60",
    storageBucket: "saas-22-60.appspot.com",
    messagingSenderId: "796536084403",
    appId: "1:796536084403:web:2bb530200b8434dc2f9dc6"
};

const app = firebase.initializeApp(firebaseConfig);

const signOut = async () => {
    await getAuth(app).signOut();
}

export {signOut}
