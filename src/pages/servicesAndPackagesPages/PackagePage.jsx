import React, { useEffect, useState } from "react";
import ServiceCard from "../../components/ServiceCard.jsx";
import { Box, Grid } from "@mui/material";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import PackageService from "../../services/PackageService.js";

/**
 * Componente `PackagePage` muestra la lista de paquetes disponibles.
 * @returns {JSX.Element} Componente PackagePage.
 */
export const PackagePage = () => {

  /**
   * Estado para almacenar la lista de paquetes.
   * @type {Array}
   */
  const [list, setList] = useState([]);

  /**
   * Efecto para cargar la lista de paquetes desde su servicio al montar el componente.
   */
  useEffect(() => {
    PackageService.getAllPackages().then(r => setList(r.data)).catch(e => console.log(e));
  }, [])

  /**
   * Componente que renderiza la lista de paquetes.
   * @type {JSX.Element}
   */
  const infoComponent = list.map((data) => (
    <Grid
      item
      xs={12}
      sm={6}
      md={3}
      key={data.id}
      sx={{ mt: 2, display: "flex", justifyContent: "center", p: 1 }}
    >
      <ServiceCard key={data.id} info={data} variant={"package"} />
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
          <Grid container sx={{ padding: 6 }}>
            {infoComponent}
          </Grid>
        </Box>
      </Box>
      <Footer />
    </>
  );
};