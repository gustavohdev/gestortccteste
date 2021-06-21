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
import Car from "./Car";
import AlertDialog from "./AlertDialog";
import ChangeDialogClient from "./ChangeDialogClient";
import Export from "./Export";

const Client = (props) => {
    const [rows, setRows] = useState([]);
    const [data, setData] = useState([]);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [cellphone, setCellphone] = useState("");
    const [companyId, setCompanyId] = useState("");
    const [userId, setUserId] = useState("");
    const [content, setContent] = useState("");

    const [dialogIsOpen, setDialogIsOpen] = React.useState(false);
    const openDialog = () => setDialogIsOpen(true);
    const closeDialog = () => setDialogIsOpen(false);

    const [changeDialogIsOpen, setChangeDialogIsOpen] = React.useState(false);
    const openChangeDialog = () => setChangeDialogIsOpen(true);
    const closeChangeDialog = () => setChangeDialogIsOpen(false);

    const [clientName, setClientName] = useState("");
    const [clientSurname, setClientSurname] = useState("");
    const [clientCell, setClientCell] = useState("");
    const [clientEmail, setClientEmail] = useState("");

    const columns = [
        { field: "id", headerName: "ID", width: 20 },
        { field: "name", headerName: "Nome", width: 130 },
        { field: "surname", headerName: "Sobrenome", width: 130 },
        { field: "email", headerName: "Email", width: 300 },
        { field: "cellphone", headerName: "Telefone", width: 130 },
    ];

    const handleOnSelectionChange = (e) => {
        setClientName(e.row.name);
        setClientSurname(e.row.surname);
        setClientCell(e.row.cellphone);
        setClientEmail(e.row.email);

        axios
            .get("api/cars", {
                params: {
                    companyid: e.row.companyid,
                    userid: e.row._id,
                },
            })
            .then(function (response) {
                for (let x = 0; x < response.data.length; x++) {
                    response.data[x]["id"] = x + 1;
                }

                setRows(response.data);
                setCompanyId(e.row.companyid);
                setUserId(e.row._id);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(`/api/clients`, {
                companyid: props.companyId,
                name: name,
                surname: surname,
                email: email,
                cellphone: cellphone,
            })
            .then((resp) => {
                window.location.reload(false);
            })
            .catch((err) => {
                console.log(err);
                openDialog();
            });
    };

    function validateForm() {
        return name.length > 0 && email.length > 0 && surname.length > 0 && email.length > 0 && cellphone.length > 0;
    }

    function validateChange() {
        return userId.length > 0;
    }

    const handleOnClick = () => {
        openChangeDialog();
    };

    useEffect(() => {
        axios
            .get(`/api/clients`, {
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
        textField: {
            marginRight: "5px",
        },
    }));

    const classes = useStyles();

    return (
        <div>
            <form onSubmit={handleSubmit} noValidate>
                <TextField className={classes.textField} variant="outlined" margin="normal" required id="name" label="Nome" name="name" autoComplete="name" onChange={(e) => setName(e.target.value)} />
                <TextField
                    className={classes.textField}
                    variant="outlined"
                    margin="normal"
                    required
                    name="surname"
                    label="Sobrenome"
                    id="surname"
                    autoComplete="surname"
                    onChange={(e) => setSurname(e.target.value)}
                />
                <TextField
                    className={classes.textField}
                    variant="outlined"
                    margin="normal"
                    required
                    name="cellphone"
                    label="Telefone"
                    id="cellphone"
                    autoComplete="cellphone"
                    onChange={(e) => setCellphone(e.target.value)}
                />
                <TextField variant="outlined" margin="normal" required name="email" label="Email" id="email" autoComplete="email" onChange={(e) => setEmail(e.target.value)} />
                <Button type="submit" fullWidth variant="contained" color="primary" disabled={!validateForm()}>
                    Criar
                </Button>
            </form>
            <br></br>
            <Button type="button" fullWidth variant="contained" color="secondary" onClick={handleOnClick} disabled={!validateChange()}>
                Alterar Dados do Cliente
            </Button>
            <hr></hr>
            <div style={{ height: 250, width: "100%", float: "left" }}>
                <DataGrid rows={data} columns={columns} onCellClick={handleOnSelectionChange} components={{ Toolbar: Export }} />
                <Car clientRows={rows} companyId={companyId} userId={userId} companyId={props.companyId} />
            </div>
            <AlertDialog open={dialogIsOpen} onClose={closeDialog} />
            <ChangeDialogClient
                open={changeDialogIsOpen}
                onClose={closeChangeDialog}
                _id={userId}
                companyId={props.companyId}
                name={clientName}
                surname={clientSurname}
                cellphone={clientCell}
                email={clientEmail}
            />
        </div>
    );
};

export default Client;
