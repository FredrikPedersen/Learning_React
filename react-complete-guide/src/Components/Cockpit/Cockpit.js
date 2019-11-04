import React, {useEffect} from "react";
import styles from "../../Components/Cockpit/Cockpit.css";

const cockpit = (props) => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        console.log("[Cockpit.js] useEffect");

        //Imitate a Http Request
        setTimeout(() => {
            alert("Data saved to cloud!")
        }, 1000);
    }, []); //Only triggers once the app is rendered. Add values (like props.persons) inside the array to trigger useEffect() every time a change is made to that value. May take in several values.
    //You may have more than one useEffect setups, so it can be triggered by different changes!

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