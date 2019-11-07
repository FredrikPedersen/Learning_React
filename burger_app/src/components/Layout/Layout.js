import React from "react";
import styles from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

const layout = (props) => (
    <>
        <SideDrawer/>
        <Toolbar/>
        <main className={styles.content}>{props.children}</main>
    </>
);

export default layout;