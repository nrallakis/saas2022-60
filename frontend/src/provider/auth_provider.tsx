import React, { useState, useEffect, createContext } from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useNavigate} from "react-router-dom";

const AuthContext = createContext<User | null>(null);

interface User {
    firstName: string,
    lastName: string,
    email: string,
    lastLogin: Date
}

function AuthProvider(props: React.PropsWithChildren<any>) {
    const [user, setUser] = useState<User | null>(null);

    let navigate = useNavigate();

    function onUserSignedIn(user: firebase.User) {
        const {displayName, email} = user!;
        let [firstName, lastName] = displayName!.split(" ");
        setUser({
            firstName: firstName,
            lastName: lastName,
            email: email!,
            lastLogin: new Date(),
        });
        navigate("/");
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user == null) {
                navigate('/login', {replace: true});
            } else {
                onUserSignedIn(user);
            }
        });
    }, []);

    return (
        <AuthContext.Provider value={user}>{props.children}</AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}

