import React, { useEffect, useState } from "react";
import ServiceCard from "../../components/ServiceCard.jsx";
import { Box,  Grid } from "@mui/material";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import ServiceConnection from "../../services/ServiceConnection.js"

/**
 * Componente ServiceType muestra una lista de servicios basada en el tipo especificado.
 * @param {string} type - El tipo de servicio a mostrar (por ejemplo: "Hoteles", "Autos", "Colectivos", etc.).
 * @returns {JSX.Element} Componente ServiceType.
 */
export const ServiceType = ({ type }) => {

  /**
   * Estado para almacenar la lista de servicios.
   * @type {Array}
   */
  const [list, setList] = useState([]);

  /**
   * Efecto para cargar la lista de servicios basada en el tipo especificado consultado a su respectivo service para llamar a la API.
   */
  useEffect(() => {
    if (type === "Hoteles") {
      ServiceConnection.getAllHotelsServices().then(res => setList(res.data)).catch(e => console.log(e));
    } else if (type === "Autos") {
      ServiceConnection.getAllCarServices().then(res => setList(res.data)).catch(e => console.log(e));
    } else if (type === "Colectivos") {
      ServiceConnection.getAllBusServices().then(res => setList(res.data)).catch(e => console.log(e));
    } else if (type === "Aviones") {
      ServiceConnection.getAllPlanesServices().then(res => setList(res.data)).catch(e => console.log(e));
    } else if (type === "Trenes") {
      ServiceConnection.getAllTrainServices().then(res => setList(res.data)).catch(e => console.log(e));
    } else if (type === "Excursiones") {
      ServiceConnection.getAllExcursionServices().then(res => setList(res.data)).catch(e => console.log(e));
    } else if (type === "Eventos") {
      ServiceConnection.getAllEventsServices().then(res => setList(res.data)).catch(e => console.log(e));
    }
  }, [type])

  /**
   * Componente que renderiza la lista de servicios, uno por uno llamando a serviceCard y pasándole la información solicitada.
   * @type {JSX.Element}
   */
  const infoComponent = list.map((data) => (
    <Grid
      item
      xs={12}
      sm={6}
      md={3}
      key={data.code}
      sx={{ mt: 2, display: "flex", justifyContent: "center" }}
    >
      <ServiceCard key={data.code} info={data} />
    </Grid>
  ));

  return (
    <>
      <Header variant={1} />
      <Box sx={{
        mr: 0, ml: 0, pb: "8%", backgroundImage:
          "url(https://images.unsplash.com/photo-1516410290616-fb59b7994a51?q=80&w=1443&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        backgroundSize: "cover",
      }} >
        <Box>
          <Grid container mb={4} mt={2} ml={5} mr={2}>{infoComponent}</Grid>
        </Box>
      </Box>
      <Footer />
    </>
  );
};