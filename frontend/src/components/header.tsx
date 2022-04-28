import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import firebase from "firebase/compat/app";

type HeaderProps = {
    onSignOut?: () => void;
}

export const Header = (props: HeaderProps) => {
    return (
        <header>
            <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
                <Container>
                    <Navbar.Brand href="#home">EnergyLive</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse className="justify-content-between">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#reports">Reports</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link>
                        </Nav>
                        <Navbar.Text>
                            {firebase.auth().currentUser?.email} <a href="#" onClick={props.onSignOut}>Sign out</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};