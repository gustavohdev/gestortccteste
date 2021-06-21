import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

export default function ChangeDialogClient(props) {
    const { open, onClose } = props;

    const [name, setName] = useState(null);
    const [surname, setSurname] = useState(null);
    const [email, setEmail] = useState(null);
    const [cellphone, setCellphone] = useState(null);

    let clientName = props.name;
    let clientSurname = props.surname;
    let clientEmail = props.email;
    let clientCellphone = props.cellphone;

    function validateForm() {
        return name != null || surname != null || email != null || cellphone != null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .patch(`/api/clients`, {
                companyid: props.companyId,
                _id: props._id,
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
                <DialogTitle id="max-width-dialog-title">Atualizar Dados do Cliente</DialogTitle>
                <DialogContent>
                    <DialogContentText></DialogContentText>
                    <form noValidate onSubmit={handleSubmit}>
                        <TextField
                            className={classes.textFieldUp}
                            variant="outlined"
                            margin="normal"
                            required
                            value={name == null ? clientName : name}
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            className={classes.textFieldUp}
                            variant="outlined"
                            margin="normal"
                            required
                            id="surname"
                            value={surname == null ? clientSurname : surname}
                            label="Surname"
                            name="surname"
                            autoComplete="surname"
                            autoFocus
                            onChange={(e) => setSurname(e.target.value)}
                        />
                        <TextField
                            className={classes.textFieldUp}
                            variant="outlined"
                            margin="normal"
                            required
                            value={cellphone == null ? clientCellphone : cellphone}
                            id="cellphone"
                            label="Cellphone"
                            name="cellphone"
                            autoComplete="cellphone"
                            autoFocus
                            onChange={(e) => setCellphone(e.target.value)}
                        />
                        <TextField
                            className={classes.textFieldUp}
                            variant="outlined"
                            margin="normal"
                            required
                            value={email == null ? clientEmail : email}
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(e) => setEmail(e.target.value)}
                        />
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
