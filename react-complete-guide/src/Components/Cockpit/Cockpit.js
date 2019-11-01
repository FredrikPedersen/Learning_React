import React from "react";
import styles from "../../Components/Cockpit/Cockpit.css";

const cockpit = (props) => {

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

    return (
        <div className={styles.cockpit}>
            <h1>Hi, I'm a React App</h1>
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