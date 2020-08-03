import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

import './style.css';

const PageNotFound = () => (
  <div id="notfound">
    <div className="notfound">
      <div className="notfound-404">
        <h1>Oops!</h1>
      </div>
      <h2>404 - Page not found</h2>
      <p>
        A página que você está procurando pode ter tido o nome alterado
        ou está temporariamente indisponível.
      </p>
      <Button as={Link} className="button-link" to="/">
        Voltar para Home
      </Button>
    </div>
  </div>
);

export default PageNotFound;
