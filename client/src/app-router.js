import React from 'react'
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'
import Home from './pages/home'
import { Products } from './pages/products';
import SignIn from './pages/signIn';
import { isAuthenticated } from './services/auth.service'
import Logout from './pages/signOut';
import { Header } from './components/header';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <div>
                    <Header />
                    <Component {...props} />
                </div>
            ) : (
                    <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                )
        }
    />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={SignIn} />
            <PrivateRoute path='/home' component={Home} />
            <PrivateRoute path='/products' component={Products} />
            <PrivateRoute path='/logout' component={Logout} />
            <Route path='*' component={() => <h1>Page not found!</h1>} />
        </Switch>
    </BrowserRouter>
);

export default Routes; 