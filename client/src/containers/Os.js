import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { MenuItem } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import ChangeDialogStatus from "./ChangeDialogStatus";
import Export from "./Export";

const Os = (props) => {
    const [changeDialogIsOpen, setChangeDialogIsOpen] = React.useState(false);
    const openChangeDialog = () => setChangeDialogIsOpen(true);
    const closeChangeDialog = () => setChangeDialogIsOpen(false);

    const [userId, setUserId] = useState("");
    const [client, setClient] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [plate, setPlate] = useState("");
    const [motor, setMotor] = useState();
    const [obs, setObs] = useState("");
    const [status, setStatus] = useState("");
    const [id, setId] = useState();

    const [arrOs, setArrOs] = useState([]);
    const [arrClient, setArrClient] = useState([]);
    const [arrPlate, setArrPlate] = useState([]);
    const [arrStatus, setArrStatus] = useState([]);

    const [statusName, setStatusName] = useState("");

    const columns = [
        { field: "id", headerName: "ID", width: 130 },
        { field: "brand", headerName: "Marca", width: 130 },
        { field: "model", headerName: "Modelo", width: 130 },
        { field: "plate", headerName: "Placa", width: 130 },
        { field: "motor", headerName: "Motor", width: 130 },
        { field: "status", headerName: "Status", width: 130 },
        { field: "obs", headerName: "Obs", width: 300 },
    ];

    const handleOnSelectionChange = (e) => {
        setId(e.row._id);
        setStatusName(e.row.status);

        openChangeDialog();
    };

    const handleOnClientMenuChange = (e) => {
        setClient(e.target.value);
    };

    const handleOnPlateMenuChange = (e) => {
        setPlate(e.target.value);

        let plateArray = arrPlate.filter(function (item) {
            return item.plate == e.target.value && item.companyid == props.companyId;
        });

        setMotor(plateArray[0].motor);
        setBrand(plateArray[0].brand);
        setModel(plateArray[0].model);
        setStatus("Orçamento");

        let clientArray = arrClient.filter(function (item) {
            return item._id == plateArray[0].userid && item.companyid == props.companyId;
        });

        setClient(clientArray[0].name);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(`/api/os`, {
                companyid: props.companyId,
                brand: brand,
                model: model,
                plate: plate,
                motor: motor,
                obs: obs,
                status: status,
            })
            .then((resp) => {
                window.location.reload(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    function validateForm() {
        return plate.length > 0;
    }

    useEffect(() => {
        axios
            .get(`/api/status`)
            .then((resp) => {
                setArrStatus(resp.data);
            })
            .catch((err) => {
                console.log(err);
            });

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

                setArrClient(resp.data);
            })
            .catch((err) => {
                console.log(err);
            });

        axios
            .get(`/api/cars`, {
                params: {
                    companyid: props.companyId,
                },
            })
            .then((resp) => {
                for (let x = 0; x < resp.data.length; x++) {
                    resp.data[x]["id"] = x + 1;
                }

                setArrPlate(resp.data);
            })
            .catch((err) => {
                console.log(err);
            });

        axios
            .get(`/api/os`, {
                params: {
                    companyid: props.companyId,
                },
            })
            .then((resp) => {
                for (let x = 0; x < resp.data.length; x++) {
                    resp.data[x]["id"] = x + 1;
                }

                setArrOs(resp.data);
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
        textfield: {
            margin: "5px",
        },
    }));

    const classes = useStyles();

    return (
        <div>
            <form onSubmit={handleSubmit} noValidate>
                <TextField
                    className={classes.textfield}
                    id="Plate"
                    select
                    label="Placa"
                    value={plate}
                    onChange={handleOnPlateMenuChange}
                    helperText="Selecione a placa do seu cliente"
                    variant="outlined"
                >
                    {arrPlate.map((option) => (
                        <MenuItem key={option.plate} value={option.plate}>
                            {option.plate}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField className={classes.textfield} id="Client" select value={client} onChange={handleOnClientMenuChange} helperText="Cliente" variant="outlined" disabled={true}>
                    {arrClient.map((option) => (
                        <MenuItem key={option.name} value={option.name}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    className={classes.textfield}
                    id="Obs"
                    required
                    fullWidth
                    label="Obs"
                    value={obs}
                    onChange={(e) => setObs(e.target.value)}
                    helperText="Escreva o problema do veículo"
                    variant="outlined"
                ></TextField>
                <TextField className={classes.textfield} id="Motor" required value={motor} helperText="Motor" variant="outlined" disabled={true}></TextField>
                <TextField className={classes.textfield} id="Brand" required value={brand} helperText="Marca" variant="outlined" disabled={true}></TextField>
                <TextField className={classes.textfield} id="Model" required value={model} helperText="Modelo" variant="outlined" disabled={true}></TextField>
                <TextField
                    className={classes.textfield}
                    id="Status"
                    required
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    helperText="Status Inicial"
                    variant="outlined"
                    disabled={true}
                ></TextField>
                <Button type="submit" fullWidth variant="contained" color="primary" disabled={!validateForm()}>
                    Abrir O.S
                </Button>
            </form>
            <br></br>
            <hr />
            <div style={{ height: 350, width: "100%", float: "left" }}>
                <DataGrid rows={arrOs} columns={columns} onCellClick={handleOnSelectionChange} components={{ Toolbar: Export }} />
            </div>
            <ChangeDialogStatus open={changeDialogIsOpen} onClose={closeChangeDialog} _id={id} companyId={props.companyId} status={statusName} />
        </div>
    );
};

export default Os;
