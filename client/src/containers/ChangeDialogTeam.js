import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';


export default function ChangeDialogTeam(props) {

  const { open, onClose } = props

  const [name, setName] = useState(null)
  const [password, setPassword] = useState(null)
  const [email, setEmail] = useState(null)

  let workerName = props.name
  let workerPassword = props.password
  let workerEmail = props.email

  function validateForm() {
    return name != null && password != null && email != null
  }

    const handleSubmit = (e) => {
        e.preventDefault()

        //console.log(props.companyId)
        //console.log(status)
       //console.log(props._id)      

        axios.patch(`/api/users/team`, {
              'companyid': props.companyId,
              '_id': props._id,
              'username': name,
              'password': password,
              'email': email
            }).then(resp => {
              console.log(resp);
              window.location.reload(false);
              
          }).catch( err => {
              console.log(err);
          })

    }

    const useStyles = makeStyles((theme) => ({
      textField:{
        marginRight:'5px'
      },
      textFieldUp:{
          marginRight:'5px',
          marginTop:'-0.5px'
      }
      
    }));
  
    const classes = useStyles();

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Atualizar Dados do Mecânico</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
            <form noValidate onSubmit={handleSubmit}>
            <TextField
                    className={classes.textFieldUp}
                    variant="outlined"
                    margin="normal"
                    required
                    value={name == null ? workerName : name }
                    id="name"
                    //value={name}
                    label='Nome'
                    name="name"
                    autoComplete="name"
                    autoFocus
                    onChange={e => setName(e.target.value)}
                />
                <TextField
                    className={classes.textFieldUp}
                    variant="outlined"
                    margin="normal"
                    required
                    id="password"
                    value={password == null ? workerPassword : password }
                    label='Senha'
                    name="password"
                    type="password"
                    autoComplete="password"
                    autoFocus
                    onChange={e => setPassword(e.target.value)}
                />
                 <TextField
                    className={classes.textFieldUp}
                    variant="outlined"
                    margin="normal"
                    required
                    value={email == null ? workerEmail : email }
                    id="email"
                    label='Email'
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={e => setEmail(e.target.value)}
                />
                <Button style={{'margin':'3px'}} type='submit' fullWidth variant="contained" color="primary" 
                disabled={!validateForm()}
                >Alterar</Button>
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