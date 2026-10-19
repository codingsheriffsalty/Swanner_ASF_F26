import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Table, Alert } from "reactstrap";
import CartSummary from "../components/CartSummary";
import ConfirmModal from "../components/ConfirmModal";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const TAX_RATE = 0.0825;

export default function CartPage({ cart, updateQuantity, removeFromCart, clearCart }) {
  const navigate = useNavigate();
  const [cancelOpen, setCancelOpen] = useState(false);
  const [thanksOpen, setThanksOpen] = useState(false);
  const [thanksMessage, setThanksMessage] = useState("");

  const totals = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * TAX_RATE;
    return { subtotal, tax, total: subtotal + tax };
  }, [cart]);

  const finishOrder = (message) => {
    clearCart();
    setCancelOpen(false);
    setThanksMessage(message);
    setThanksOpen(true);
  };

  const closeThanks = () => {
    setThanksOpen(false);
    navigate("/menu");
  };

  return (
    <main className="page-background cart-page">
      <Container className="py-5">
        <header className="page-heading"><h1>Your Cart</h1><p>Review your order before you send it down to the Underground.</p></header>
        {cart.length === 0 ? (
          <div className="empty-cart card text-center">
            <h2>Your cart is empty.</h2>
            <p>Head to the menu and find something chocolatey.</p>
            <div><Button color="primary" onClick={() => navigate("/menu")}>Browse Menu</Button></div>
          </div>
        ) : (
          <>
            <div className="cart-table-wrap">
              <Table responsive className="cart-table align-middle">
                <thead><tr><th scope="col">Item</th><th scope="col">Price</th><th scope="col">Quantity</th><th scope="col">Line Total</th><th scope="col"><span className="visually-hidden">Remove</span></th></tr></thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <th scope="row">{item.name}</th>
                      <td>{money.format(item.price)}</td>
                      <td><label className="visually-hidden" htmlFor={`cart-quantity-${item.id}`}>Quantity for {item.name}</label><select id={`cart-quantity-${item.id}`} className="form-select cart-quantity" value={item.quantity} onChange={(event) => updateQuantity(item.id, event.target.value)}>{[1,2,3,4,5].map((n) => <option key={n} value={n}>{n}</option>)}</select></td>
                      <td>{money.format(item.price * item.quantity)}</td>
                      <td><Button color="danger" outline size="sm" onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.name}`}>Remove</Button></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <div className="cart-bottom">
              <CartSummary {...totals} />
              <div className="button-group justify-content-end">
                <Button color="danger" outline onClick={() => setCancelOpen(true)}>Cancel Order</Button>
                <Button color="primary" onClick={() => finishOrder("Thank you! Your demo order has been submitted. No payment was processed.")}>Submit Order</Button>
              </div>
              <p className="demo-note">Demo checkout only. Unless you want me to bring it to class.</p>
            </div>
          </>
        )}
      </Container>
      <ConfirmModal
        isOpen={cancelOpen}
        title="Cancel Order"
        message="Are you sure you want to cancel your order?"
        confirmText="Yes, Cancel Order"
        cancelText="Keep Order"
        onConfirm={() => finishOrder("Thank you for visiting The Freepaw Underground. Your cart has been cleared.")}
        onCancel={() => setCancelOpen(false)}
      />
      <ConfirmModal
        isOpen={thanksOpen}
        title="Thank You!"
        message={thanksMessage}
        confirmText="Return to Menu"
        showCancel={false}
        onConfirm={closeThanks}
        onCancel={closeThanks}
      />
    </main>
  );
}
