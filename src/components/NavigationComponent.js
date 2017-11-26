import React, {Component} from 'react';
import {Redirect} from "react-router-dom";


class NavigationComponent extends Component {
    constructor(props, state) {
        super(props);

        this._navigate = false;
        this._render = null;

        this.state = state;
    }

    navigate(place) {
        this._navigate = true;
        this._render = this.render;

        this.render = () => {
            if (this._navigate) {
                this._navigate = false;
                this.render = this._render;

                return <Redirect to={place} push={true}/>;
            } else {
                return this._render();
            }
        };

        this.forceUpdate();
    }
}

export default NavigationComponent;