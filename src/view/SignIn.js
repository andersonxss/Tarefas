import React from "react";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  makeStyles,
  Container,
  Snackbar,
} from "@material-ui/core";

import GitHubIcon from "@material-ui/icons/GitHub";

import { useLoginContext } from "../context/LoginContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const { form } = useLoginContext();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <GitHubIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Entre com o seu GitHub
        </Typography>
        <form
          className={classes.form}
          onSubmit={form.handleSubmit(form.onSubmit)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Login"
            {...form.register("login", {
              required: true,
            })}
            helperText={
              form.formState.errors?.login?.type === "required" &&
              "Campo Obrigatório!"
            }
            error={
              form.formState.errors?.login?.type === "required" ? true : false
            }
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={form.loadForm}
            className={classes.submit}
          >
            {form.loadForm ? "Entrando..." : "Entrar"}
          </Button>
        </form>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={form.errorLogin}
          autoHideDuration={1000}
          message="Login não encontrado"
        />
      </div>
    </Container>
  );
}
