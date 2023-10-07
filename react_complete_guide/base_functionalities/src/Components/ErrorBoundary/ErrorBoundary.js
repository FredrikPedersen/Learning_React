import React, {Component} from "react";

/* DO NOT WRAP THE ENTIRE APP IN ERROR BOUNDARIES!
* Error boundaries are used for displaying custom error messages when something that would otherwise crash the app goes wrong.
* When catching an error, whatever is rendered in the ErrorBoundary is shown instead of the default error message */

class ErrorBoundary extends Component {
    state = {
        hasError: false,
        errorMessage: ""
    };

    componentDidCatch = (error, info) => {
        this.setState({hasError: true, errorMessage: error});
    };

    render() {
        if (this.state.hasError) {
            return <h1>{this.state.errorMessage}</h1>;
        } else {
            return this.props.children;
        }
    }
}

export default ErrorBoundary;