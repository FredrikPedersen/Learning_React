import React from "react";
import styles from "./Toolbar.css";
import Logo from "../../Logo/Logo"
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerTogle";
import NavigationItems from "../NavigationItems/NavigationItems";

const toolbar = (props) => (
    <header className={styles.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <div className={styles.Logo}>
            <Logo/>
        </div>
        <nav className={styles.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
);

export default toolbar;