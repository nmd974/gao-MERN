import React, { Component } from "react"; 
import Aux from "../../hoc/Auxiliary/Auxiliary";
import axios from "axios";
import Spinner from "../../components/UI/Spinner/Spinner";
import UserItem from "./UserItem/UserItem";
import classes from "./User.css";
import addUserIcone from "../../images/addUser.png";
import Modal from "../../components/UI/Modal/Modal";

let responseData;
class User extends Component {

  state={
    error: false,
    isLoading: true,
    userList: null,
    showModal: false,
    nameNewUser: "",
    prenomNewUser: "",
    emailNewUser: "",
    showMessageError: false,
    showModalError: false,
    errorContent: null,
    showModalConfirmation: false,
    confirmationMessage: null,
    nameUserToUpdate: "",
    prenomUserToUpdate:"",
    emailUserToUpdate: "",
    showModalUpdate: false,
    idUserToUpdate: null,
    emailUser: "",
    prenomUser: ""
}

async componentDidMount() {
    try{
        responseData = await axios.get(process.env.REACT_APP_BACKEND_URL + `/users`)
        this.setState({userList : responseData.data.users, isLoading : false});
    }catch(err){
        this.setState({error : true});
        console.log(err);
    }
}

async deleteUser (id) {

  try{
    responseData = await axios.delete(process.env.REACT_APP_BACKEND_URL + `/users/${id}`)
    window.location.reload(true);
  }catch(err){
    this.setState({error : true});
    console.log(err);
  }
}

addNewUser = async () => {
  console.log("HERE???");
    await axios
      .post(process.env.REACT_APP_BACKEND_URL + `/users/create`, {nom: this.state.nameNewUser, prenom: this.state.prenomNewUser, email: this.state.emailNewUser})
      .then(res =>
        {res.data.error ? 
          this.setState({error: true, errorContent: res.data.error, showModalError: true}) : 
          this.setState({confirmationMessage: res.data.message, showModalConfirmation: true})
        }
      )
      .catch(err => console.error(err));
}

updateUser = async () => {
  await axios
  .patch(process.env.REACT_APP_BACKEND_URL + `/users/${this.state.idUserToUpdate}`, {nom: this.state.nameUserToUpdate, prenom: this.state.prenomUserToUpdate, email: this.state.emailUserToUpdate})
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

changeNameNewUserHandler = (nom) =>{
  this.setState({nameNewUser: nom, showMessageError: false});
}
changePrenomNewUserHandler = (prenom) =>{
  this.setState({prenomNewUser: prenom, showMessageError: false});
}
changeMailNewUserHandler = (email) =>{
  this.setState({emailNewUser: email, showMessageError: false});
}

changeNameUpdateUserHandler = (nom) =>{
  this.setState({nameUserToUpdate: nom, showMessageError: false});
}
changePrenomUpdateUserHandler = (prenom) =>{
  this.setState({prenomUserToUpdate: prenom, showMessageError: false});
}
changeMailUpdateUserHandler = (email) =>{
  this.setState({emailUserToUpdate: email, showMessageError: false});
}

showModalUpdate = (nom, id, prenom, email) => {
  this.setState({nameUserToUpdate: nom, idUserToUpdate: id, prenomUserToUpdate: prenom, emailUserToUpdate: email, showModalUpdate: true});
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

    if(!this.state.isLoading && !this.state.error && this.state.userList && !this.state.showModal && !this.state.showAddNewUser && !this.state.showModalUpdate){
      return (
        <Aux>
          <div className={classes.Container}>
            <button className={classes.ButtonNew} onClick={this.showModalHandler}>
                Ajouter un nouvel utilisateur 
                <img src={addUserIcone} alt="ajouter User"/>
            </button>
            <div className={classes.Titre}><h1>Liste des utilisateur enregistrés :</h1></div>
            <div className={classes.ListeUser}>
              {this.state.userList.map(user => (
                <UserItem
                  key={user._id}
                  id={user._id}
                  nom={user.nom}
                  prenom={user.prenom}
                  email={user.email}
                  deleteUser={this.deleteUser}
                  showModalUpdate={this.showModalUpdate}
                />
              ))}
            </div>
          </div>
          
        </Aux>
       );
    }

    if(!this.state.isLoading && !this.state.error && this.state.userList && this.state.showModal){
      return (
        <Aux>
            <Modal show={this.state.showModal}>
                <div className={classes.ContainerFormNewUser}>
                  <h1 className={classes.Titre}>Ajout d'un nouvel utilisateur</h1>
                  <div className={classes.FormNewUser}>
                      <label className={classes.Label}>Nom :</label>
                      <input className={classes.Input} value={this.state.nameNewUser} type="text" onChange={(event) => this.changeNameNewUserHandler(event.target.value)}/>
                      <p className={classes.MessageErreur} style={this.state.showMessageError ? {display:"initial"}:{display:"none"}}>
                        Veuillez saisir le nom de l'utilisateur avant de valider
                      </p>
                      <label className={classes.Label}>Prenom :</label>
                      <input className={classes.Input} value={this.state.prenomNewUser} type="text" onChange={(event) => this.changePrenomNewUserHandler(event.target.value)}/>
                      <p className={classes.MessageErreur} style={this.state.showMessageError ? {display:"initial"}:{display:"none"}}>
                        Veuillez saisir le prenom de l'utilisateur avant de valider
                      </p>
                      <label className={classes.Label}>Email :</label>
                      <input className={classes.Input} value={this.state.emailNewUser} type="text" onChange={(event) => this.changeMailNewUserHandler(event.target.value)}/>
                      <p className={classes.MessageErreur} style={this.state.showMessageError ? {display:"initial"}:{display:"none"}}>
                        Veuillez saisir l'adresse mail de l'utilisateur avant de valider
                      </p>
                      <div className={classes.Button}>
                        <button className={classes.ButtonCancel} onClick={this.unShowModalHandler}>Annuler</button>
                        <button className={classes.ButtonAdd} type="submit"
                          onClick={this.state.nameNewUser !== "" ? this.addNewUser : this.showMessageErrorHandler}>
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
                <div className={classes.ContainerFormNewUser}>
                  <h1 className={classes.Titre}>Modification d'un utilisateur</h1>
                  <div className={classes.FormNewUser}>
                  <label className={classes.Label}>Nom :</label>
                      <input className={classes.Input} value={this.state.nameUserToUpdate} type="text" onChange={(event) => this.changeNameUpdateUserHandler(event.target.value)}/>
                      <p className={classes.MessageErreur} style={this.state.showMessageError ? {display:"initial"}:{display:"none"}}>
                        Veuillez saisir le nom de l'utilisateur avant de valider
                      </p>
                      <label className={classes.Label}>Prenom :</label>
                      <input className={classes.Input} value={this.state.prenomUserToUpdate} type="text" onChange={(event) => this.changePrenomUpdateUserHandler(event.target.value)}/>
                      <p className={classes.MessageErreur} style={this.state.showMessageError ? {display:"initial"}:{display:"none"}}>
                        Veuillez saisir le prenom de l'utilisateur avant de valider
                      </p>
                      <label className={classes.Label}>Email :</label>
                      <input className={classes.Input} value={this.state.emailUserToUpdate} type="text" onChange={(event) => this.changeMailUpdateUserHandler(event.target.value)}/>
                      <p className={classes.MessageErreur} style={this.state.showMessageError ? {display:"initial"}:{display:"none"}}>
                        Veuillez saisir l'adresse mail de l'utilisateur avant de valider
                      </p>
                      <div className={classes.Button}>
                        <button className={classes.ButtonCancel} onClick={this.unShowModalUpdate}>Annuler</button>
                        <button className={classes.ButtonAdd} type="submit"
                          onClick={this.state.nameUserToUpdate !== "" ? this.updateUser : this.showMessageErrorHandler}>
                            Modifier
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

export default User;