import React from "react";
import Aux from "../../../../hoc/Auxiliary/Auxiliary";
import classes from "./Creneaux.css";

const Creneaux = (props) => {

    return (
     <Aux>
         <div className={classes.Container}>
             <div className={classes.Creneaux}>
                <ul className={classes.Ul}>
                    <li className={classes.Li}>08:00 - 09:00</li>
                    <li className={classes.Li}>09:00 - 10:00</li>
                    <li className={classes.Li}>10:00 - 11:00</li>
                    <li className={classes.Li}>11:00 - 12:00</li>
                    <li className={classes.Li}>12:00 - 13:00</li>
                    <li className={classes.Li}>13:00 - 14:00</li>
                    <li className={classes.Li}>14:00 - 15:00</li>
                    <li className={classes.Li}>15:00 - 16:00</li>
                </ul>
             </div>
         </div>
     </Aux>
    );
  }


export default Creneaux;