import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios'
import TextField from '@material-ui/core/TextField';

export default function ChangeDialogCompany(props){

  const { open, onClose } = props
  const [companyName, setCompanyName] = useState(null)

  let company = props.name

   function validateForm() {
     return companyName != null
    }

    const handleSubmit = (e) => {
        e.preventDefault()  

       axios.patch(`/api/companies`, {
            companyid:props.companyId,
            name: companyName,
            _id:props._id

        }).then(resp => {
           console.log(resp)
           onClose()
           window.location.reload(false)
            
        }).catch( err => {
            console.log(err)
        })
    }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Atualizar Nome</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
            <form noValidate onSubmit={handleSubmit}>
              <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    value={companyName == null ? company : companyName }
                    id="name"
                    label="Nome da Empresa"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    onChange={e => setCompanyName(e.target.value)}
                  >
              </TextField>
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={!validateForm()}
                >
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
  )
}