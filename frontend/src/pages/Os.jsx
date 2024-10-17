import "./Os.css";
import { NewOs } from "../components/NewOs";
import { useContext } from "react";
import axios from "axios";
import { Context } from "../context/UserContext";

export const Os = () => {

  const {authenticated } = useContext(Context);


  return (
    authenticated && <div className="os-container">
      <h2>Ordem de Serviço</h2>
      <NewOs  />
    </div>
  );
};
