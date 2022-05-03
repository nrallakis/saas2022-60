import 'firebase/compat/auth';
import Header from "../components/header";
import GoogleButton from "../components/google_button";

function LoginPage() {
    return (
        <>
            <Header/>
            <GoogleButton/>
        </>
    );
}

export default LoginPage;