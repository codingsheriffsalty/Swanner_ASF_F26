import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";

export default function HomePage() {
  return (
    <main className="home-page page-background">
      <Container className="py-5">
        <Row className="align-items-center g-5 hero-card">
          <Col lg="6">
            <img src="/images/freepawlogo.png" alt="The Freepaw Underground emblem" className="hero-logo" />
            <p className="tagline">Good chocolate. Free people. No masters.</p>
            <h1>Welcome to The Freepaw Underground</h1>
            <p className="lead">Beneath the brass towers of the bulldog-controlled city, humans gather in secret to enjoy something the ruling dogs can never have: real chocolate.</p>
            <div className="d-flex gap-3 flex-wrap mt-4">
              <Button tag={Link} to="/menu" color="primary" size="lg">Explore the Menu</Button>
              <Button tag={Link} to="/reservations" color="outline-light" size="lg">Request a Table</Button>
            </div>
          </Col>
          <Col lg="6">
            <img src="/images/restaurant.png" alt="Atmospheric underground restaurant interior" className="hero-image" />
          </Col>
        </Row>
        <Row className="g-4 mt-3">
          <Col md="4"><Card className="feature-card h-100"><CardBody><h2>Small-Batch Chocolate</h2><p>Rich chocolate treats made for humans who believe dessert should be bold, dark, and unapologetic.</p></CardBody></Card></Col>
          <Col md="4"><Card className="feature-card h-100"><CardBody><h2>Hidden Atmosphere</h2><p>Leave the city noise behind and enjoy a quiet table away from the streets above.</p></CardBody></Card></Col>
          <Col md="4"><Card className="feature-card h-100"><CardBody><h2>Your Own Table</h2><p>Send a reservation request and tell us what would make your underground visit special.</p></CardBody></Card></Col>
        </Row>
      </Container>
    </main>
  );
}
