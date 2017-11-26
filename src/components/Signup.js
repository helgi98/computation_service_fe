import React from 'react';
import * as Service from '../Service';
import NavigationComponent from "./NavigationComponent";
import {Component} from "react";

class Signup extends NavigationComponent {
    constructor(props) {
        super(props, {
            errorText: ""
        });
    }

    signUp(e) {
        e.preventDefault();

        let user = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value
        };


        Service.signUp(user, err => {
            if (err) {
                this.setState({errorText: "Failed to sign up"});
            } else {
                this.navigate("/");
            }
        });
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
                                <form onSubmit={this.signUp.bind(this)}>
                                    <span className="aler alert-danger">{this.state.errorText}</span>
                                    <fieldset>
                                        Username
                                        <div className="form-group">
                                            <input className="form-control" name="username"
                                                   autoFocus="true"/>
                                        </div>
                                        Email
                                        <div className="form-group">
                                            <input className="form-control" name="email"/>
                                        </div>
                                        First name
                                        <div className="form-group">
                                            <input className="form-control" name="firstName"/>
                                        </div>
                                        Last name
                                        <div className="form-group">
                                            <input className="form-control" name="lastName"/>
                                        </div>
                                        Password
                                        <div className="form-group">
                                            <input type="password" className="form-control" name="password"/>
                                        </div>
                                        <button type="submit" className="btn btn-success btn-block">Register</button>
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

export default Signup;