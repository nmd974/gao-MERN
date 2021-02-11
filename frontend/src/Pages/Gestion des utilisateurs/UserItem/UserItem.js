import React from "react"; 
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import classes from "./UserItem.css";
import deleteIcone from "../../../images/delete.png";
import updateIcone from "../../../images/modifier.png";

const UserItem = (props) => {

    return (
        <Aux>
            <div className={classes.Container}>
                <div className={classes.Nom}>{props.id}</div>
                <div className={classes.Nom}>{props.nom}</div>
                <div className={classes.Nom}>{props.prenom}</div>
                <div>
                    <img src={updateIcone} style={{marginRight:"10px"}} 
                        onClick={() => props.showModalUpdate(props.nom, props.id, props.prenom, props.email)} 
                        className={classes.Img} alt="modifier poste"
                    />
                    <img src={deleteIcone} className={classes.Img} onClick={() => props.deleteUser(props.id)} alt="supprimer poste"/>
                </div>

            </div>
        </Aux>
    );
  }


export default UserItem;