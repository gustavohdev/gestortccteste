import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import TextField from "@material-ui/core/TextField";

export default function ChangeDialogConfig(props) {
    const { open, onClose } = props;
    const [value, setValue] = useState(null);

    let selected = props.selected;
    let label = "";
    let prevValue = "";

    if (selected == 0) {
        prevValue = props.value;
        label = "Marca";
    } else if (selected == 1) {
        prevValue = props.value;
        label = "Motor";
    }

    function validateForm() {
        return value != null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (selected == 0) {
            axios
                .patch(`/api/brands`, {
                    companyid: props.companyId,
                    name: value,
                    _id: props._id,
                })
                .then((resp) => {
                    console.log(resp);
                    onClose();
                    window.location.reload(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else if (selected == 1) {
            axios
                .patch(`/api/motors`, {
                    companyid: props.companyId,
                    name: value,
                    _id: props._id,
                })
                .then((resp) => {
                    console.log(resp);
                    onClose();
                    window.location.reload(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <React.Fragment>
            <Dialog open={open} onClose={onClose} aria-labelledby="max-width-dialog-title">
                <DialogTitle id="max-width-dialog-title">Atualizar {label}</DialogTitle>
                <DialogContent>
                    <DialogContentText></DialogContentText>
                    <form noValidate onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            value={value == null ? prevValue : value}
                            id="brand"
                            label={label}
                            name="brand"
                            autoComplete="brand"
                            autoFocus
                            onChange={(e) => setValue(e.target.value)}
                        ></TextField>
                        <Button type="submit" fullWidth variant="contained" color="primary" disabled={!validateForm()}>
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
