import React from "react";
import {Link} from "react-router-dom";
import Superhero from "./images/superheroes.png"
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

const NavigationBar = () => {
    return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
    <Container>
    <Navbar.Brand>Crea tu equipo</Navbar.Brand>
    <img src={Superhero} className="icon"/>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
       <Nav.Link className="link-container"> <Link to="/" className="link-light" >Favoritos</Link></Nav.Link>
       <Nav.Link className="link-container"> <Link to="/Search" className="link-light" >Búsqueda</Link></Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
)
}

export default NavigationBar;