import axios from "axios";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AppTopBarNotLogged from "./AppTopBarNotLogged";
import AlertCadastroDialog from "./AlertCadastroDialog";
import { useHistory } from "react-router-dom";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="/">
                Gestor Mecânico
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

export default function Signup() {
    const [dialogIsOpen, setDialogIsOpen] = React.useState(false);
    const openDialog = () => setDialogIsOpen(true);
    const closeDialog = () => setDialogIsOpen(false);

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const history = useHistory();

    function validateForm() {
        return user.length > 0 && password.length > 0 && email.length > 0;
    }

    function handleSubmit(e) {
        e.preventDefault();

        axios
            .post(`/api/users`, {
                username: user,
                password: password,
                email: email,
            })
            .then((resp) => {
                openDialog();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const useStyles = makeStyles((theme) => ({
        paper: {
            marginTop: theme.spacing(8),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: "100%", // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }));

    const classes = useStyles();

    return (
        <div>
            <AppTopBarNotLogged />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Cadastro
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            value={user}
                            id="user"
                            label="Usuário"
                            name="user"
                            autoComplete="user"
                            autoFocus
                            onChange={(e) => setUser(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            value={password}
                            name="password"
                            label="Senha"
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField variant="outlined" margin="normal" required fullWidth value={email} name="email" label="Email" type="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} disabled={!validateForm()}>
                            Cadastrar
                        </Button>
                    </form>
                </div>
                <Box mt={6}>
                    <Copyright />
                </Box>
            </Container>
            <AlertCadastroDialog open={dialogIsOpen} onClose={closeDialog} />
        </div>
    );
}
