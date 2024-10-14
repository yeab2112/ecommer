import React from 'react';
import '../asett/about.css';

import { Row, Col, ListGroup } from 'react-bootstrap';
import download from '../image/images.png'
function About() {
  return (
    <div className='about-container'>
        <h1 className="text-center mt-4">About Us</h1>
        <Row>
          <Col md={6} className="mb-4"> 
            <p>
              At Addis Zemmen Store, our mission is to provide high-quality
              products that enhance your lifestyle while delivering exceptional
              customer service. 
            </p>
            <p>
              We believe that shopping should be enjoyable and accessible, no
              matter where you are.
            </p>
            <p>
              Founded in 2024, we are a passionate team of individuals
              dedicated to curating the best selection of Product Category,
              e.g., fashion, electronics. Our journey began with a simple idea: to
              make premium products available at affordable prices.
            </p>
          </Col>
          <Col md={6} className="mb-4">
            <p>   <img src={download} alt="About Image" className="img-fluid about-image"
             style={{ maxWidth: '100%', height: 'auto' }}/> 
   


            </p>
          </Col>
        </Row>

        <h1 className="text-center mt-4">Our Values</h1>
        <Row>
          <Col md={4} className="mb-4">
            <p>- Quality: We carefully select each item in our store to ensure it
              meets our high standards of quality.</p>
          </Col>
          <Col md={4} className="mb-4">
            <p>- Customer Satisfaction: Your happiness is our priority. We are
              committed to providing prompt support and easy returns.</p>
          </Col>
          <Col md={4} className="mb-4">
            <p>- Sustainability: We strive to minimize our environmental impact by
              sourcing sustainable products and using eco-friendly packaging.
            </p>
          </Col>
        </Row>

        <h1 className="text-center mt-4">Why Choose Us?</h1>
        <Row>
          <Col md={4} className="mb-4">
            <p>-Fast Shipping: We process orders quickly to ensure you receive
              your products as soon as possible.</p>
          </Col>
          <Col md={4} className="mb-4">
            <p>-Secure Shopping: Your privacy and security are important to us.
              Our website uses the latest encryption technology to protect your
              information.</p>
          </Col>
          <Col md={4} className="mb-4">
            <p>-Excellent Customer Service: Our dedicated team is always ready
              to assist you with any questions or concerns.</p>
          </Col>
        </Row>

        <h1 className="text-center mt-4">Contact Us</h1>
        <p className="text-center mb-3">
          Have questions? We're here to help! Contact us at:
        </p>

        <Row className="justify-content-center"> 
          <Col md={8} className="d-flex flex-column align-items-center"> 
            <ListGroup variant="flush">
              <ListGroup.Item>
                <i className="bi bi-envelope-fill me-2"></i> 
                yeabsiraaychiluhim2112@gmail.com
              </ListGroup.Item>
              <ListGroup.Item>
                <i className="bi bi-phone-fill me-2"></i> 
                0923547840
              </ListGroup.Item>
              <ListGroup.Item>
                <i className="bi bi-geo-alt-fill me-2"></i> 
                Addis Ababa
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>

        <h4 className="text-center mt-4">
          Thank you for choosing AddisZemmen Store. We look forward to serving
          you!
        </h4>
      
    </div>
  );
}

export default About;
