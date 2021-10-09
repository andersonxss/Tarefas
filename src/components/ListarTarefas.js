import React from "react";
import Loader from "./Loader";
import ItensTarefas from "./ItensTarefas";
import { Grid } from "@material-ui/core";
import { useTarefasContext } from "../context/TarefasContext";

function ListarTarefas() {
  const data = useTarefasContext();
  const { itens, loading } = data.tarefas;
  const lista = itens.records;
  if (loading) return <Loader />;
  return (
    <Grid container spacing={2}>
      {lista.map((elem, i) => {
        return (
          <Grid item xs={12} sm={6}>
            <ItensTarefas data={elem} />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default ListarTarefas;
