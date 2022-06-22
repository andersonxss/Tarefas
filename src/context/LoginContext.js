import React, { createContext, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
const MyContext = createContext();

export default function LoginContextProvider({ children }) {
  const { register, handleSubmit, reset, formState } = useForm();
  const [loadForm, setLoadForm] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const [dadosUser, setDadosUser] = useState(null);
  let history = useHistory();

  useEffect(() => {
    handleDadosUser();
    isAuthenticated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (values) => {
    setLoadForm(true);
    const response = await fetch(
      `https://api.github.com/users/${values.login}`
    );
    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
      const session = {
        idUser: data.id,
        name: data.name,
        login: data.login,
        avatar_url: data.avatar_url,
      };
      localStorage.setItem("session", true);
      localStorage.setItem("dadosUser", JSON.stringify(session));
      window.location.href = "/";
    } else {
      handleErrorLogin();
    }
    setLoadForm(false);
  };

  const handleErrorLogin = () => {
    setErrorLogin(true);
    setTimeout(() => {
      setErrorLogin(false);
    }, 2000);
  };

  const handleDadosUser = () => {
    const dados = JSON.parse(localStorage.getItem("dadosUser"));

    setDadosUser(dados);
  };

  const handleLogout = () => {
    localStorage.removeItem("session");
    localStorage.removeItem("dadosUser");
    isAuthenticated();
  };

  const isAuthenticated = () => {
    const login = localStorage.getItem("session");

    if (!Boolean(login)) {
      history.push("/Singin");
    }
  };

  return (
    <MyContext.Provider
      value={{
        form: {
          onSubmit,
          errorLogin,
          register,
          handleSubmit,
          handleLogout,
          reset,
          formState,
          loadForm,
        },
        dadosUser,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export function useLoginContext() {
  return useContext(MyContext);
}
