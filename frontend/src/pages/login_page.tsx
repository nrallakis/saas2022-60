import React, {useEffect, useState} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {DashboardPage} from "./dashboard_page";
import {HomePage} from "./home_page";
import {SubscriptionPage} from "./subscription_page";

export const LoginPage = () => {
    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

    // Listen to the Firebase Auth state and set the local state.
    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
            setIsSignedIn(!!user);
        });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);

    return (
        isSignedIn ? <SubscriptionPage/> : <HomePage/>
    );
}