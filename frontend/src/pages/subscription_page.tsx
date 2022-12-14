import { useContext } from "react";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import Header from "../components/header";
import {AuthContext} from "../provider/auth_provider";

function SubscriptionPage() {
    const user = useContext(AuthContext);
    const yyyy = user?.lastLogin.getFullYear();
    const mm = user?.lastLogin.getMonth()! + 1;
    const dd = user?.lastLogin.getDate();
    return (
        <>
            <Header/>
            <Row className="pt-5">
                <Col md={{span: 6, offset: 3}}>
                    <Card>
                        <Card.Header className="text-center">EnergyLive2022</Card.Header>
                        <Card.Body>
                            <Card.Title>Subscription Extension</Card.Title>
                            <Card.Text>
                                With supporting text below as a natural lead-in to additional content.
                            </Card.Text>
                            <Form>
                                <Form.Group className="w-50 mb-3" controlId="firstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="name" placeholder={user?.firstName} disabled/>
                                </Form.Group>

                                <Form.Group className="w-50 mb-3" controlId="lastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="name" placeholder={user?.lastName} disabled/>
                                </Form.Group>
                                <Form.Group className="w-50 mb-3" controlId="email">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder={user?.email} disabled/>
                                </Form.Group>

                                <Form.Group className="w-50 mb-3" controlId="password">
                                    <Form.Label>Last Login</Form.Label>
                                    <Form.Control type="password" 
                                        placeholder={`${dd}/${mm}/${yyyy}`} disabled/>
                                </Form.Group>
                                <Card>
                                    <Card.Body>
                                        <Row>
                                            <Form.Group className="w-25 mb-3" controlId="password">
                                                <Form.Label>Days Left</Form.Label>
                                                <Form.Control type="number" placeholder="15" />
                                            </Form.Group>
                                            <Form.Group className="w-25 mb-3" controlId="password">
                                                <Form.Label>Extend by (Days)</Form.Label>
                                                <Form.Control type="number" placeholder="15" />
                                            </Form.Group>
                                        </Row>
                                    </Card.Body>
                                </Card>
                                <Row className="pt-2">
                                    <Col md={{span: 1, offset: 0}}>
                                        <Button variant="primary" type="submit">
                                            Extend
                                        </Button>
                                    </Col>
                                    <Col md={{span: 1, offset: 1}}>
                                        <Button variant="secondary" type="button">
                                            Cancel
                                        </Button>
                                    </Col>
                                    <Col md={{span: 1, offset: 1}}>
                                        <Button variant="light">Back</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default SubscriptionPage;