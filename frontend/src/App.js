import React, { Component } from "react"; 
import {Switch, Redirect, Route} from "react-router-dom";
import axios from "axios";

import Layout from "./hoc/Layout/Layout";
import Auth from "./Pages/Auth/Auth";
import Reservations from "./Pages/Reservations/Reservations";
import Materiel from "./Pages/Gestion des postes/Materiel";
import Utilisateurs from "./Pages/Gestion des utilisateurs/User";
// import Modal from "./components/UI/Modal/Modal";
import AuthContext from "./context/auth-context";

import classes from "./App.css";
import authContext from "./context/auth-context";

let responseData;
class App extends Component {


  state={
    isLoggedIn: true,
    isLoading: false,
    error: false,
    errorMessage: "",
    confirmationMessage: "",
    showModalError: false,
    showModalConfirmation: false
  }

  // async componentDidUpdate () {
  //   responseData = await 
  // }
  componentWillUpdate () {
    alert("Update");
  }
  

  
  loginHandler = async (identifiant, password) => {
    try{
      await axios
      .post(`http://localhost:3100/api/users/login`, {identifiant: identifiant, password: password})
      .then(res =>
        {res.data.error ? 
          this.setState({error: true, errorMessage: res.data.error, showModalError: true}) : 
          this.setState({confirmationMessage: res.data.message, isLoggedIn: true, showModalConfirmation: true})
        }
        // responseData = res.data.isLoggedIn
      )
      .catch(err => console.error(err));
    }catch(err){
  
    }

  }

  logout = async () => {
    await axios
    .delete(`http://localhost:3100/api/sessions`)
    .then(res =>
      {res.data.error ? 
        this.setState({error: true, errorMessage: res.data.error, showModalError: true}) : 
        this.setState({confirmationMessage: res.data.message, isLoggedIn: false})
      }
    )
    .catch(err => console.error(err));
  }

  // unShowModalErrorHandler = () => {
  //   this.setState({showModalError: false, errorMessage: null, error: false});
  // }
  
  // unShowModalConfirmation = () => {
  //   this.setState({showModalConfirmation: false, confirmationMessage: null});
  // }


  render() {

    // console.log(authContext._currentValue.isLoggedIn);

    // if(!authContext._currentValue.isLoggedIn){
    //   if(this.state.isLoggedIn){
    //   return( 
    //     <AuthContext.Provider
    //       value={{
    //         isLoggedIn: this.state.isLoggedIn,
    //         login: () => this.loginHandler()
    //       }}
    //     >
    //       <Layout>
    //         <Switch>
    //           <Route path="/auth" exact>
    //             <Auth
    //               login={this.loginHandler}
    //             />
    //           </Route>            
    //           <Redirect to="/auth" exact/>
    //         </Switch>
    //       </Layout>
    //     </AuthContext.Provider>
    //   );
    // };

    // if(authContext._currentValue.isLoggedIn){
      // if(this.state.isLoggedIn){
        // if(responseData){
      return (
        <Layout logout={this.logout}>
          <Switch>
            <Route path="/" exact>
              <Reservations/>
            </Route>            
            <Route path="/materiel" exact>
              <Materiel/>
            </Route>
            <Route path="/utilisateurs" exact>
              <Utilisateurs/>
            </Route>
            <Redirect to="/" exact/>
          </Switch>
        </Layout>
    );
    // }
    
  }
}

export default App;