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
import axios from "axios";
import { useHistory } from "react-router-dom";
import AlertLoginDialog from "./AlertLoginDialog";
import AppTopBarNotLogged from "./AppTopBarNotLogged";
import GoogleLogin from "react-google-login";

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

export default function Login(props) {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const [content, setContent] = useState("");

    const [dialogIsOpen, setDialogIsOpen] = React.useState(false);
    const openDialog = () => setDialogIsOpen(true);
    const closeDialog = () => setDialogIsOpen(false);

    function validateForm() {
        return user.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();

        axios
            .get("api/users", {
                params: {
                    password: password,
                    username: user,
                },
            })
            .then(function (response) {
                localStorage.setItem("token", "1");
                localStorage.setItem("companyId", response.data[0].companyid);
                localStorage.setItem("usernameId", response.data[0]._id);
                localStorage.setItem("control", response.data[0].control);

                if (localStorage.getItem("companyId") == "undefined") {
                    history.push("/company");
                } else if (localStorage.getItem("companyId") != "undefined") {
                    history.push("/menu");
                } else {
                    history.push("/login");
                }

                for (let x = 0; x < response.data.length; x++) {
                    response.data[x]["id"] = x + 1;
                }
            })
            .catch(function (error) {
                setContent("Dados incorretos");
                openDialog();
                console.log(error);
            })
            .then(function () {});
    }

    const handleLogin = async (googleData) => {
        axios
            .post(`/api/auth/google`, {
                token: googleData.tokenId,
            })
            .then(async (resp) => {
                const data = await resp.data;

                localStorage.setItem("token", "1");
                localStorage.setItem("companyId", data.companyid);
                localStorage.setItem("usernameId", data._id);
                localStorage.setItem("control", data.control);

                if (localStorage.getItem("companyId") == "undefined") {
                    history.push("/company");
                } else if (localStorage.getItem("companyId") != "undefined") {
                    history.push("/menu");
                } else {
                    history.push("/login");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

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
                        Login
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
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
                            name="password"
                            label="Senha"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} disabled={!validateForm()}>
                            Entrar
                        </Button>
                        <GoogleLogin
                            clientId={"1050898059897-mid4964gbhqiptdmsor1qk1ussdb0id5.apps.googleusercontent.com"}
                            buttonText="Login com Google"
                            onSuccess={handleLogin}
                            onFailure={handleLogin}
                            cookiePolicy={"single_host_origin"}
                        />

                        <Grid container>
                            <Grid item xs>
                                <Link href="/recover" variant="body2">
                                    Esqueceu a senha ?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Não tem uma conta? Cadastre-se"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={6}>
                    <Copyright />
                </Box>
                <AlertLoginDialog open={dialogIsOpen} onClose={closeDialog} />
            </Container>
        </div>
    );
}
