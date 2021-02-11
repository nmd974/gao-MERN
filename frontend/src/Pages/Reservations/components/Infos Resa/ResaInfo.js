import React, { Component } from 'react';
import Aux from "../../../../hoc/Auxiliary/Auxiliary";
import classes from "./ResaInfo.css";

let heureFin;
let heureDebut;

class ResaInfo extends Component{

    state={

    }

    render(){


    if(this.props.resa[this.props.idResaList].heureDebut){
        heureDebut = this.props.resa[this.props.idResaList].heureDebut.toString();
        if(heureDebut.length < 4){
            let heure = heureDebut;
            let minutes = heureDebut;
            heureDebut = heure.slice(0,1) + ":" + minutes.slice(1,3);
        }else{
            let heure = heureDebut;
            let minutes = heureDebut;
            heureDebut = heure.slice(0,2) + ":" + minutes.slice(2,4);
        }

    };

    if(this.props.resa[this.props.idResaList].heureFin){
        heureFin = this.props.resa[this.props.idResaList].heureFin.toString();
        if(heureFin.length < 4){
            let heure = heureFin;
            let minutes = heureFin;
            heureFin = heure.slice(0,1) + ":" + minutes.slice(1,3);
        }else{
            let heure = heureFin;
            let minutes = heureFin;
            heureFin = heure.slice(0,2) + ":" + minutes.slice(2,4);
        }

    };


    return (
        <Aux>
            <div className={classes.Container}>
                <div>
                    <p>{this.props.posteSelected}</p>
                </div>
                <div>
                    <p>Nom d'utilisateur :</p>
                    <p>{this.props.resa[this.props.idResaList].utilisateur}</p>
                </div>
                {/* <div>
                    <p>Date:</p>
                    <input type="date" value={this.props.resa[this.props.idResaList].dateReservation} onChange={(event) => {this.props.changeDate(event.target.value)}}/>
                </div> */}
                {/* <div>
                    <div>
                        <h2>Heure de début :</h2>
                        <p>{heureDebut}</p>
                    </div>
                    <div>
                        <h2>Heure de fin :</h2>
                        <p>{heureFin}</p>
                    </div>
                </div> */}
                {/* <div>
                    <button>Annuler réservation</button>
                    <button>Modifier réservation</button>
                </div> */}
            </div>
        </Aux>
    );
}
};

export default ResaInfo;