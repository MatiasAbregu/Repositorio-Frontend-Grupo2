import { Alert, Box, Button, Container, Icon, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import userValidationYup from "../../hooks/userValidationYup";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import dayjs from "dayjs";
import UserService from "../../services/UserService";
import { useEffect, useState } from "react";

// Componente UserCreate que representa la página de registro de usuario de la aplicación.
const UserCreate = () => {

  // Todas las métodos de YUP a usar + Hook useForm para validar
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userValidationYup()),
  });

  // Mensaje en caso de: Éxito o Error.
  const [log, setLog] = useState("");

  // Componente para dar avisa acorde al log.
  const [alertComponent, setAlertComponent] = useState(null);

  // Función dónde se registrará en la API al usuario
  const onSubmit = (data) => {
    data.birthdate = dayjs(data.birthdate).format("YYYY-MM-DD");

    const person = {
      dni: data.dni,
      firstName: data.name,
      lastName: data.last_name,
      birthdate: data.birthdate,
      address: data.address,
      nationality: data.nationality,
      user: {
        username: data.user_name,
        password: data.password,
        email: data.email,
        cellphone: data.phone,
        role: "User",
      },
    };

    UserService.createUser(person).then(res => {
      if (res.data.value) setLog("Success");
      else setLog("Failed")
    }).catch(e => setLog("Failed"));

    window.scrollTo(0, 0);
  };

  // UseEffect para mostrar el mensaje en el componente.
  useEffect(() => {
    if (log === "Success") {
      setAlertComponent(
        <Alert severity="success" sx={{ width: 500, mt: 2, '*': { width: "auto" } }}>
          ¡Registro creado con éxito! Ya puedes iniciar sesión.
        </Alert>
      );
    } else if (log === "Failed") {
      setAlertComponent(
        <Alert severity="error" sx={{ width: 500, mt: 2, '*': { width: "auto" } }}>
          ¡DNI ya registrado! Si ya estás registrado inicia sesión.
        </Alert>
      );
    }
  }, [log]);

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
        }}
      >
        {alertComponent /* Componente mensaje de LOG */}

        {/* Formulario */}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          spacing={2}
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            backgroundColor: "white",
            maxWidth: 600,
            m: 4,
            p: 4,
            borderRadius: 3,
            boxShadow: "1px 1px 20px #333",
            boxSizing: "border-box"
          }}
        >
          <Typography variant="h5" sx={{ textAlign: "center", color: "black" }}>Registrarse</Typography>
          <hr />

          {/* Campo del nombre */}
          <TextField
            id="name"
            label="Nombre"
            type="text"
            {...register("name")}
            sx={{ m: 1, mt: 3 }}
            error={errors.name?.message}
          />
          <Typography textAlign={"center"}>{errors.name?.message}</Typography>

          {/* Campo del apellido */}
          <TextField
            id="last_name"
            label="Apellido"
            fullWidth
            type="text"
            {...register("last_name")}
            sx={{ m: 1 }}
            error={errors.last_name?.message}
          />
          <Typography textAlign={"center"}>
            {errors.last_name?.message}
          </Typography>

          {/* Campo del nombre de usuario */}
          <TextField
            id="user_name"
            label="Nombre de usuario"
            fullWidth
            type="text"
            {...register("user_name")}
            sx={{ m: 1 }}
            error={errors.user_name?.message}
          />
          <Typography textAlign={"center"}>
            {errors.user_name?.message}
          </Typography>

          {/* Campo del dni */}
          <TextField
            id="dni"
            label="DNI"
            fullWidth
            type="text"
            {...register("dni")}
            sx={{ m: 1 }}
            error={errors.dni?.message}
          />
          <Typography textAlign={"center"}>{errors.dni?.message}</Typography>

          {/* Campo del teléfono*/}
          <TextField
            id="phone"
            label="Teléfono"
            fullWidth
            type="text"
            {...register("phone")}
            sx={{ m: 1 }}
            error={errors.phone?.message}
          />
          <Typography textAlign={"center"}>{errors.phone?.message}</Typography>

          {/* Campo de la dirección */}
          <TextField
            id="address"
            label="Dirección"
            fullWidth
            type="text"
            {...register("address")}
            sx={{ m: 1 }}
            error={errors.address?.message}
          />
          <Typography textAlign={"center"}>{errors.address?.message}</Typography>

          {/* Campo de la nacionalidad */}
          <TextField
            id="nationality"
            label="Nacionalidad"
            type="text"
            {...register("nationality")}
            sx={{ m: 1 }}
            error={errors.nationality?.message}
          />
          <Typography textAlign={"center"}>
            {errors.nationality?.message}
          </Typography>

          {/* Campo del email */}
          <TextField
            id="email"
            label="Email"
            type="text"
            {...register("email")}
            sx={{ m: 1 }}
            error={errors.email?.message}
          />
          <Typography textAlign={"center"}>{errors.email?.message}</Typography>

          {/* Campo de la contraseña */}
          <TextField
            id="password"
            label="Contraseña"
            type="password"
            fullWidth
            {...register("password")}
            sx={{ m: 1 }}
            error={errors.password?.message}
          />
          <Typography textAlign={"center"}>{errors.password?.message}</Typography>

          {/* Campo para validar la contraseña */}
          <TextField
            id="confirmPassword"
            label="Confirmar contraseña"
            type="password"
            fullWidth
            {...register("confirmPassword")}
            sx={{ m: 1 }}
            error={errors.confirmPassword?.message}
          />
          <Typography textAlign={"center"}>
            {errors.confirmPassword?.message}
          </Typography>

          {/* Campo del nacimiento de la persona */}
          <TextField
            id="birthdate"
            name="birthdate"
            type="date"
            {...register("birthdate")}
            sx={{ m: 1 }}
            error={errors.birthdate?.message}
            helperText="Intoduce tu fecha de nacimiento"
          />
          <Typography textAlign={"center"}>
            {errors.birthdate?.message}
          </Typography>

          {/* Boton submit */}
          <Button
            variant="contained"
            type="submit"
            sx={{
              width: "60%",
              mt: 4,
              color: "black",
              fontSize: 18,
              backgroundColor: "transparent",
              border: "2px solid lightgreen",
              marginRight: "20%",
              marginLeft: "20%",
              ':hover': {
                  border: "2px solid lightgreen",
                  backgroundColor: "lightgreen",
                  color: "white"
              }
            }}
          > Crear </Button>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default UserCreate;