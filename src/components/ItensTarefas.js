import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  IconButton,
  Button,
  Avatar,
  Typography,
  CardActions,
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
          title={<Button style={{ color: "white" }}>{data.fields.name}</Button>}
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
          <IconButton
            disabled={dadosUser.idUser != data.fields.idUser}
            size="small"
            aria-label="settings"
            onClick={() => form.HandleRemoverItens(data.id)}
          >
            <HighlightOffIcon />
          </IconButton>
          <IconButton
            disabled={dadosUser.idUser != data.fields.idUser}
            size="small"
            aria-label="settings"
            onClick={() => form.HandleEditForm(data)}
          >
            <EditIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  );
}

export default ItensTarefas;
