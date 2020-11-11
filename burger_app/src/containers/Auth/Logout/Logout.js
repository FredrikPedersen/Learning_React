import React, {useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import * as actions from '../../../store/actions/index';

const Logout = (props) => {

    //Pass no dependencies to useEffect to ensure it only runs once when the component is mounted.
    //Replaces componentDidMount
    useEffect(() => {
        props.onLogout();
    }, [])

    return <Redirect to="/"/>;
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    };
};

export default connect(null, mapDispatchToProps)(Logout);