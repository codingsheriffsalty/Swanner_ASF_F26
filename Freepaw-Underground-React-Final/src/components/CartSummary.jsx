import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export default function CartSummary({ subtotal, tax, total }) {
  return (
    <Card className="cart-summary">
      <CardBody>
        <CardTitle tag="h2">Order Summary</CardTitle>
        <div className="total-row"><span>Subtotal</span><strong>{money.format(subtotal)}</strong></div>
        <div className="total-row"><span>Tax (8.25%)</span><strong>{money.format(tax)}</strong></div>
        <hr />
        <div className="total-row final-total"><span>Total</span><strong>{money.format(total)}</strong></div>
      </CardBody>
    </Card>
  );
}
