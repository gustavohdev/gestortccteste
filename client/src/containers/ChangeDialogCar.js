import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

export default function ChangeDialogCar(props) {
    const { open, onClose } = props;

    const [brand, setBrand] = useState(null);
    const [motor, setMotor] = useState(null);
    const [plate, setPlate] = useState(null);
    const [model, setModel] = useState(null);
    const [arrBrand, setArrBrand] = useState([]);
    const [arrMotor, setArrMotor] = useState([]);

    useEffect(() => {
        axios
            .get(`/api/motors`, {
                params: {
                    companyid: props.companyId,
                },
            })
            .then((resp) => {
                setArrMotor(resp.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        axios
            .get(`/api/brands`, {
                params: {
                    companyid: props.companyId,
                },
            })
            .then((resp) => {
                setArrBrand(resp.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    let brandName = props.brand;
    let motorName = props.motor;
    let plateName = props.plate;
    let modelName = props.model;

    function validateForm() {
        return brand != null || motor != null || plate != null || model != null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .patch(`/api/cars`, {
                companyid: props.companyId,
                _id: props._id,
                brand: brand,
                model: model,
                plate: plate,
                motor: motor,
            })
            .then((resp) => {
                window.location.reload(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const useStyles = makeStyles((theme) => ({
        textField: {
            marginRight: "5px",
        },
        textFieldUp: {
            marginRight: "5px",
            marginTop: "-0.5px",
        },
    }));

    const classes = useStyles();

    return (
        <React.Fragment>
            <Dialog open={open} onClose={onClose} aria-labelledby="max-width-dialog-title">
                <DialogTitle id="max-width-dialog-title">Atualizar Dados do Carro</DialogTitle>
                <DialogContent>
                    <DialogContentText></DialogContentText>
                    <form noValidate onSubmit={handleSubmit}>
                        <TextField
                            className={classes.textFieldUp}
                            variant="outlined"
                            margin="normal"
                            required
                            value={plate == null ? plateName : plate}
                            id="name"
                            label="Placa"
                            name="name"
                            autoComplete="name"
                            onChange={(e) => setPlate(e.target.value)}
                        />
                        <TextField
                            className={classes.textFieldUp}
                            variant="outlined"
                            margin="normal"
                            required
                            value={model == null ? modelName : model}
                            id="name"
                            label="Modelo"
                            name="name"
                            autoComplete="name"
                            onChange={(e) => setModel(e.target.value)}
                        />
                        <TextField
                            className={classes.textField}
                            id="Brand"
                            select
                            label="Marca *"
                            value={brand == null ? brandName : brand}
                            onChange={(e) => setBrand(e.target.value)}
                            helperText="Selecione a marca do seu veículo"
                            variant="outlined"
                        >
                            {arrBrand.map((option) => (
                                <MenuItem key={option.name} value={option.name}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            className={classes.textField}
                            id="Motor"
                            select
                            label="Motor *"
                            value={motor == null ? motorName : motor}
                            onChange={(e) => setMotor(e.target.value)}
                            helperText="Selecione o motor do seu veículor"
                            variant="outlined"
                        >
                            {arrMotor.map((option) => (
                                <MenuItem key={option.name} value={option.name}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Button style={{ margin: "3px" }} type="submit" fullWidth variant="contained" color="primary" disabled={!validateForm()}>
                            Alterar
                        </Button>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Fechar
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
