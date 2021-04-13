import React, { useState, useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid';
import { Button, TextField, MenuItem } from '@material-ui/core'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import AlertDialog from './AlertDialog'
import ChangeDialogCar from './ChangeDialogCar'
import Export from './Export'

const Car = props => {

    const [dialogIsOpen, setDialogIsOpen] = React.useState(false)
    const openDialog = () => setDialogIsOpen(true)
    const closeDialog = () => setDialogIsOpen(false)

    const [changeDialogIsOpen, setChangeDialogIsOpen] = React.useState(false)
    const openChangeDialog = () => setChangeDialogIsOpen(true)
    const closeChangeDialog = () => setChangeDialogIsOpen(false)
    const [id, setId] = useState('')

    //let brandName = ''
    //let motorName = ''
    //let plateName = ''
    //let modelName = ''

    const [brandName,setBrandName] = useState('')
    const [motorName,setMotorName] = useState('')
    const [plateName,setPlateName] = useState('')
    const [modelName,setModelName] = useState('')

    // mudar tudo english para portugues nos nomes ou fazer várivel para fechar isto

    const [brand,setBrand] = useState(null)
    const [motor,setMotor] = useState(null)
    const [plate,setPlate] = useState(null)
    const [model,setModel] = useState(null)

    const [arrBrand,setArrBrand] = useState([])
    const [arrMotor,setArrMotor] = useState([])

    useEffect(() => {

        axios.get(`/api/motors`, {
            params: {
              companyid: props.companyId
            }
        }).then(resp => {
    
            setArrMotor(resp.data)
        
            }).catch( err => {
                console.log(err);
        })

    }, []);
    
    useEffect(() => {

        axios.get(`/api/brands`,  {
            params: {
              companyid: props.companyId
            }
        }).then(resp => {
    
        setArrBrand(resp.data)
    
        }).catch( err => {
            console.log(err);
        })

    }, []);


    const handleOnSelectionChange = (e) => {

        setId(e.row._id)
        setBrandName(e.row.brand)
        setMotorName(e.row.motor)
        setPlateName(e.row.plate)
        setModelName(e.row.model)

        openChangeDialog()
      
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post(`/api/cars`, {
            'companyid': props.companyId,
            'userid': props.userId,
            'brand': brand,
            'model': model,
            'plate': plate,
            'motor': motor
          }).then(resp => {
             console.log(resp);
             window.location.reload(false);
            
        }).catch( err => {
            console.log(err);
            openDialog()
        })

    }


    function validateForm() {
        return props.userId != '' && plate != null && brand != null && motor != null && motor != null
      }

    const columns = [
        { field: 'id', headerName: 'ID', width: 20 },
        { field: 'brand', headerName: 'Marca', width: 130 },
        { field: 'model', headerName: 'Modelo', width: 130 },
        { field: 'motor', headerName: 'Motor', width: 130 },
        { field: 'plate', headerName: 'Placa', width: 130 },
    ];

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
        <div>
           <br></br>
           <form onSubmit={handleSubmit} noValidate>
                <TextField
                    className={classes.textFieldUp}
                    variant="outlined"
                    margin="normal"
                    required
                    //fullWidth
                    id="name"
                    label='Placa'
                    name="name"
                    autoComplete="name"
                    //autoFocus
                    onChange={e => setPlate(e.target.value)}
                />
                <TextField
                    className={classes.textFieldUp}
                    variant="outlined"
                    margin="normal"
                    required
                    //fullWidth
                    id="name"
                    label='Modelo'
                    name="name"
                    //autoComplete="name"
                    //autoFocus
                    onChange={e => setModel(e.target.value)}
                />
                <TextField
                    className={classes.textField}
                    id="Brand"
                    select
                    label="Marca *"
                    value={brand}
                    onChange={e => setBrand(e.target.value)}
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
                    value={motor}
                    onChange={e => setMotor(e.target.value)}
                    helperText="Seleciona o motor do seu veículor"
                    variant="outlined"
                    >
                    {arrMotor.map((option) => (
                        <MenuItem key={option.name} value={option.name}>
                        {option.name}
                        </MenuItem>
                    ))}
                </TextField>
                <Button style={{'margin':'3px'}} type='submit' variant="contained" color="primary" disabled={!validateForm()} >Add</Button>
            </form>
            <div style={{ height: 250, width: '100%', float:'left' }}>
                <DataGrid rows={props.clientRows} columns={columns} onCellClick={handleOnSelectionChange} components={{ Toolbar: Export }} />
            </div>
            <AlertDialog open={dialogIsOpen} onClose={closeDialog} />
            <ChangeDialogCar open={changeDialogIsOpen} onClose={closeChangeDialog} _id={id} companyId={props.companyId} plate={plateName} model={modelName} motor={motorName} brand={brandName} />
        </div>
    )
}

export default Car