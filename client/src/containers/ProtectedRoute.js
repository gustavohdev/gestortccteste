import React from 'react'
import { Redirect } from 'react-router-dom'
//import { useHistory } from "react-router-dom";
import AppTopBarLogged from './AppTopBarLogged'

class ProtectedRoute extends React.Component {

    render() {

        const Component = this.props.component;

        //console.log(this.props.history)

        const isAuthenticated = localStorage.getItem('token');
        const companyId = localStorage.getItem('companyId')
        const usernameId = localStorage.getItem('usernameId')
        const control = localStorage.getItem('control')

        // console.log('antes do redirect', companyId)
        // const history = useHistory();
        // this.props.history.location = '/'

        //console.log( companyId === undefined)
        // console.log( companyId === 'undefined')

        /*if(isAuthenticated && companyId == 'undefined' ){
          return <Component companyId={companyId} />

        }else if(isAuthenticated && companyId != 'undefined'){
            return <Component companyId={companyId} />

        }else{
           return  <Redirect to={{ pathname: '/home' }} />

       }*/
       
       return isAuthenticated ? (
            <div> 
                <AppTopBarLogged logado={true} name={'LogOut'} />
                <Component companyId={companyId} usernameId={usernameId} control={control} />
            </div>
        ) : (
            <div>
                <Redirect to={{ pathname: '/home' }} />
            </div>
        );
    }
}

export default ProtectedRoute;