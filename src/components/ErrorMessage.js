import React, {Component} from 'react';
import $ from 'jquery';

class ErrorMessage extends Component {

    render() {
        return (
            <span className="aler alert-danger">{this.props.errorText}</span>
        );
    }
}

export default ErrorMessage;