import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const modal = props => {
    return (
        <>
        <Backdrop show={props.show} clicked={props.clicked}/>
        <div className={classes.Modal} style={{
            opacity : props.show ? 0 : 1
        }}>
            {props.children}
        </div>
        </>
    );
};


export default modal;