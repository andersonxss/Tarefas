import React from "react";
import { makeStyles, Container, Grid } from "@material-ui/core";
import Header from "../components/Header";
import CadastroTarefas from "../components/CadastroTarefas";
import ListarTarefas from "../components/ListarTarefas";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: 0,
  },
}));

function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <CadastroTarefas />
          </Grid>
          <Grid item xs={12} sm={8}>
            <ListarTarefas />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Home;
