import React from 'react';

import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {

    return (
        <>
            <Backdrop show={props.show} clicked={props.modalClosed}/>
            <div
                className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                {props.children}
            </div>
        </>
    )
}

//Wrapping in React.memo by default makes the component only change when it's props are updated.
//The custom comparison function overrides the default behaviour, and is best used when not all prop changes should update the component.
//Replace shouldComponentUpdate.
export default React.memo(
    Modal,
    (prevProps, nextProps) =>
        nextProps.show === prevProps.show &&
        nextProps.children === prevProps.children
);