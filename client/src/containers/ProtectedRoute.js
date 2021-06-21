import React from "react";
import { Redirect } from "react-router-dom";
import AppTopBarLogged from "./AppTopBarLogged";

class ProtectedRoute extends React.Component {
    render() {
        const Component = this.props.component;

        const isAuthenticated = localStorage.getItem("token");
        const companyId = localStorage.getItem("companyId");
        const usernameId = localStorage.getItem("usernameId");
        const control = localStorage.getItem("control");

        return isAuthenticated ? (
            <div>
                <AppTopBarLogged logado={true} name={"LogOut"} />
                <Component companyId={companyId} usernameId={usernameId} control={control} />
            </div>
        ) : (
            <div>
                <Redirect to={{ pathname: "/home" }} />
            </div>
        );
    }
}

export default ProtectedRoute;
