import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import firebase from "firebase/compat/app";
import {Link} from "react-router-dom";
import {signOut} from "../config/firebase";

function Header() {
    let isSignedIn = firebase.auth().currentUser != null;
    return (
        <header>
            <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
                {isSignedIn ? <AuthenticatedHeader/> : <UnauthenticatedHeader/>}
            </Navbar>
        </header>
    );
}

function AuthenticatedHeader() {
    return (
        <Container>
            <Navbar.Brand as={Link} to="#home">EnergyLive</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse className="justify-content-between">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/dashboard">Home</Nav.Link>
                    <Nav.Link as={Link} to="#reports">Reports</Nav.Link>
                    <Nav.Link as={Link} to="/subscription">Subscription</Nav.Link>
                </Nav>
                <Navbar.Text>
                    {firebase.auth().currentUser?.email} <a href="javascript:voidnull;"
                                                            onClick={() => signOut()}>Sign out</a>
                </Navbar.Text>
            </Navbar.Collapse>
        </Container>
    );
}

function UnauthenticatedHeader() {
    return (
        <Container>
            <Navbar.Brand href="#home">EnergyLive</Navbar.Brand>
            <Navbar.Text>You need to sign in</Navbar.Text>
        </Container>
    );
}

export default Header;