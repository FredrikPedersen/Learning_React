import React, {useState} from 'react';
import {connect} from 'react-redux';

import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {
    const [sideDrawerIsVisibleState, setSideDrawerIsVisibleState] = useState(false);

    const sideDrawerClosedHandler = () => {
        setSideDrawerIsVisibleState(false);
    }

    const sideDrawerToggleHandler = () => {
        setSideDrawerIsVisibleState(!sideDrawerIsVisibleState);
    }

    return (
        <>
            <Toolbar
                isAuth={props.isAuthenticated}
                drawerToggleClicked={sideDrawerToggleHandler}/>
            <SideDrawer
                isAuth={props.isAuthenticated}
                open={sideDrawerIsVisibleState}
                closed={sideDrawerClosedHandler}/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);