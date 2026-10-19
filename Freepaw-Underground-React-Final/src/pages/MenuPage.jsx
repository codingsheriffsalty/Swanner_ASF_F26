import React, { useMemo, useState } from "react";
import { Alert, Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import menuItems from "../data/menuData";
import MenuFilter from "../components/MenuFilter";
import MenuItemCard from "../components/MenuItemCard";

export default function MenuPage({ onAddToCart }) {
  const [category, setCategory] = useState("All");
  const [message, setMessage] = useState("");
  const filteredItems = useMemo(
    () => category === "All" ? menuItems : menuItems.filter((item) => item.category === category),
    [category]
  );

  const handleAdd = (item, quantity) => {
    onAddToCart(item, quantity);
    setMessage(`${quantity} × ${item.name} added to your cart.`);
  };

  return (
    <main className="page-background menu-page">
      <Container className="py-5">
        <header className="page-heading">
          <h1>Chocolate for the Free</h1>
          <p>Choose your category, find your favorite, and add a little rebellion to your order.</p><p className="allergy-warning">Please let us know about any dairy allergies before ordering.</p>
        </header>
        <div className="filter-section">
          <MenuFilter category={category} onChange={(value) => { setCategory(value); setMessage(""); }} />
        </div>
        {message && <Alert color="success" toggle={() => setMessage("")} className="status-alert">{message} <Link to="/cart" className="alert-link">View cart</Link></Alert>}
        {filteredItems.length ? (
          <Row className="g-4">
            {filteredItems.map((item) => <Col key={item.id} sm="6" lg="4"><MenuItemCard item={item} onAddToCart={handleAdd} /></Col>)}
          </Row>
        ) : <Alert color="info">There are no items in this category.</Alert>}
        <div className="text-center mt-5"><Button tag={Link} to="/cart" color="primary" size="lg">Go to Cart</Button></div>
      </Container>
    </main>
  );
}
