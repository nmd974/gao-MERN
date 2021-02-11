import React from 'react';
import Aux from "../../../../hoc/Auxiliary/Auxiliary";
import classes from "./Postes.css";
import more from "../../../../images/more.png";
import choose from "../../../../images/choose.png";

const Postes = (props) => {

    if(!props.items && !props.nom){
        return (
            <h2>Veuillez créer un poste informatique</h2>
        );
    }


    if (!props.nom){
        return (
            <Aux>
                <div className={classes.Container} onClick={() => props.showModalPoste()}>
                    <div>{props.posteSelected}</div>
                    <img src={more} alt="show more"/>
                </div>
            </Aux>
        );
    }

    return (
        <Aux>
            <div className={classes.Container} onClick={() => props.posteSelected(props.nom, props.id)}>
                <div>{props.nom}</div>
                <img src={choose} alt="choose"/>
            </div>
        </Aux>
    );



};

export default Postes;