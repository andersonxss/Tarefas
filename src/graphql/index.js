import { gql } from "@apollo/client";

export const GET_TAREFAS = gql`
  query TarefasQuery {
    tarefa @rest(path: "tarefas") {
      records {
        id
        fields
      }
    }
  }
`;

export const ADD_TAREFAS = gql`
  mutation criarTarefas(
    $assunto: String
    $descricao: String
    $idUser: Integer
    $name: String
    $avatar_url: String
  ) {
    criarTarefas(
      input: {
        fields: {
          assunto: $assunto
          descricao: $descricao
          idUser: $idUser
          avatar_url: $avatar_url
          name: $name
        }
      }
    ) @rest(path: "tarefas", method: "POST") {
      id
      fields
    }
  }
`;

export const EDIT_TAREFAS = gql`
  mutation editarTarefas($id: String, $assunto: String, $descricao: String) {
    editarTarefas(
      id: $id
      input: { fields: { assunto: $assunto, descricao: $descricao } }
    ) @rest(path: "tarefas/{args.id}", method: "PUT") {
      NoResponse
    }
  }
`;

export const REMOVER_TAREFAS = gql`
  mutation deletarTarefas($id: String) {
    deletarTarefas(id: $id) @rest(path: "tarefas/{args.id}", method: "DELETE") {
      NoResponse
    }
  }
`;
