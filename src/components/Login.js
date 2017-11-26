import React, {Component} from 'react';
import * as Service from '../Service';
import {Redirect} from "react-router";
import ErrorMessage from './ErrorMessage';
import NavigationComponent from "./NavigationComponent";

class Login extends NavigationComponent {

    constructor(props) {
        super(props, {
            errorText: ""
        });
    }

    login(e) {
        e.preventDefault();

        let creds = {
            username: e.target.username.value,
            password: e.target.password.value
        };

        Service.attemptLogin(creds, err => {
          if (err) {
              this.setState({errorText: "Failed to login"});
          } else {
              this.navigate("/");
          }
        })
    }

    render() {      
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Welcome</h3>
                            </div>
                            <div className="panel-body">
                                <form name='loginForm' onSubmit={this.login.bind(this)}>
                                    <ErrorMessage errorText={this.state.errorText}/>
                                    <fieldset>
                                        <div className="form-group">
                                            <input className="form-control" placeholder="User name" name="username" type="text" autoFocus/>
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control" placeholder="Password" name="password" type="password"/>
                                        </div>
                                        <button type="submit" className="btn btn-success btn-block">Login</button>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login