import { Box, Container, Grid } from "@mui/material";
import HomeServiceCard from "../../components/HomeServiceCard";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AES, enc } from "crypto-js";


// Componente HomeEmployee que representa la página de inicial de la aplicación.
export const HomeEmployee = () => {

  // Lista de los tipos de administración de los datos
  const adminDataList = [
    {
      id: 1,
      link: "/employee/services",
      title: "Gestión de servicios",
      img: "https://images.unsplash.com/photo-1503551723145-6c040742065b-v2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      desc: "Lee, modifica, actualiza o elimina los datos de los servicios.",
    },
    {
      id: 2,
      link: "/employee/employees",
      title: "Gestión de empleados",
      img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      desc: "Lee, modifica, actualiza o elimina los datos de los empleados.",
    },
    {
      id: 3,
      link: "/employee/packages",
      title: "Gestión de paquetes",
      img: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      desc: "Lee, modifica, actualiza o elimina los datos de los paquetes.",
    },
    {
      id: 4,
      link: "/employee/sales",
      title: "Gestión de ventas",
      img: "https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      desc: "Lee, modifica, actualiza o elimina los datos de las ventas.",
    },
  ];

  // Mapea cada tipo de administración a un componente Grid que lo contiene en una tarjeta de servicio
  const adminDataForEach = adminDataList.map((data) => (
    <Grid
      item
      sm={6}
      xs={12}
      sx={{
        mt: 2,
        display: "flex",
        alignContent: "center",
        justifyItems: "center",
      }}
      key={data.id}
    >
      <Box sx={{ p: 2 }}>
        <Link to={data.link}>
          <HomeServiceCard
            info={{
              title: data.title,
              img: data.img,
              desc: data.desc,
            }}
          />
        </Link>
      </Box>
    </Grid>
  ));

  // Verifica si existe un token, sino lo redirecciona a iniciar sesión
  if (sessionStorage.getItem('token')) {
    const token = AES.decrypt(sessionStorage.getItem('token'), "patito");
    const rol = jwtDecode(token.toString(enc.Utf8));
    
    // Se desencripta y verifica si trae rol "Admin" o "Employee", si no, entonces se lo redirecciona a iniciar sesión
    if (rol.role == "Admin" || rol.role == "Employee") {
      return (
        <>
          <Header variant={2} />

          {/* Contenedor principal con imagen de fondo */}
          <Box
            sx={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1575580280904-905f466584e0?q=80&w=2041&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
              backgroundSize: "cover",
              minHeight: "72vh"
            }}
          >
            {/* Contenedor para mostrar los tipos de administración */}
            <Box sx={{ backgroundColor: "#5e936564", padding: "3% 0 4% 0" }}>
              <Container>
                <Grid container>{adminDataForEach}</Grid>
              </Container>
            </Box>
          </Box>
          <Footer />
        </>
      );
    } else return window.location.href = "/user/login";
  } else
    return window.location.href = "/user/login";
};