import React, { useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertCadastroDialog(props) {

  const { open, onClose } = props
  
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Cadastro Efetuado"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Você está pronto para começar a utilizar o sistema, clique no botão abaixo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary" autoFocus href={'/login'}>
            Área de Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}