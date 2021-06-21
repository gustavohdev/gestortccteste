import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function AppTopBarNotLogged() {
    const classes = useStyles();

    return (
        <div className="App container">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"></IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Gestor Mecânico
                    </Typography>
                    <Button style={{ marginRight: "5px" }} color="secondary" variant="contained" href="/menu">
                        Menu
                    </Button>
                    <Button color="default" variant="contained" href="/login">
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
