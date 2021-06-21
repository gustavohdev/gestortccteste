import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { DataGrid } from "@material-ui/data-grid";
import Export from "./Export";
import ChangeDialogTeam from "./ChangeDialogTeam";

const Team = (props) => {
    const [changeDialogIsOpen, setChangeDialogIsOpen] = React.useState(false);
    const openChangeDialog = () => setChangeDialogIsOpen(true);
    const closeChangeDialog = () => setChangeDialogIsOpen(false);

    const [rows, setRows] = useState([]);
    const [data, setData] = useState([]);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [cellphone, setCellphone] = useState("");
    const [companyId, setCompanyId] = useState("");
    const [id, setId] = useState("");

    const [workerName, setWorkerName] = useState("");
    const [workerPassword, setWorkerPassword] = useState("");
    const [workerEmail, setWorkerEmail] = useState("");

    const columns = [
        { field: "id", headerName: "ID", width: 20 },
        { field: "username", headerName: "Login/Nome", width: 300 },
        { field: "email", headerName: "Email", width: 300 },
    ];

    const handleOnSelectionChange = (e) => {
        setId(e.row._id);
        setWorkerName(e.row.username);
        setWorkerPassword(e.row.password);
        setWorkerEmail(e.row.email);

        openChangeDialog();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(`/api/users`, {
                companyid: props.companyId,
                username: name,
                email: email,
                usertype: 1,
                control: 1,
                password: password,
            })
            .then((resp) => {
                console.log(resp);
                window.location.reload(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    function validateForm() {
        return name.length > 0 && password.length > 0;
    }

    useEffect(() => {
        axios
            .get(`/api/users`, {
                params: {
                    companyid: props.companyId,
                },
            })
            .then((resp) => {
                for (let x = 0; x < resp.data.length; x++) {
                    resp.data[x]["id"] = x + 1;
                }

                setData(resp.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const useStyles = makeStyles((theme) => ({
        paper: {
            marginTop: theme.spacing(8),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
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
            <form onSubmit={handleSubmit} noValidate>
                <TextField variant="outlined" margin="normal" required fullWidth id="name" label="Login/Nome" name="name" autoComplete="name" autoFocus onChange={(e) => setName(e.target.value)} />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Senha"
                    name="password"
                    autoComplete="password"
                    type="password"
                    autoFocus
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email" name="email" autoComplete="email" autoFocus onChange={(e) => setEmail(e.target.value)} />
                <Button type="submit" fullWidth variant="contained" color="primary" disabled={!validateForm()}>
                    Criar
                </Button>
            </form>
            <br></br>
            <hr />
            <div style={{ height: 350, width: "100%", float: "left" }}>
                <DataGrid rows={data} columns={columns} onCellClick={handleOnSelectionChange} components={{ Toolbar: Export }} />
            </div>
            <ChangeDialogTeam open={changeDialogIsOpen} onClose={closeChangeDialog} _id={id} companyId={props.companyId} name={workerName} password={workerPassword} email={workerEmail} />
        </div>
    );
};

export default Team;
