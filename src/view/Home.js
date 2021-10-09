import React, { useState } from "react";
import {
  makeStyles,
  Container,
  Grid,
  Box,
  Tooltip,
  Fab,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Header from "../components/Header";
import CadastroTarefas from "../components/CadastroTarefas";
import ListarTarefas from "../components/ListarTarefas";
import BackdropLoader from "../components/Backdrop ";
import { useTarefasContext } from "../context/TarefasContext";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: 0,
  },
}));

function Home() {
  const classes = useStyles();

  const { form } = useTarefasContext();

  return (
    <div className={classes.root}>
      <Header />
      <Container maxWidth="lg">
        <Box mt={2} display="flex" justifyContent="end" alignItems="center">
          <Tooltip title="Add" aria-label="add">
            <Fab color="secondary" onClick={() => form.openDialog()}>
              <AddIcon />
            </Fab>
          </Tooltip>
        </Box>
        <ListarTarefas />
        <CadastroTarefas openDialog={form.openDialog} open={form.open} />
        {form.loadForm && <BackdropLoader />}
      </Container>
    </div>
  );
}

export default Home;
