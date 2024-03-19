import { Box, Container, Grid } from "@mui/material";
import HomeServiceCard from "../../components/HomeServiceCard";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Link } from "react-router-dom";

export const Home = () => {

  const serviceList = [
    {
      id: 1,
      link: "/service/bus-tickets",
      title: "Pasajes de colectivos",
      img: "https://images.unsplash.com/photo-1617479625255-43666e3a3509?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      desc: "¿Necesitas viajar pero no tienes suficiente dinero? ¡No te preocupes más, mira estos super pasajes en colectivo a tu lugar vacacional!",
    },
    {
      id: 2,
      link: "/service/plane-tickets",
      title: "Pasajes de aviones",
      img: "https://images.unsplash.com/photo-1499063078284-f78f7d89616a?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      desc: "¿Con ganas de viajar? ¡Que esperas para sacar un pasaje para ese viaje tan anhelado en nuestros aviones de primera clase!",
    },
    {
      id: 3,
      link: "/service/train-tickets",
      title: "Pasajes de trenes",
      img: "https://images.unsplash.com/photo-1532105956626-9569c03602f6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      desc: "¡Mira estos increíbles precios de nuestros pasajes en tren que no te podes perder!",
    },
    {
      id: 4,
      link: "/service/hotels",
      title: "Reserva de hoteles",
      img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      desc: "¿Buscando alojamiento? ¡No se diga más! Explora nuestros hoteles de más alta calidad.",
    },
    {
      id: 5,
      link: "/service/car-rent",
      title: "Alquiler de autos",
      img: "https://www.karvi.com.ar/blog/wp-content/uploads/2022/01/Cronos0-850x524.jpg",
      desc: "¿Necesitando alquilar un transporte? ¡Que esperas para ver nuestros fantásticos vehículos",
    },
    {
      id: 6,
      link: "/service/excursion",
      title: "Excursiones",
      img: "https://images.unsplash.com/photo-1621528833554-c7cc26249762?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      desc: "¿Con ganas de conocer un poco más el mundo? ¡Explora nuestras increíbles excursiones a precios geniales!",
    },
    {
      id: 7,
      link: "/service/events-tickets",
      title: "Entradas a eventos",
      img: "https://images.unsplash.com/photo-1587407627257-27b7127c868c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      desc: "¡No esperes más para sacar esa entrada a tu evento tan esperado! Mira todas las entradas a eventos que tenemos a precios espectaculares.",
    },
    {
      id: 8,
      link: "/packages",
      title: "Paquetes",
      img: "https://images.unsplash.com/photo-1707343845208-a20c56d2c8ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      desc: "¡Mira nuestros asombrosos paquetes con descuento del 10% para poder disfrutar de lugares o actividades increíbles!"
    }
  ];

  const serviceForHeach = serviceList.map((data) => (
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

  return (
    <>
      <Header variant={1} />
      <Box
        sx={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1575580280904-905f466584e0?q=80&w=2041&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundSize: "cover",
        }}
      >
        <Box sx={{ backgroundColor: "#5e936564", paddingBottom: "2%" }}>
          <Container>
            <Grid container>{serviceForHeach}</Grid>
          </Container>
        </Box>
      </Box>
      <Footer />
    </>
  );
};