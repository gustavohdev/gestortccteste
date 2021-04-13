import React from "react";
import "./Home.css";
import AppTopBarNotLogged from './AppTopBarNotLogged'

export default function Home() {
  return (
    <div>
      <AppTopBarNotLogged />
        <div className="Home">
          <div className="lander">
            <h1>Gestor Mecânico</h1>
            <h3>Um app para gerenciar uma oficina mecânica</h3>
            <p>Faça login ou cadastre-se gratuitamente</p>
          </div>
        </div>
    </div>
      
  );
};