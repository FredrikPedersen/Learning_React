import React from "react";
import styles from "./SideDrawer.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

const sideDrawer = (props) => {
    return (
        <div className={styles.SideDrawer}>
            <Logo />
            <nav>
                <NavigationItems/>
            </nav>
        </div>
    );
};

export default sideDrawer;