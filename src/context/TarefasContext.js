import React, { createContext, useContext, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_TAREFAS,
  ADD_TAREFAS,
  REMOVER_TAREFAS,
  EDIT_TAREFAS,
} from "../graphql";
import { useForm } from "react-hook-form";
import { useLoginContext } from "./LoginContext";
const MyContext = createContext();

// const cacheCreate = {
//   update(cache, { data }) {
//     const newTarefasResponse = data?.criarTarefas;
//     const existionTarefas = cache.readQuery({ query: GET_TAREFAS });
//     console.log(existionTarefas);
//     cache.writeQuery({
//       query: GET_TAREFAS,
//       data: {
//         tarefas: [...existionTarefas.tarefa.records, newTarefasResponse],
//       },
//     });
//   },
// };

export default function TarefasContextProvider({ children }) {
  const [loadForm, setLoadForm] = useState(false);
  const [open, setOpen] = useState(false);
  const { data, loading } = useQuery(GET_TAREFAS);
  const [criarTarefas] = useMutation(ADD_TAREFAS);
  const [editarTarefas] = useMutation(EDIT_TAREFAS);
  const [deletarTarefas] = useMutation(REMOVER_TAREFAS);
  const { setFocus, setValue, register, handleSubmit, reset, formState } =
    useForm();

  const { dadosUser } = useLoginContext();

  const onSubmit = (data) => {
    setLoadForm(true);
    setOpen(false);
    data.idUser = dadosUser.idUser;
    data.name = dadosUser.name;
    data.avatar_url = dadosUser.avatar_url;
    let response;
    if (data.id) {
      response = editarTarefas({
        variables: data,
        refetchQueries: [{ query: GET_TAREFAS }],
      });
    } else {
      response = criarTarefas({
        variables: data,
        refetchQueries: [{ query: GET_TAREFAS }],
      });
    }

    response.then(() => {
      setLoadForm(false);

      reset({});
      setValue("id", "");
    });
  };

  const HandleEditForm = (data) => {
    setOpen(true);
    setValue("id", data.id);
    setValue("assunto", data.fields.assunto);
    setValue("descricao", data.fields.descricao);
  };

  const HandleLimparForm = () => {
    setFocus("assunto");
    setFocus("descricao");
    setValue("id", "");
    setValue("assunto", "");
    setValue("descricao", "");
  };

  const HandleRemoverItens = (id) => {
    setLoadForm(true);
    deletarTarefas({
      variables: { id: id },
      refetchQueries: [{ query: GET_TAREFAS }],
    }).then(() => {
      setLoadForm(false);
    });
  };

  const openDialog = () => {
    reset({});
    setOpen(true);
  };

  const closeDialog = () => {
    reset({});
    setOpen(false);
  };

  return (
    <MyContext.Provider
      value={{
        tarefas: {
          itens: data ? data.tarefa : [],
          loading,
          criarTarefas,
          deletarTarefas,
        },
        form: {
          onSubmit,
          register,
          handleSubmit,
          HandleRemoverItens,
          HandleEditForm,
          HandleLimparForm,
          reset,
          open,
          openDialog,
          closeDialog,
          formState,
          loadForm,
        },
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export function useTarefasContext() {
  return useContext(MyContext);
}
