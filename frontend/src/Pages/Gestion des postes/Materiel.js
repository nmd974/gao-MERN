import React, { Component } from "react"; 
import Aux from "../../hoc/Auxiliary/Auxiliary";
import axios from "axios";
import Spinner from "../../components/UI/Spinner/Spinner";
import MaterielItem from "./MaterielItem/MaterielItem";
import classes from "./Materiel.css";
import addMaterielIcone from "../../images/addMateriel.png";
import Modal from "../../components/UI/Modal/Modal";

let responseData;
class Materiel extends Component {

  state={
    error: false,
    isLoading: true,
    materialList: null,
    showModal: false,
    nameNewMateriel: "",
    showMessageError: false,
    showModalError: false,
    errorContent: null,
    showModalConfirmation: false,
    confirmationMessage: null,
    nameMaterielToUpdate: "",
    showModalUpdate: false,
    idMaterielToUpdate: null
}

async componentDidMount() {
    try{
        responseData = await axios.get(process.env.REACT_APP_BACKEND_URL + `/postes`)
        this.setState({materialList : responseData.data.postes, isLoading : false});
    }catch(err){
        this.setState({error : true});
        console.log(err);
    }
}

async deleteMateriel (id) {

  try{
    responseData = await axios.delete(process.env.REACT_APP_BACKEND_URL + `/postes/${id}`)
    window.location.reload(true);
  }catch(err){
    this.setState({error : true});
    console.log(err);
  }
}

addNewMateriel = async () => {
    await axios
      .post(process.env.REACT_APP_BACKEND_URL + `/postes/create`, {nom: this.state.nameNewMateriel})
      .then(res =>
        {res.data.error ? 
          this.setState({error: true, errorContent: res.data.error, showModalError: true}) : 
          this.setState({confirmationMessage: res.data.message, showModalConfirmation: true})
        }
      )
      .catch(err => console.error(err));
}

updateMateriel = async () => {
  await axios
  .patch(process.env.REACT_APP_BACKEND_URL + `/postes/${this.state.idMaterielToUpdate}`, {nom: this.state.nameMaterielToUpdate})
  .then(res =>
    {res.data.error ? 
      this.setState({error: true, errorContent: res.data.error, showModalError: true}) : 
      this.setState({confirmationMessage: res.data.message, showModalConfirmation: true})
    }
  )
  .catch(err => console.error(err));
}



showModalHandler = () => {
  this.setState({showModal: true});
}

unShowModalHandler = () => {
  this.setState({showModal: false});
}

changeNameNewMaterielHandler = (nom) =>{
  this.setState({nameNewMateriel: nom, showMessageError: false});
}

changeNameUpdateMaterielHandler = (nom) =>{
  this.setState({nameMaterielToUpdate: nom, showMessageError: false});
}

showModalUpdate = (nom, id) => {
  this.setState({nameMaterielToUpdate: nom, idMaterielToUpdate: id, showModalUpdate: true});
}

unShowModalUpdate = () => {
  this.setState({showModalUpdate: false});
}

showMessageErrorHandler = () => {
  this.setState({showMessageError: true});
}

unShowModalErrorHandler = () => {
  this.setState({showModalError: false, errorContent: null, error: false});
}

unShowModalConfirmation = () => {
  this.setState({showModalConfirmation: false, confirmationMessage: null});
  window.location.reload(true);
}


  render() {

    if(this.state.isLoading){
      return <Spinner/>;
    }

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

    if(!this.state.isLoading && !this.state.error && this.state.materialList && !this.state.showModal && !this.state.showAddNewMateriel && !this.state.showModalUpdate){
      return (
        <Aux>
          <div className={classes.Container}>
            <button className={classes.ButtonNew} onClick={this.showModalHandler}>
                Ajouter un nouveau materiel 
                <img src={addMaterielIcone} alt="ajouter materiel"/>
            </button>
            <div className={classes.Titre}><h1>Liste des postes informatiques :</h1></div>
            <div className={classes.ListeMateriel}>
              {this.state.materialList.map(poste => (
                <MaterielItem
                  key={poste._id}
                  id={poste._id}
                  nom={poste.nom}
                  deleteMateriel={this.deleteMateriel}
                  showModalUpdate={this.showModalUpdate}
                />
              ))}
            </div>
          </div>
          
        </Aux>
       );
    }

    if(!this.state.isLoading && !this.state.error && this.state.materialList && this.state.showModal){
      return (
        <Aux>
            <Modal show={this.state.showModal}>
                <div className={classes.ContainerFormNewMateriel}>
                  <h1 className={classes.Titre}>Ajout d'un nouveau poste informatique</h1>
                  <div className={classes.FormNewMateriel}>
                      <label className={classes.Label}>Nom du poste informatique :</label>
                      <input className={classes.Input} value={this.state.nameNewMateriel} type="text" onChange={(event) => this.changeNameNewMaterielHandler(event.target.value)}/>
                      <p className={classes.MessageErreur} style={this.state.showMessageError ? {display:"initial"}:{display:"none"}}>
                        Veuillez saisir le nom du poste avant de valider
                      </p>
                      <div className={classes.Button}>
                        <button className={classes.ButtonCancel} onClick={this.unShowModalHandler}>Annuler</button>
                        <button className={classes.ButtonAdd} type="submit"
                          onClick={this.state.nameNewMateriel !== "" ? this.addNewMateriel : this.showMessageErrorHandler}>
                            Ajouter
                        </button>
                      </div>
                  </div>
                </div>
            </Modal>
          
        </Aux>
       );
    }

    if(this.state.showModalUpdate){
      return (
        <Aux>
            <Modal show={this.state.showModalUpdate}>
                <div className={classes.ContainerFormNewMateriel}>
                  <h1 className={classes.Titre}>Modification d'un nouveau poste informatique</h1>
                  <div className={classes.FormNewMateriel}>
                      <label className={classes.Label}>Nom du poste informatique :</label>
                      <input className={classes.Input} value={this.state.nameMaterielToUpdate} type="text" onChange={(event) => this.changeNameUpdateMaterielHandler(event.target.value)}/>
                      <p className={classes.MessageErreur} style={this.state.showMessageError ? {display:"initial"}:{display:"none"}}>
                        Veuillez saisir le nom du poste avant de valider
                      </p>
                      <div className={classes.Button}>
                        <button className={classes.ButtonCancel} onClick={this.unShowModalUpdate}>Annuler</button>
                        <button className={classes.ButtonAdd} type="submit"
                          onClick={this.state.nameMaterielToUpdate !== "" ? this.updateMateriel : this.showMessageErrorHandler}>
                            Ajouter
                        </button>
                      </div>
                  </div>
                </div>
            </Modal>
          
        </Aux>
       );
    }

  }
}

export default Materiel;