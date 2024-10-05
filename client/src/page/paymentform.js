import React ,{useState}from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'; 

const PaymentForm = (

) => {
  const [amount, setAmount] = useState(0);  // Set default as 0
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

    const handlePayment = async (e) => {
        e.preventDefault();    

        const paymentData = {
            amount,
            currency: 'ETB', // Chapa uses ETB by default
            email,
            firstName,
            lastName,
            phone,
            txRef: `tx-${Date.now()}`, // Unique transaction reference
            callbackUrl: 'http://localhost:3000/payment-success', // Frontend callback URL for successful payment
        };

        try {
            const response = await axios.post('http://localhost:5000/api/initiate', paymentData);
            if (response.data.status === 'success') {
                window.location.href = response.data.data.checkout_url; // Redirect user to Chapa payment page
            } else {
                alert('Payment initiation failed');
            }
        } catch (error) {
            console.error('Payment error:', error);
            alert('Error initiating payment');
        }
    };

    return (
        <Container className="py-5"> 
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Payment Form</h2>
                            <Form onSubmit={handlePayment}>
                                <Form.Group className="mb-3" controlId="formBasicFirstName">
                                    <Form.Label>First Name:</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter First Name" 
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicLastName">
                                    <Form.Label>Last Name:</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        placeholder="Enter Last Name" 
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        placeholder="Enter Email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicAmount">
                                    <Form.Label>Amount:</Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        placeholder="Enter Amount" 
                                        value={amount}
                                        onChange={(e) => setAmount(Number(e.target.value))}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPhone">
                                    <Form.Label>Phone:</Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        placeholder="Enter Phone" 
                                        value={phone}
                                        onChange={(e) => setPhone(Number(e.target.value))}
                                        required
                                    />
                                </Form.Group>


                                <Button variant="primary" type="submit">
                                    Pay Now
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default PaymentForm;
