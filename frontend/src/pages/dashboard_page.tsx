import {Header} from "../components/header";
import firebase from 'firebase/compat/app';

export const DashboardPage = () => {
    return (
        <div>
            <Header onSignOut={() => firebase.auth().signOut()}/>
        </div>
    );
}