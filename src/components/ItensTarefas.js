import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  IconButton,
  Avatar,
  Typography,
  CardActions,
  Tooltip,
} from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import EditIcon from "@material-ui/icons/Edit";
import { useTarefasContext } from "../context/TarefasContext";
import { useLoginContext } from "../context/LoginContext";

function ItensTarefas(props) {
  const { data } = props;
  const { form } = useTarefasContext();
  const { dadosUser } = useLoginContext();

  return (
    <Box mt={4} key={data.id}>
      <Card>
        <CardHeader
          avatar={<Avatar alt="Remy Sharp" src={data.fields.avatar_url} />}
          disableTypography={true}
          size="small"
          style={{ backgroundColor: "#3f51b5" }}
          title={
            <Typography variant="h6" component="h2" style={{ color: "white" }}>
              {data.fields.name}
            </Typography>
          }
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {data.fields.assunto}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {data.fields.descricao}
          </Typography>
        </CardContent>
        <CardActions>
          <Tooltip title="Excluir" placement="top">
            <IconButton
              disabled={dadosUser.idUser != data.fields.idUser}
              size="small"
              aria-label="settings"
              onClick={() => form.HandleRemoverItens(data.id)}
            >
              <HighlightOffIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Editar" placement="top">
            <IconButton
              disabled={dadosUser.idUser != data.fields.idUser}
              size="small"
              aria-label="settings"
              onClick={() => form.HandleEditForm(data)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </Box>
  );
}

export default ItensTarefas;
