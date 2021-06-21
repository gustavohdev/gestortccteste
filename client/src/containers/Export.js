import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@material-ui/data-grid";

import React, { useState, useEffect } from "react";

export default function Export() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}
