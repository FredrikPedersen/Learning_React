import React, {useEffect, useRef} from "react";
import styles from "../../Components/Cockpit/Cockpit.css";
import AuthContext from "../../Context/auth-context";

const cockpit = (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const toggleButtonRef = useRef(null);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        console.log("[Cockpit.js] useEffect");
        toggleButtonRef.current.click();
        return () => {
            console.log("[Cockpit.js] cleanup work in useEffect()");
        };
    }, []); //Only triggers once the app is rendered. Add values (like props.persons) inside the array to trigger useEffect() every time a change is made to that value. May take in several values.
    //You may have more than one useEffect setups, so it can be triggered by different changes!

    const assignedClasses = [];
    let btnClass = "";

    if (props.showPersons) {
        btnClass = styles.red;
    }

    if (props.personsLength <= 2) {
        assignedClasses.push(styles.bold);
    }
    if (props.personsLength <= 1) {
        assignedClasses.push(styles.red);
    }

    let counterText = "There are " + props.personsLength + " persons in the list!";
    if (props.personsLength === 0) {
        counterText += " :( ";
    }

    //NOTE! assignedClasses.join turns the assignedClasses-array into a single String with a space between each element!
    return (
        <div className={styles.cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>{counterText}</p>
            <button
                ref={toggleButtonRef}
                className={btnClass}
                onClick={props.clicked}>
                Toggle Persons
            </button>
            <AuthContext.Consumer>
                {context =>  <button onClick={context.login}>Log In</button> }
            </AuthContext.Consumer>
        </div>
    );
};

export default React.memo(cockpit);