import { Alert, Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import UserService from "../../services/UserService";
import { AES } from 'crypto-js'

// Componente UserLogin que representa la página de inicio de sesión de la aplicación.
const UserLogin = () => {

  // Esquema de validación YUP
  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Debe ingresar un valor."),
    password: yup
      .string()
      .required("Debe ingresar un valor."),
  });

  // Todas las métodos de YUP a usar + Hook useForm para validar
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Mensaje en caso de: Error.
  const [alertMsg, setAlertMsg] = useState("");

  // Componente para dar avisa acorde al log.
  const [alertComponent, setAlertComponent] = useState(null);

  // Función dónde se iniciará sesión en la API al usuario
  const onSubmit = (data) => {
    UserService.logIn(data).then(res => {
      if (res.data.value) {
        sessionStorage.setItem('token', AES.encrypt(res.data.value, "patito").toString());
        sessionStorage.setItem('username', data.username);
        window.location.href = "/";
      }
    }).catch(e => setAlertMsg("Error"));
  };

  // UseEffect para mostrar el mensaje en el componente.
  useEffect(() => {
    console.log(alertMsg);
    if (alertMsg === "Error") {
      setAlertComponent(
        <Alert severity="error" sx={{ width: 500, mt: 2 }}>
          Usuario o contraseña incorrectos.
        </Alert>
      );
    }
  }, [alertMsg]);

  // Renderizado de la página
  return (
    <>
      <Header />
      {/* Contenedor */}
      <Container
        sx={{
          alignItems: "center",
          display: "flex",
          flexFlow: "column",
          justifyContent: "center",
          mb: 4
        }}
      >
        {alertComponent /* Componente mensaje de alerta */}

        {/* Formulario */}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          spacing={2}
          sx={{
            backgroundColor: "white",
            maxWidth: 300,
            p: 4,
            mt: 4,
            borderRadius: 3,
            boxShadow: "1px 1px 20px #333"
          }}
        >
          <Typography variant="h5" sx={{ textAlign: "center", color: "black" }}>Iniciar Sesión</Typography>
          <hr />

          {/* Campo del nombre de usuario */}
          <TextField
            id="user"
            label="Usuario"
            type="text"
            {...register("username")}
            sx={{ mb: 3, mt: 2 }}
            error={errors.username?.message}
          />
          <Typography textAlign={"center"}>{errors.username?.message}</Typography>

          {/* Campo de la contraseña */}
          <TextField
            id="password"
            label="Contraseña"
            type="password"
            fullWidth
            {...register("password")}
            error={errors.password?.message}
          />
          <Typography textAlign={"center"}>{errors.password?.message}</Typography>

          {/* Boton submit */}
          <Button variant="contained" type="submit"
            sx={{
              maxWidth: 300, mt: 4, color: "black", fontSize: 18,
              backgroundColor: "transparent",
              border: "2px solid lightgreen",
              ':hover': {
                border: "2px solid lightgreen",
                backgroundColor: "lightgreen",
                color: "white"
              }
            }}> Iniciar sesión </Button>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default UserLogin;
