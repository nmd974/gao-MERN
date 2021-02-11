import React from 'react';

import classes from './Toolbar.css';
// import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

import logout from "../../../images/logout.png";

const toolbar = ( props ) => {
    console.log(props);

    return(
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <div className={classes.Content}>
            <p className={classes.Titre}>Centre culturel - Gestion des reservations de postes informatiques</p>
            <img src={logout} alt="logout" onClick={() => props.logout()}/>
        </div>

    </header>
    );
};

export default toolbar;