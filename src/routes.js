import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import CadastroVideo from './pages/cadastro/Video';
import CadastroCategoria from './pages/cadastro/Categoria';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Home} exact/>
                <Route path="/cadastro/video" component={CadastroVideo} />
                <Route path="/cadastro/categoria" component={CadastroCategoria} />
                <Route component={() => (<div>Página 404</div>)} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;