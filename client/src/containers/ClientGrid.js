import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import Export from "./Export";

const ClientGrid = (props) => {
    const [data, setData] = useState([]);

    const columns = [
        { field: "id", headerName: "ID", width: 20 },
        { field: "name", headerName: "Nome", width: 130 },
        { field: "surname", headerName: "Sobrenome", width: 130 },
        { field: "email", headerName: "Email", width: 300 },
        { field: "cellphone", headerName: "Telefone", width: 130 },
    ];

    useEffect(() => {
        axios
            .get(`/api/clients`, {
                params: {
                    companyid: props.companyId,
                },
            })
            .then((resp) => {
                for (let x = 0; x < resp.data.length; x++) {
                    resp.data[x]["id"] = x + 1;
                }

                setData(resp.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <hr></hr>
            <div style={{ height: 800, width: "100%", float: "left" }}>
                <DataGrid rows={data} columns={columns} components={{ Toolbar: Export }} />
            </div>
        </div>
    );
};

export default ClientGrid;
