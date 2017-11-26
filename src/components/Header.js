import React, {Component} from 'react';
import '../Constants';
import * as Service from '../Service';
import {Link} from "react-router-dom";

class Header extends Component {

    logout() {
        Service.logout();
    }

    render() {
        let isAuthenticated = Service.isAuthenticated();
        let isAdmin = Service.isAdmin();

        return (
            <div className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse"
                                data-target=".navbar-collapse">
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                        </button>
                        <Link className="navbar-brand" to="/">Home</Link>
                    </div>
                    <div className="navbar-collapse collapse">
                        <ul className="nav navbar-nav">
                            {!isAuthenticated ? <li><Link to="/sign-up">Sign up</Link></li> : ''}
                            {!isAuthenticated ? <li><Link to="/login">Log in</Link></li> : ''}
                            {isAuthenticated ? <li><Link to="/tasks">Your tasks</Link></li> : ''}
                            {isAuthenticated ? <li><Link to="/add-task">Add task</Link></li> : ''}
                            {isAuthenticated ? <li className="navbar-right"><Link to="/" onClick={e => this.logout()}>Log out</Link></li> : ''}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;