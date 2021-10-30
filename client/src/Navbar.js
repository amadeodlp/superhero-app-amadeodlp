import React from "react";
import {Link} from "react-router-dom";
import Superhero from "./images/superheroes.png"

const Navbar = () => {
    return (
        <div className="container">
        <nav className="navbar fixed-top navbar-expand-md">
            <img src={Superhero} alt="logo-by-Freepik" width="30" height="24"/>
            <ul className="navbar-nav ms-auto text-center">
                <li>
                    <Link className="nav-link active" to="/">Favoritos</Link>
                </li>
                <li>
                    <Link className="nav-link active" to="/Search">Búsqueda</Link>
                </li>
            </ul>
        </nav>
        </div>
    )
}

export default Navbar;