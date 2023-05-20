import React from "react";
import styles from "./Button.module.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAddressCard } from '@fortawesome/free-regular-svg-icons';

function Button(props){
        return (
        <button className="button" onClick={props.func}>{props.text}</button>
        );
}
export default Button;