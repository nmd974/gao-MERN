import React, { Component } from "react"; 
import Aux from "../../hoc/Auxiliary/Auxiliary";
import axios from "axios";

import Filtres from "./components/Filtres/Filtres";
import Creneaux from "./components/Creneaux/Creneaux";
import Postes from "./components/Postes/Postes";

import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";

import classes from "./Reservations.css";
import Disponibilites from "./components/Disponibilites/Disponibilites";
import ResaInfo from "./components/Infos Resa/ResaInfo";

import loupe from "../../images/loupe.png";

let responseData;
let date;

class Reservations extends Component {

    state={
        date: new Date(),
        showModalPoste: false,
        dateChange: false,
        posteSelected: null,
        idPosteSelected: null,
        idResaToShow: null,
        showModalAddNewresa: false,
        isLoading: true,
        showModalReservation: false,
        idResaList: null,
        postes: [],
        reservationsList: [],
        dateToManage: "",
        userToManage: "",
        nomUser: "",
        prenomUser: "",
        emailUser: "",
        showUserInfo: false,
        creneauToManage:"",
        userToFind: "",
        error: false,
        errorContent: "",
        showMessageError: false,
        showModalConfirmation: false,
        confirmationMessage: ""
    }

    async componentDidMount() {
        try{
            responseData = await axios.get(process.env.REACT_APP_BACKEND_URL + `/reservations`)
            this.setState({reservationsList : responseData.data.reservations, isLoading : false});
        }catch(err){
            this.setState({error : true});
            console.log(err);
        }

        try{
            responseData = await axios.get(process.env.REACT_APP_BACKEND_URL + `/postes`)
            this.setState({postes : responseData.data.postes, isLoading : false, idPosteSelected: responseData.data.postes[0]._id, posteSelected: responseData.data.postes[0].nom});
        }catch(err){
            this.setState({error : true});
            console.log(err);
        }

        // responseData = await axios.get(process.env.REACT_APP_BACKEND_URL + `/reservations`)
        // console.log(responseData);
    }

    changeDate = (newDate) => {
        this.setState({date: newDate, dateChange: true});
    }

    //Gestion des postes/////////////////////////////////////////////////////
    showModalPoste = () => {
        this.setState({showModalPoste: true});
    }
    unShowModalPoste = () => {
        this.setState({showModalPoste: false});
    }
    changePosteSelected = (nom, id) => {
        this.setState({posteSelected: nom, showModalPoste: false, idPosteSelected: id});
    }
    /////////////////////////////////////////////////////////////////////////

    //Gestion des Reservations/////////////////////////////////////////////////////
    showModalReservation = (idResaToShow) => {
        let numberResaList = this.state.reservationsList.findIndex(resa => resa._id === idResaToShow)
        this.setState({showModalReservation: true, idResaToShow: idResaToShow, idResaList: numberResaList});
    }
    unShowModalReservation = () => {
        this.setState({showModalReservation: false});
    }
    changePosteSelected = (nom, id) => {
        this.setState({posteSelected: nom, showModalPoste: false, idPosteSelected: id});
    }

    deleteReservation = async (id) => {
        try{
            responseData = await axios.delete(process.env.REACT_APP_BACKEND_URL + `/reservations/${id}`)
            window.location.reload(true);
          }catch(err){
            this.setState({error : true});
            console.log(err);
          }
    }

    addNewReservation = async () => {
        await axios
        .post(process.env.REACT_APP_BACKEND_URL + `/reservations/create/${this.state.idPosteSelected}/${this.state.userToFind}`, {dateReservation: date, creneau: this.state.creneauToManage})
        .then(res =>
          {res.data.error ? 
            this.setState({error: true, errorContent: res.data.error, showModalError: true}) : 
            this.setState({confirmationMessage: res.data.confirmation, showModalConfirmation: true})
          }
        )
        .catch(err => console.error(err));
    }

    showModalAddNewresa = (creneau) => {
        this.setState({showModalAddNewresa: true, creneauToManage: creneau})
    }

    unShowModalAddNewresa = () => {
        this.setState({showModalAddNewresa: false})
    }
    /////////////////////////////////////////////////////////////////////////

    //Gestion utilisateur/////////////////////////////////////////////////////
    searchUser = async (id) => {
        console.log(id);
        await axios
        .get(process.env.REACT_APP_BACKEND_URL + `/users/${id}`)
        .then(res =>
          {res.data.error ? 
            this.setState({error: true, errorContent: res.data.error, showModalError: true}) : 
            this.setState({nomUser: res.data.nom, prenomUser: res.data.prenom, emailUser: res.data.email, showUserInfo: true})
          }
        )
        .catch(err => console.error(err));
    }

    changeUserToFind = (user) => {
        this.setState({userToFind: user});
    }

    unShowUserInfo = () => {
        this.setState({showUserInfo: false})
    }
    /////////////////////////////////////////////////////////////////////////

    //Gestion erreur/////////////////////////////////////////////////////
    showMessageErrorHandler = () => {
        this.setState({showMessageError: true});
      }
      
      unShowModalErrorHandler = () => {
        this.setState({showModalError: false, errorContent: null, error: false});
      }
    /////////////////////////////////////////////////////////////////////////
    
    /////////////////////////////////////////////////////////////////////////
      unShowModalConfirmation = () => {
        this.setState({showModalConfirmation: false, confirmationMessage: null});
        window.location.reload(true);
      }
    /////////////////////////////////////////////////////////////////////////

