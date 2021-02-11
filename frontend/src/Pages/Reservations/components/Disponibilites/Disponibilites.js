import React from 'react';
import Aux from "../../../../hoc/Auxiliary/Auxiliary";
import classes from "./Disponibilites.css";
import free from "../../../../images/free.png";
import nofree from "../../../../images/nofree.png";
import modifier from "../../../../images/modifier.png";
import deleteIcone from "../../../../images/delete.png";
import addIcone from "../../../../images/add.png";

const Disponibilite = (props) => {

    let date;
    if(!props.dateChange){
        date = props.date.getFullYear() 
                    + `${props.date.getMonth() < 10 ? "-0" : "-"}` 
                    + (props.date.getMonth()+1) + "-" + props.date.getDate();
    }else{
        date = props.date;
    }

    let creneaux =
        [
            {indispo: false, id: null},
            {indispo: false, id: null},
            {indispo: false, id: null},
            {indispo: false, id: null},
            {indispo: false, id: null},
            {indispo: false, id: null},
            {indispo: false, id: null},
            {indispo: false, id: null}
        ];
    
    for (let i = 0; i < props.reservations.length; i++) {
        const element = props.reservations[i];

        if(props.idPoste === element.poste && date === element.dateReservation){
            creneaux[element.creneau].indispo = true;
            creneaux[element.creneau].id = element._id;
        }
        
    };


return (
     <Aux>
         <div className={classes.Container}>
             <div className={classes.Disponibilites}>
                <ul className={classes.Ul}>
                    <li className={classes.Li}>
                        {creneaux[0].indispo ? 
                            <div>
                                <img 
                                    src={nofree} 
                                    alt="free" 
                                    className={classes.Img} 
                                    onClick={() => props.showModalReservation(creneaux[0].id)}
                                />
                                <img 
                                    src={deleteIcone} 
                                    alt="delete" 
                                    className={classes.Img} 
                                    onClick={() => props.deleteReservation(creneaux[0].id)}
                                />
                            </div>
                            : 
                            <div>
                                <img 
                                    src={free} 
                                    alt="free"
                                    className={classes.Img}
                                />
                                <img 
                                    src={addIcone} 
                                    alt="addResa"
                                    className={classes.Img}
                                    onClick={() => props.addNewReservation(0)}
                                />
                            </div>

                        }                       
                    </li>
                    <li className={classes.Li}>
                        {creneaux[1].indispo ? 
                            <div>
                            <img 
                                src={nofree} 
                                alt="free" 
                                className={classes.Img} 
                                onClick={() => props.showModalReservation(creneaux[1].id)}
                            />
                            <img 
                                src={deleteIcone} 
                                alt="delete" 
                                className={classes.Img} 
                                onClick={() => props.deleteReservation(creneaux[1].id)}
                            />
                        </div> : 
                            <div>
                            <img 
                                src={free} 
                                alt="free"
                                className={classes.Img}
                            />
                            <img 
                                src={addIcone} 
                                alt="addResa"
                                className={classes.Img}
                                onClick={() => props.addNewReservation(1)}
                            />
                        </div>
                        }                         
                    </li>
                    <li className={classes.Li}>
                        {creneaux[2].indispo ? 
                            <div>
                            <img 
                                src={nofree} 
                                alt="free" 
                                className={classes.Img} 
                                onClick={() => props.showModalReservation(creneaux[2].id)}
                            />
                            <img 
                                src={deleteIcone} 
                                alt="delete" 
                                className={classes.Img} 
                                onClick={() => props.deleteReservation(creneaux[2].id)}
                            />
                        </div> : 
                            <div>
                            <img 
                                src={free} 
                                alt="free"
                                className={classes.Img}
                            />
                            <img 
                                src={addIcone} 
                                alt="addResa"
                                className={classes.Img}
                                onClick={() => props.addNewReservation(2)}
                            />
                        </div>
                        }                         
                    </li>
                    <li className={classes.Li}>
                        {creneaux[3].indispo ? 
                            <div>
                            <img 
                                src={nofree} 
                                alt="free" 
                                className={classes.Img} 
                                onClick={() => props.showModalReservation(creneaux[3].id)}
                            />
                            <img 
                                src={deleteIcone} 
                                alt="delete" 
                                className={classes.Img} 
                                onClick={() => props.deleteReservation(creneaux[3].id)}
                            />
                        </div> : 
                            <div>
                            <img 
                                src={free} 
                                alt="free"
                                className={classes.Img}
                            />
                            <img 
                                src={addIcone} 
                                alt="addResa"
                                className={classes.Img}
                                onClick={() => props.addNewReservation(3)}
                            />
                        </div>
                        }                         
                    </li>
                    <li className={classes.Li}>
                        {creneaux[4].indispo ? 
                            <div>
                            <img 
                                src={nofree} 
                                alt="free" 
                                className={classes.Img} 
                                onClick={() => props.showModalReservation(creneaux[4].id)}
                            />
                            <img 
                                src={deleteIcone} 
                                alt="delete" 
                                className={classes.Img} 
                                onClick={() => props.deleteReservation(creneaux[4].id)}
                            />
                        </div>: 
                            <div>
                            <img 
                                src={free} 
                                alt="free"
                                className={classes.Img}
                            />
                            <img 
                                src={addIcone} 
                                alt="addResa"
                                className={classes.Img}
                                onClick={() => props.addNewReservation(4)}
                            />
                        </div>
                        }                        
                    </li>
                    <li className={classes.Li}>
                        {creneaux[5].indispo ? 
                            <div>
                            <img 
                                src={nofree} 
                                alt="free" 
                                className={classes.Img} 
                                onClick={() => props.showModalReservation(creneaux[5].id)}
                            />
                            <img 
                                src={deleteIcone} 
                                alt="delete" 
                                className={classes.Img} 
                                onClick={() => props.deleteReservation(creneaux[5].id)}
                            />
                        </div> : 
                            <div>
                            <img 
                                src={free} 
                                alt="free"
                                className={classes.Img}
                            />
                            <img 
                                src={addIcone} 
                                alt="addResa"
                                className={classes.Img}
                                onClick={() => props.addNewReservation(5)}
                            />
                        </div>
                        }                         
                    </li>
                    <li className={classes.Li}>
                        {creneaux[6].indispo ? 
                            <div>
                            <img 
                                src={nofree} 
                                alt="free" 
                                className={classes.Img} 
                                onClick={() => props.showModalReservation(creneaux[6].id)}
                            />
                            <img 
                                src={deleteIcone} 
                                alt="delete" 
                                className={classes.Img} 
                                onClick={() => props.deleteReservation(creneaux[6].id)}
                            />
                        </div> : 
                            <div>
                            <img 
                                src={free} 
                                alt="free"
                                className={classes.Img}
                            />
                            <img 
                                src={addIcone} 
                                alt="addResa"
                                className={classes.Img}
                                onClick={() => props.addNewReservation(6)}
                            />
                        </div>
                        }                         
                    </li>
                    <li className={classes.Li}>
                        {creneaux[7].indispo ? 
                            <div>
                            <img 
                                src={nofree} 
                                alt="free" 
                                className={classes.Img} 
                                onClick={() => props.showModalReservation(creneaux[7].id)}
                            />
                            <img 
                                src={deleteIcone} 
                                alt="delete" 
                                className={classes.Img} 
                                onClick={() => props.deleteReservation(creneaux[7].id)}
                            />
                        </div> : 
                            <div>
                            <img 
                                src={free} 
                                alt="free"
                                className={classes.Img}
                            />
                            <img 
                                src={addIcone} 
                                alt="addResa"
                                className={classes.Img}
                                onClick={() => props.addNewReservation(7)}
                            />
                        </div>
                        }                         
                    </li>
                </ul>
             </div>
         </div>
     </Aux>
    );
};

export default Disponibilite;