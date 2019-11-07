import React, {Component} from "react";
import styles from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
    state = {
        showSideDrawer: true
    };

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    };

    render() {
        return (
            <>
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}/>
                <Toolbar/>
                <main
                    className={styles.content}>{this.props.children}
                </main>
            </>
        );
    }
}

export default Layout;