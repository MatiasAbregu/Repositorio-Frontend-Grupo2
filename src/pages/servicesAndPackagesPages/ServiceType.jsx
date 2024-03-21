import React, { useEffect, useState } from "react";
import ServiceCard from "../../components/ServiceCard.jsx";
import { Container, Grid } from "@mui/material";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import ServiceConnection from "../../services/ServiceConnection.js"

export const ServiceType = ({type}) => {
  
    const [list, setList] = useState([]);

    useEffect(() => {
        if(type === "Hoteles"){
            ServiceConnection.getAllHotelsServices().then(res => setList(res.data)).catch(e => console.log(e));
        } else if(type === "Autos"){
            ServiceConnection.getAllCarServices().then(res => setList(res.data)).catch(e => console.log(e));
        } else if(type === "Colectivos"){
            ServiceConnection.getAllBusServices().then(res => setList(res.data)).catch(e => console.log(e));
        } else if(type === "Aviones"){
            ServiceConnection.getAllPlanesServices().then(res => setList(res.data)).catch(e => console.log(e));
        } else if(type === "Trenes"){
            ServiceConnection.getAllTrainServices().then(res => setList(res.data)).catch(e => console.log(e));
        } else if(type === "Excursiones"){
            ServiceConnection.getAllExcursionServices().then(res => setList(res.data)).catch(e => console.log(e));
        } else if(type === "Eventos"){
            ServiceConnection.getAllEventsServices().then(res => setList(res.data)).catch(e => console.log(e));
        }
    }, [type])

  const infoComponent = list.map((data) => (
    <Grid
      item
      xs={12}
      sm={6}
      md={3}
      key={data.id}
      sx={{ mt: 2, display: "flex", justifyContent: "center", p: 1 }}
    >
      <ServiceCard key={data.id} info={data} />
    </Grid>
  ));
  return (
    <>
      <Header variant={1}/>
      <Container>
        <Grid container spacing={0} sx={{ padding: 6 }}>
          {infoComponent}
        </Grid>
      </Container>
      <Footer />
    </>
  );
};