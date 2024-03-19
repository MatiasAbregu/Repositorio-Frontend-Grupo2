import { Alert, Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import UserService from "../../services/UserService";
import { AES } from 'crypto-js'

const UserCreate = () => {

  const schema = yup.object().shape({

    username: yup
      .string()
      .required("Debe ingresar un valor."),
    password: yup
      .string()
      .required("Debe ingresar un valor."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [alertMsg, setAlertMsg] = useState("");
  const [alertComponent, setAlertComponent] = useState(null);

  const onSubmit = (data) => {
    UserService.logIn(data).then(res => {
      if (res.data.value) {
        sessionStorage.setItem('token', AES.encrypt(res.data.value, "patito").toString());
        sessionStorage.setItem('username', data.username);
        window.location.href = "/";
      }
    }).catch(e => setAlertMsg("Error"));
  };

  useEffect(() => {
    console.log(alertMsg);
    if(alertMsg === "Error"){
      setAlertComponent(
        <Alert severity="error" sx={{ width: 500, mt: 2 }}>
          Usuario o contraseña incorrectos.
        </Alert>
      );
    }
  }, [alertMsg]);

  return (
    <>
      <Header />
      <Container
        sx={{
          alignItems: "center",
          display: "flex",
          flexFlow: "column",
          justifyContent: "center",
        }}
      >
        {alertComponent}
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
          <TextField
            id="user"
            label="Usuario"
            type="text"
            {...register("username")}
            sx={{ mb: 3, mt: 2 }}
            error={errors.username?.message}
          />
          <Typography textAlign={"center"}>{errors.username?.message}</Typography>
          <TextField
            id="password"
            label="Contraseña"
            type="password"
            fullWidth
            {...register("password")}
            error={errors.password?.message}
          />
          <Typography textAlign={"center"}>{errors.password?.message}</Typography>

          <Button variant="contained" type="submit" sx={{ maxWidth: 300, mt: 4, color: "white", backgroundColor: "#ddabab", fontSize: 18, }}>
            Ingresar
          </Button>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default UserCreate;
