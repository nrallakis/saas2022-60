import {AuthContext, AuthProvider} from "./provider/auth_provider";
import {BrowserRouter, Navigate, Route, Routes, useLocation} from "react-router-dom";
import LoginPage from "./pages/login_page";
import DashboardPage from "./pages/dashboard_page";
import SubscriptionPage from "./pages/subscription_page";
import React from "react";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Navigate to={"/dashboard"}/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/dashboard" element={
                        <RequireAuth>
                            <DashboardPage/>
                        </RequireAuth>
                    }/>
                    <Route path="/subscription" element={
                        <RequireAuth>
                            <SubscriptionPage/>
                        </RequireAuth>
                    }/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

function RequireAuth({children}: { children: JSX.Element }) {
    let user = useAuth();
    let location = useLocation();

    if (user == null) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{from: location}} replace/>;
    }

    return children;
}

function useAuth() {
    return React.useContext(AuthContext);
}

export default App;