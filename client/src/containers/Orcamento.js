import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { MenuItem } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import ChangeDialogStatus from "./ChangeDialogStatus";
import Export from "./Export";

const Orcamento = (props) => {
    const [arrOs, setArrOs] = useState([]);

    const columns = [
        { field: "id", headerName: "ID", width: 130 },
        { field: "brand", headerName: "Marca", width: 130 },
        { field: "model", headerName: "Modelo", width: 130 },
        { field: "plate", headerName: "Placa", width: 130 },
        { field: "motor", headerName: "Motor", width: 130 },
        { field: "status", headerName: "Status", width: 130 },
        { field: "obs", headerName: "Obs", width: 300 },
    ];

    useEffect(() => {
        axios
            .get(`/api/os`, {
                params: {
                    companyid: props.companyId,
                },
            })
            .then((resp) => {
                for (let x = 0; x < resp.data.length; x++) {
                    resp.data[x]["id"] = x + 1;
                }

                setArrOs(resp.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <br></br>
            <hr />
            <div style={{ height: 800, width: "100%", float: "left" }}>
                <DataGrid rows={arrOs} columns={columns} components={{ Toolbar: Export }} />
            </div>
        </div>
    );
};

export default Orcamento;
