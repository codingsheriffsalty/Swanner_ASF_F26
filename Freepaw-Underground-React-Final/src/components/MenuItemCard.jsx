import React, { useState } from "react";
import { Button, Card, CardBody, CardImg, CardText, CardTitle, FormGroup, Input, Label } from "reactstrap";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export default function MenuItemCard({ item, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const add = () => {
    onAddToCart(item, quantity);
    setQuantity(1);
  };

  return (
    <Card className="menu-item-card h-100">
      <CardImg top src={item.img} alt={item.name} className="menu-card-image" />
      <CardBody className="d-flex flex-column">
        <p className="menu-category mb-2">{item.category}</p>
        <CardTitle tag="h2">{item.name}</CardTitle>
        <CardText>{item.description}</CardText>
        <p className="menu-price mt-auto">{money.format(item.price)}</p>
        <div className="d-flex align-items-end gap-3 flex-wrap">
          <FormGroup className="mb-0 quantity-control">
            <Label for={`quantity-${item.id}`}>Qty</Label>
            <Input
              id={`quantity-${item.id}`}
              type="number"
              min="1"
              max="5"
              value={quantity}
              onChange={(event) => {
                const value = Number(event.target.value);
                setQuantity(Math.min(5, Math.max(1, Number.isFinite(value) ? value : 1)));
              }}
            />
          </FormGroup>
          <Button color="primary" onClick={add}>Add to Cart</Button>
        </div>
      </CardBody>
    </Card>
  );
}
