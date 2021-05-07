import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { logoutUser, setCurrentUser } from './actions/auth';
import PrivateRoute from './components/private-route/PrivateRoute';

import { Provider } from 'react-redux';
import store from './store';

import Landing from './components/layout/Landing';
import Dashboard from './components/dashboard/Dashboard';

if(Cookies.get('discord-user')) {
    const token = Cookies.get('discord-user');
    const decoded = jwt_decode(token);

    store.dispatch(setCurrentUser(decoded));
    
    const currentTime = Date.now() / 1000;
    if(decoded.exp < currentTime) {
        store.dispatch(logoutUser());

        window.location.href = '/';
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Route exact path="/" component={Landing} />
                        <Switch>
                            <PrivateRoute exact path="/dashboard" component={Dashboard} />
                        </Switch>
                    </div>
                </Router>
            </Provider>
        )
    }
};

export default App;