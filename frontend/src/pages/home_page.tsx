import {Container, Navbar} from "react-bootstrap";
import React from "react";
import {Google_button} from "../components/google_button";

export const HomePage = () => {
    return (
        <div>
            <header>
                <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
                    <Container>
                        <Navbar.Brand href="#home">EnergyLive</Navbar.Brand>
                        <Navbar.Text>
                            You need to sign in
                        </Navbar.Text>
                    </Container>
                </Navbar>
            </header>
            <Container>
                <Google_button/>
            </Container>
        </div>
    );
}