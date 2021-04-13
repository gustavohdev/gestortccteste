import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';
import Car from './Car'
import { useHistory } from "react-router-dom";
import ChangeDialogCompany from './ChangeDialogCompany'
import Export from './Export'

const Company = ( props ) => {

    const [changeDialogIsOpen, setChangeDialogIsOpen] = React.useState(false)
    const openChangeDialog = () => setChangeDialogIsOpen(true)
    const closeChangeDialog = () => setChangeDialogIsOpen(false)

    const [data, setData] = useState([])
    const [name, setName] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [id, setId] = useState('')
    const history = useHistory();

    const columns = [
      { field: 'id', headerName: 'ID', width: 20 },
      { field: 'company', headerName: 'Nome', width: 300 }
    ];

    const handleOnSelectionChange =  (e) => {

      console.log(e.row.company);
      setId(e.row._id)
      setCompanyName(e.row.company)
      openChangeDialog();
      
    }

    const handleSubmit = (e) => {
        e.preventDefault()

          axios.post(`/api/companies`, {
            'company': name,
            'usernameid': props.usernameId,
          }).then( resp =>{
            console.log(resp);
            window.location.reload(false);
            //history.push("/menu");
            
        }).catch( err => {
            console.log(err);
        })
    }

    function validateForm() {
        return name.length > 0
      }

      useEffect(() => {

        axios.get(`/api/companies`, {
          params: {
            usernameid: props.usernameId
          }
        }).then(resp => {

          for(let x=0; x < resp.data.length; x++){
            resp.data[x]['id'] = x + 1;
          }
  
          setData(resp.data);

          localStorage.setItem('companyId', resp.data[0]._id)
          //console.log(resp.data[0]._id);

          if(resp.data[0]._id != 'undefined' || resp.data[0]._id != undefined ){
            //localStorage.setItem('companyId', resp.data[0]._id)

            axios.patch(`/api/users`, {
              companyid:resp.data[0]._id,
              _id:props.usernameId,

            }).then(resp => {
              console.log(resp)
                
            }).catch( err => {
                console.log(err)
            })
        }
        
        }).catch( err => {
            console.log(err);
        })

      }, []);

    const useStyles = makeStyles((theme) => ({
        paper: {
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width:'100%'
        },
        avatar: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main,
        },
        form: {
          width: '100%', // Fix IE 11 issue.
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
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Nome da Empresa"
                name="name"
                autoComplete="name"
                helperText="Você pode e deve cadastrar uma empresa para ter todas as funcionalidades do sistema. ( Não é permitido duas empresas por cliente )"
                autoFocus
                onChange={e => setName(e.target.value)}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={!validateForm()}
            >
            Criar
            </Button>
        </form>
        <br></br>
        <hr />
            <div style={{ height: 350, width: '100%', float:'left' }}>
                <DataGrid rows={data} columns={columns} onCellClick={handleOnSelectionChange} components={{ Toolbar: Export }} />
            </div>
            <ChangeDialogCompany open={changeDialogIsOpen} onClose={closeChangeDialog} _id={id} companyId={props.companyId} name={companyName}/>
        </div>
        )
    }

export default Company