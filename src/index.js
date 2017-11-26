import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './components/App';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Signup from "./components/Signup";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import AddArticle from "./components/AddArticle";
import Tasks from "./components/Tasks";

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Header/>
            <Switch>
                <Route exact path="/" component={MainPage}/>
                <Route path="/sign-up" component={Signup}/>
                <Route path="/login" component={Login}/>
                <Route path="/tasks" component={Tasks}/>
                <Route path="/add-task" component={AddArticle}/>
            </Switch>
            <Footer/>
        </div>
    </BrowserRouter>,
    document.getElementById('root')
);