import React from "react";
import {
  TextField,
  Box,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useTarefasContext } from "../context/TarefasContext";

export default function CadastroTarefas() {
  const { form } = useTarefasContext();

  return (
    <Dialog
      open={form.open}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="customized-dialog-title">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography>Criar Tarefas</Typography>
          <IconButton aria-label="close" onClick={() => form.closeDialog()}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={form.handleSubmit(form.onSubmit)}>
          <input type="hidden" {...form.register("id")} />
          <Grid container spacing={2}>
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
            <Grid item xs={12} sm={6}></Grid>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={form.loadForm}
              >
                {form.loadForm ? "Enviando..." : "Enviar"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
}
