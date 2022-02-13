import { BrowserRouter as Router, Switch } from "react-router-dom";
import React, { Component } from 'react';
import { Provider } from "react-redux";
import PrivateRoute from "./PrivateRoute";
import store from "./store";

import './App.css';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../../../node_modules/bootstrap/dist/js/bootstrap';
import '../../../../node_modules/font-awesome/css/font-awesome.css';
import '../../../../node_modules/jquery/dist/jquery.min';
import '../../../../node_modules/popper.js/dist/popper';

import UsersManagement from "./UsersManagement";

class App extends Component {
    render () {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                            <Switch>
                                <PrivateRoute exact path="/usersManagent" component={UsersManagement} />
                            </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