    render() {     

        if(this.state.isLoading){
            return(
                <Spinner/>
            );
        };

        if(this.state.error){
            return (
              <Aux>
                <Modal show={this.state.showModalError} modalClosed={this.unShowModalErrorHandler}>
                    <div className={classes.ContainerModalError}>
                      <div className={classes.TitreMessage}><h1>{this.state.errorContent}</h1></div>
                      <div><button className={classes.ButtonCancel} onClick={this.unShowModalErrorHandler}>OK</button></div>
                    </div>
                </Modal>
              </Aux>
            );
          };

          if(this.state.showModalConfirmation){
            return (
              <Aux>
                <Modal show={this.state.showModalConfirmation} modalClosed={this.unShowModalConfirmation}>
                    <div className={classes.ContainerModalConfirmation}>
                      <div className={classes.TitreMessage}><h1>{this.state.confirmationMessage}</h1></div>
                      <div><button className={classes.ButtonAdd} onClick={this.unShowModalConfirmation}>OK</button></div>
                    </div>
                </Modal>
              </Aux>
            );
          };

        if(this.state.showUserInfo){
            return(
                <Aux>
                    <Modal show={this.state.showUserInfo} modalClosed={this.unShowUserInfo}>
                        <div className={classes.Container}>
                            <div className={classes.ModalUserInfo}>
                                <p>Nom :</p>
                                <p>{this.state.nomUser}</p>
                            </div>
                            <div className={classes.ModalUserInfo}>
                                <p>Prenom :</p>
                                <p>{this.state.prenomUser}</p>
                            </div>
                            <div className={classes.ModalUserInfo}>
                                <p>Email :</p>
                                <p>{this.state.emailUser}</p>
                            </div>
                            <div>
                                <button className={classes.ButtonAdd} onClick={this.unShowUserInfo}>OK</button>
                            </div>
                        </div>
                    </Modal>
                </Aux>
            );
        }

        if(this.state.showModalAddNewresa && !this.state.error){
            if(!this.state.dateChange){
                date = this.state.date.getFullYear() 
                            + `${this.state.date.getMonth() < 10 ? "-0" : "-"}` 
                            + (this.state.date.getMonth()+1) + "-" + this.state.date.getDate();
            }else{
                date = this.state.date;
            }

            return(
                <Aux>
                    <Modal show={this.state.showModalAddNewresa}>
                        <div className={classes.Container}>
                            <div>
                                <p>{this.state.posteSelected}</p>
                            </div>
                            <div>
                                <p>Nom d'utilisateur :</p>
                                <div>
                                    <input type="text" value={this.state.userToFind} onChange={(event) => this.changeUserToFind(event.target.value)}/>
                                    <img src={loupe} alt="search" onClick={() => this.searchUser(this.state.userToFind)}/>
                                </div>
                            </div>
                            <div>
                                <button onClick={this.unShowModalAddNewresa}  className={classes.ButtonCancel}>Annuler</button>
                                <button onClick={this.addNewReservation}  className={classes.ButtonAdd}>Ajouter</button>
                            </div>
                        </div>
                    </Modal>
                </Aux>
            );
        };

        if(this.state.showModalReservation && !this.state.error){
            return(
                <Aux>
                    <Modal show={this.state.showModalReservation} modalClosed={this.unShowModalReservation}>
                        <div className={classes.ContainerModalResaInfo}>
                            <ResaInfo
                                resa={this.state.reservationsList}
                                idToShow={this.state.idResaToShow}
                                idResaList={this.state.idResaList}
                                posteSelected={this.state.posteSelected}
                                idPosteSelected={this.state.idPosteSelected}
                                date={this.state.date}
                                changeDate={this.changeDate}
                                dateChange={this.state.dateChange}
                            />
                        </div>
                    </Modal>
                </Aux>
            );
        };

        if(this.state.showModalPoste && !this.state.error){
            return(
                <Aux>
                    <Modal show={this.state.showModalPoste} modalClosed={this.unShowModalPoste}>
                    <div>
                        {this.state.postes.map(poste => (
                            <Postes 
                                key={poste._id}
                                id={poste._id}
                                nom={poste.nom}
                                posteSelected={this.changePosteSelected}
                            />
                        ))}
                    </div>
                    </Modal>
                </Aux>
            );
        };

        if(!this.state.isLoading && this.state.reservationsList && !this.state.error){

            if(!this.state.dateChange){
                date = this.state.date.getFullYear() 
                            + `${this.state.date.getMonth() < 10 ? "-0" : "-"}` 
                            + (this.state.date.getMonth()+1) + "-" + this.state.date.getDate();
            }else{
                date = this.state.date;
            };

            return (
                <Aux>        
                    <div className={classes.Container}>
                        <div>
                            <div>
                                <Filtres
                                    date={this.state.date}
                                    changeDate={this.changeDate}
                                    dateChange={this.state.dateChange}
                                />
                            </div>
                            <div>
                                <Postes
                                    items={this.state.postes}
                                    posteSelected={this.state.posteSelected}
                                    showModalPoste={this.showModalPoste}
                                />
                            </div>
                        </div>
                        <div>
                            <div className={classes.CreneauxDispo}>
                                <Creneaux/>
                                <Disponibilites
                                    reservations={this.state.reservationsList}
                                    posteSelected={this.state.posteSelected}
                                    idPoste={this.state.idPosteSelected}
                                    date={this.state.date}
                                    dateChange={this.state.dateChange}
                                    showModalReservation={this.showModalReservation}
                                    addNewReservation={this.showModalAddNewresa}
                                    updateReservation={this.updateReservation}
                                    deleteReservation={this.deleteReservation}
                                />
                            </div>
                        </div>
                    </div>
                </Aux>
                );
        }
        
  }
}

export default Reservations;