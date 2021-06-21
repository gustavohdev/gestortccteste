import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Button, TextField, MenuItem } from "@material-ui/core";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Export from "./Export";

const GridCar = (props) => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        axios
            .get("api/cars", {
                params: {
                    companyid: props.companyId,
                },
            })
            .then(function (response) {
                for (let x = 0; x < response.data.length; x++) {
                    response.data[x]["id"] = x + 1;
                }
                setRows(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {});
    }, []);

    const columns = [
        { field: "id", headerName: "ID", width: 20 },
        { field: "brand", headerName: "Marca", width: 130 },
        { field: "model", headerName: "Modelo", width: 130 },
        { field: "motor", headerName: "Motor", width: 130 },
        { field: "plate", headerName: "Placa", width: 130 },
    ];

    const data = [];

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
        <div>
            <br></br>
            <div style={{ height: 500, width: "100%", float: "left" }}>
                <DataGrid rows={rows} columns={columns} components={{ Toolbar: Export }} />
            </div>
        </div>
    );
};

export default GridCar;
