import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
    root: {
        maxWidth: "100%",
    },
    media: {
        width: 180,
        padding: 20,
    },
    cardMedia: {
        height: 325,
    },
    cardRoot: {
        height: 325,
    },
}));

export default function Menu(props) {
    const classes = useStyles();

    const { control } = props;

    if (control == 1) {
        return (
            <div className={classes.root}>
                <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                    <Grid item xs>
                        <Link href="/os">
                            <img src="public/../os.png" className={classes.media} />
                            <p>Abrir Ordem de Serviço</p>
                        </Link>
                    </Grid>
                    <Grid item xs>
                        <Link href="/grid">
                            <img src="public/../clienticon.jpg" className={classes.media} />
                            <p>Lista de Clientes</p>
                        </Link>
                    </Grid>
                    <Grid item xs>
                        <Link href="/orcamento">
                            <img src="public/../notas.png" className={classes.media} />
                            <p>Lista de Ordens de Serviço</p>
                        </Link>
                    </Grid>
                    <Grid item xs>
                        <Link href="/car">
                            <img src="public/../carros2.png" className={classes.media} />
                            <p>Lista de Carros</p>
                        </Link>
                    </Grid>
                </Grid>
            </div>
        );
    }

    return (
        <div className={classes.root}>
            <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                <Grid item xs>
                    <Link href="/car">
                        <img src="public/../carros2.png" className={classes.media} />
                        <p>Lista de Carros</p>
                    </Link>
                </Grid>
                <Grid item xs>
                    <Link href="/client">
                        <img src="public/../client11.png" className={classes.media} />
                        <p>Clientes</p>
                    </Link>
                </Grid>
                <Grid item xs>
                    <Link href="/os">
                        <img src="public/../os.png" className={classes.media} />
                        <p>Ordem de Serviço</p>
                    </Link>
                </Grid>
                <Grid item xs>
                    <Link href="/graph">
                        <img src="public/../graficos.png" className={classes.media} />
                        <p>Gráficos</p>
                    </Link>
                </Grid>
                <Grid item xs>
                    <Link href="/orcamento">
                        <img src="public/../notas.png" className={classes.media} />
                        <p>Lista de Ordens de Serviço</p>
                    </Link>
                </Grid>
                <Grid item xs>
                    <Link href="/grid">
                        <img src="public/../clienticon.jpg" className={classes.media} />
                        <p>Lista de Clientes</p>
                    </Link>
                </Grid>
                <Grid item xs>
                    <Link href="/config">
                        <img src="public/../config3.png" className={classes.media} />
                        <p>Configurações</p>
                    </Link>
                </Grid>
                <Grid item xs>
                    <Link href="/company">
                        <img src="public/../company.png" className={classes.media} />
                        <p>Empresa</p>
                    </Link>
                </Grid>
                <Grid item xs>
                    <Link href="/team">
                        <img src="public/../mechanic.png" className={classes.media} />
                        <p>Equipe</p>
                    </Link>
                </Grid>
            </Grid>
        </div>
    );
}
