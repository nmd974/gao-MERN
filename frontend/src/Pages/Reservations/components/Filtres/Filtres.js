import React from "react";
import Aux from "../../../../hoc/Auxiliary/Auxiliary";
import classes from "./Filtres.css";

const Filtres = (props) => {

    let dateOfTheDay;

    if(!props.dateChange){
        dateOfTheDay = props.date.getFullYear() 
                    + `${props.date.getMonth() < 10 ? "-0" : "-"}` 
                    + (props.date.getMonth()+1) + "-" + props.date.getDate();
    }else{
        dateOfTheDay = props.date;
    }



    return (
     <Aux>
         <div className={classes.Container}>
             <form className={classes.Form}>
                 <input type="date" value={dateOfTheDay} onChange={(event) => {props.changeDate(event.target.value)}}/>
             </form>
         </div>
     </Aux>
    );
  }


export default Filtres;