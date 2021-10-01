import React from "react";
import {
  TextField,
  makeStyles,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import { useTarefasContext } from "../context/TarefasContext";
import BackdropLoader from "./Backdrop ";
const useStyles = makeStyles({
  root: {
    marginTop: 20,
  },
  media: {
    height: 140,
  },
});

export default function CadastroTarefas() {
  const classes = useStyles();
  const { form } = useTarefasContext();

  return (
    <Card className={classes.root}>
      {form.loadForm && <BackdropLoader />}
      <form onSubmit={form.handleSubmit(form.onSubmit)}>
        <input type="hidden" {...form.register("id")} />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h5" variant="h5">
                Criar Tarefas
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-flexible"
                label="Assunto"
                fullWidth
                size="small"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                {...form.register("assunto", {
                  required: true,
                })}
                helperText={
                  form.formState.errors?.assunto?.type === "required" &&
                  "Campo Obrigatório!"
                }
                error={
                  form.formState.errors?.assunto?.type === "required"
                    ? true
                    : false
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-static"
                label="Descrição"
                fullWidth
                multiline
                rows={3}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                {...form.register("descricao", {
                  required: true,
                })}
                helperText={
                  form.formState.errors?.descricao?.type === "required" &&
                  "Campo Obrigatório!"
                }
                error={
                  form.formState.errors?.descricao?.type === "required"
                    ? true
                    : false
                }
              />
            </Grid>
          </Grid>
        </CardContent>

        <CardActions>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={form.loadForm}
          >
            {form.loadForm ? "Enviando..." : "Enviar"}
          </Button>
        </CardActions>
      </form>
    </Card>
  );
}
