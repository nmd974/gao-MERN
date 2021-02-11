import React from "react"; 
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import classes from "./MaterielItem.css";
import deleteIcone from "../../../images/delete.png";
import updateIcone from "../../../images/modifier.png";

const MaterielItem = (props) => {

    return (
        <Aux>
            <div className={classes.Container}>
                <div className={classes.Nom}>{props.nom}</div>
                <div>
                    <img src={updateIcone} style={{marginRight:"10px"}} onClick={() => props.showModalUpdate(props.nom, props.id)} className={classes.Img} alt="modifier poste"/>
                    <img src={deleteIcone} className={classes.Img} onClick={() => props.deleteMateriel(props.id)} alt="supprimer poste"/>
                </div>

            </div>
        </Aux>
    );
  }


export default MaterielItem;