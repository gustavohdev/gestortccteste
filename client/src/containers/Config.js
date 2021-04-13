import React, { useState } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { Tab, Tabs, AppBar, TableCell, Button, TextField } from '@material-ui/core'
import axios from 'axios'
import Export from './Export'
import ChangeDialogConfig from './ChangeDialogConfig'

const Config = (props) => {

    const [changeDialogIsOpen, setChangeDialogIsOpen] = React.useState(false)
    const openChangeDialog = () => setChangeDialogIsOpen(true)
    const closeChangeDialog = () => setChangeDialogIsOpen(false)

    const [value, setValue] = React.useState(0)
    const [columns, setColumns] = React.useState([])
    const [rows, setRows] = React.useState([])
    const [label, setLabel] = React.useState('')
    const [name, setName] = React.useState('')
    const [endpoint, setEndPoint] = React.useState('')
    const [id, setId] = useState()

    const [prevValue, setPrevValue] = React.useState('')
    //const [motor, setMotor] = React.useState('')
    //const [initialClick, setInitialClick] = React.useState(0)

    const handleSubmit = () => {

        axios.post(`/api/${endpoint}`, {
            'companyid':props.companyId,
            'name': name

          }).then(resp => {
            console.log(resp);

        }).catch( err => {
            console.log(err);

        })

    }

    const handleOnClickChange = () => {
        
    }

    const handleOnSelectionChange = (e) => {

        //if(value == 0){
            setPrevValue(e.row.name)
            setId(e.row._id)
            openChangeDialog();
        //}else if(value == 1){

        //}

    }

    const handleOnChange = (event, value) => {
      console.log(event);

      setValue(value)

      if(value == 0){
      
            setLabel('Marca')
            setEndPoint('brands')

            axios.get(`/api/brands`,{
                params: {
                  companyid: props.companyId
                }
            }).then(resp => {

                for(let x=0; x < resp.data.length; x++){
            
                    resp.data[x]['id'] = x + 1;
                }
            
                setColumns(
                    [{
                            'field': 'id',
                            'headerName': 'id',
                            'width': '100'
                        },
                        {
                            'field': 'name',
                            'headerName': 'brand',
                            'width': '100'
                        }
                    ])

                setRows(resp.data)

            }).catch( err => {

            })

        }else if(value == 1){

            setLabel('Motor')
            setEndPoint('motors')

            axios.get(`/api/motors`,{
                params: {
                  companyid: props.companyId
                }
            }).then(resp => {

                for(let x=0; x < resp.data.length; x++){
                    resp.data[x]['id'] = x + 1;

                }

                setColumns(
                    [{
                            'field': 'id',
                            'headerName': 'id',
                            'width': '100'
                        },
                        {
                            'field': 'name',
                            'headerName': 'motor',
                            'width': '100'
                        }
                    ])

                setRows(resp.data);

            }).catch( err => {

            })

        }/*else if(value == 2){

            setLabel('Status')
            setEndPoint('status')

            axios.get(`/api/status`).then(resp => {

                for(let x=0; x < resp.data.length; x++){
            
                    resp.data[x]['id'] = x + 1;
                }
            
                setColumns(
                    [{
                            'field': 'id',
                            'headerName': 'id',
                            'width': '100'
                        },
                        {
                            'field': 'name',
                            'headerName': 'status',
                            'width': '100'
                        }
                    ])
    
                setRows(resp.data)
    
            }).catch( err => {

            })

        }*/else{
            setLabel('')
            setColumns([])
            setRows([])
        }
    };

    function validateForm() {
        return name.length > 0 
      }


    return (
    <div style={{'marginTop':'5px'}}>
         <form onSubmit={handleSubmit} noValidate>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label={label}
                name="name"
                autoComplete="name"
                autoFocus
                onChange={e => setName(e.target.value)}
            />
            <Button style={{'margin':'3px'}} disabled={label == ''} type='submit' variant="contained" color="primary" disabled={!validateForm()}>Add</Button>
            </form>
        <Tabs onChange={handleOnChange} value={value}>
            <Tab label="Marca"  />
            <Tab label="Motor"  />
            {/* <Tab label="Status" /> */ }
        </Tabs> 
            <div style={{ height: 350, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} components={{ Toolbar: Export }} onCellClick={handleOnSelectionChange} />
            </div>
            <ChangeDialogConfig open={changeDialogIsOpen} onClose={closeChangeDialog} companyId={props.companyId} _id={id} value={prevValue} selected={value}/>
    </div>
    )
}
export default Config