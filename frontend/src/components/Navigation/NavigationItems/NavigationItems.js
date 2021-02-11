import React from 'react';

import classes from './NavigationItems.css';
import booking from "../../../images/booking.png";
import gestion_materiel from "../../../images/gestion_materiel.png";
import gestion_users from "../../../images/gestion_users.png";
import { NavLink } from 'react-router-dom';

const navigationItems = () => {

    return (
        <div className={classes.Container}>
            <NavLink to="/" exact className={classes.NavLink}>
                <div className={classes.ItemNav}>
                    <img src={booking} alt="reservation"/>
                    <p style={{marginLeft : "20px"}}>Gérer les réservations</p>
                </div>
            </NavLink>
            <NavLink to="/materiel" exact className={classes.NavLink}>
                <div className={classes.ItemNav}>
                    <img src={gestion_materiel} alt="reservation"/>
                    <p style={{marginLeft : "20px"}}>Gérer les postes informatiques</p>
                </div>
            </NavLink>
            <NavLink to="/utilisateurs" exact className={classes.NavLink}>
                <div className={classes.ItemNav}>
                    <img src={gestion_users} alt="reservation"/>
                    <p style={{marginLeft : "20px"}}>Gérer les comptes utilisateurs</p>
                </div>
            </NavLink>
        </div>
    );

};

export default navigationItems;