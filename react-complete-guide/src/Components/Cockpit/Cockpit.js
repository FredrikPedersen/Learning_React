import React, {useEffect} from "react";
import styles from "../../Components/Cockpit/Cockpit.css";

const cockpit = (props) => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        console.log("[Cockpit.js] useEffect")
    });

    const assignedClasses = [];
    let btnClass = "";

    if (props.showPersons) {
        btnClass = styles.red;
    }

    if (props.persons.length <= 2) {
        assignedClasses.push(styles.bold);
    }
    if (props.persons.length <= 1) {
        assignedClasses.push(styles.red);
    }

    let counterText = "There are " + props.persons.length + " persons in the list!";
    if (props.persons.length === 0) {
        counterText += " :( ";
    }

    //NOTE! assignedClasses.join turns the assignedClasses-array into a single String with a space between each element!
    return (
        <div className={styles.cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>{counterText}</p>
            <button
                className={btnClass}
                onClick={props.clicked}>
                Toggle Persons
            </button>
        </div>
    );
};

export default cockpit;