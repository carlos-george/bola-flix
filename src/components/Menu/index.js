import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/bolaflix.png';
import './styles.css';
import Button from '../Button';

const Menu = () => {
    return (
        <nav className="menu">
            <Link to="/">
                <img className="logo" src={logo} alt="bolaFlix"/>
            </Link>

            <Button as={Link} className="button-link" to="/cadastro/video" >
                Novo Video
            </Button>

        </nav>
    );
}

export default Menu;