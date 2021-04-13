import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios'
import TextField from '@material-ui/core/TextField';


export default function ChangeDialogStatus(props) {

  const { open, onClose } = props

  const [arrStatus, setArrStatus] = useState([])
  const [status, setStatus] = useState(null)

  let statusName = props.status

  function validateForm() {
    return status != null
  }

  useEffect(() => {

    axios.get(`/api/status`).then(resp => {

        for(let x=0; x < resp.data.length; x++){

            resp.data[x]['id'] = x + 1;
        }

            setArrStatus(resp.data)

        }).catch( err => {

        })

    }, []);

    const handleSubmit = (e) => {
        e.preventDefault()    

        axios.patch(`/api/os`,{ 
            companyid:props.companyId,
            status: status,
            _id:props._id

        }).then(resp => {
           console.log(resp);
           onClose()
           window.location.reload(false);
            
        }).catch( err => {
            console.log(err);
        })

    }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Atualizar Status</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
            <form noValidate onSubmit={handleSubmit}>
                    <TextField
                        id="Status"
                        select
                        fullWidth
                        value={status == null ? statusName : status }
                        onChange={e => setStatus(e.target.value)}
                        helperText="O.S Status"
                        variant="outlined"
                        disabled={false}
                        >
                        {arrStatus.map((option) => (
                            <MenuItem key={option.name} value={option.name}>
                                {option.name}
                            </MenuItem>
                        ))}
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
  );
}