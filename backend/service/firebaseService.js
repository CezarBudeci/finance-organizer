import auth from '../firebase/firebaseAuth.js';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from 'firebase/auth';

const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

const signOut = () => {
    return auth.signOut();
};

const refreshToken = () => {
    return auth.currentUser.getIdTokenResult(true);
};

const getCurrentUser = () => {
    return auth.currentUser;
};

const FirebaseService = {
    register,
    signIn,
    signOut,
    refreshToken,
    getCurrentUser,
};

export default FirebaseService;
