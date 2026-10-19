import React from "react";
import { NavLink } from "react-router-dom";
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from "reactstrap";

export default function SiteNavbar({ cartCount }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen((open) => !open);

  const links = [
    { to: "/", label: "Home", end: true },
    { to: "/menu", label: "Menu" },
    { to: "/reservations", label: "Reservations" },
    { to: "/cart", label: `Cart${cartCount ? ` (${cartCount})` : ""}` },
  ];

  return (
    <Navbar className="site-navbar" dark expand="lg" container="lg">
      <NavbarBrand tag={NavLink} to="/" className="d-flex align-items-center">
        <img src="/images/freepawlogo.png" alt="The Freepaw Underground logo" className="navbar-logo" />
        <span>The Freepaw Underground</span>
      </NavbarBrand>
      <NavbarToggler onClick={toggle} aria-label="Toggle navigation" />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ms-auto" navbar>
          {links.map((link) => (
            <NavItem key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
              >
                {link.label}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
      </Collapse>
    </Navbar>
  );
}
