import React, { Component } from 'react';
import Aux from "../../hoc/Auxiliary/Auxiliary";
import classes from "./Auth.css";
import AuthContext from '../../context/auth-context';

class Auth extends Component {
    
    state={
        user: "Veuillez saisir votre identifiant",
        password: "",
        error: false,
        loading: false
    }

    render() {
        return (
           


            <Aux>
                <div className={classes.Container}>
                    <form className={classes.Form}>
                        <label>Identifiant:</label>
                        <input
                            className={classes.InputForm}
                            type="text"
                            value={this.state.user}
                            onChange={(event) => this.setState({user: event.target.value})}
                            onClick={(event) => this.setState({user: ""})}
                        />
                        <label style={{marginTop:"17px"}}>Mot de passe:</label>
                        <input
                            className={classes.InputForm}
                            type="password"
                            value={this.state.password}
                            onChange={(event) => this.setState({password: event.target.value})}
                        />
                         {/* <AuthContext.Consumer>
                            {context => 
                                <button 
                                    className={classes.Connexion} 
                                    onClick={context.login(this.state.user, this.state.password)}>
                                        Connexion
                                </button>
                            }

                         </AuthContext.Consumer> */}
                         <button 
                                    className={classes.Connexion} 
                                    onClick={() => this.props.login(this.state.user, this.state.password)}>
                                        Connexion
                                </button>
                    </form>
                </div>
            </Aux>
        );
    }
}

export default Auth;