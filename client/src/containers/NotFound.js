import React from "react";
import "./NotFound.css";
import AppTopBarNotLogged from './AppTopBarNotLogged'

export default function NotFound() {
  return (
    <div>
      <AppTopBarNotLogged />
      <div className="NotFound">
        <h3>Você não possui acesso ou página não encontrada !</h3>
      </div>
    </div>
  );
}