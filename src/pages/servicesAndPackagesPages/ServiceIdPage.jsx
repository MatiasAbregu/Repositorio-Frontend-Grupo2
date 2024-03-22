import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ServiceConnection from "../../services/ServiceConnection";
import Header from "../../components/Header";
import { Box, Grid, Typography } from "@mui/material";
import Footer from "../../components/Footer";

/**
 * Componente `ServiceIdPage` muestra información detallada sobre un servicio específico identificado por su ID.
 * @returns {JSX.Element} Componente ServiceIdPage.
 */
export const ServiceIdPage = () => {

  // Obtiene el parámetro de ruta `id` del URL usando `useParams`.
  const { id } = useParams();

  /**
   * Estado para almacenar la información del servicio.
   * @type {Object}
   */
  const [service, setService] = useState({});

  // Efecto para cargar la información del servicio especificado desde su servicio que conecta con la API.
  useEffect(() => {
    ServiceConnection.getServiceById(id).then(res => setService(res.data)).catch(e => console.log(e));
  }, [id])

  return (
    <>
      <Header variant={1} />
      <Box sx={{ backgroundImage: "url(https://images.unsplash.com/photo-1589311836849-4cec35b363cb?q=80&w=1505&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)", backgroundSize: "cover" }}>
        {/* Nombre del servicio */}
        <Grid container>
          <Grid
            item
            xs={12}
            md={12}
            sx={{ height: "auto", overflowWrap: "break-word", p: 3 }}
          >
            <Typography variant="h3" sx={{ fontFamily: "Protest Revolution" }} align="center">Servicio: {service && service.name}</Typography>
          </Grid>
        </Grid>

        {/* Imagen del servicio */}
        <Grid container>
          <Grid item sm={12} md={12} sx={{ display: "flex", justifyContent: "center", margin: "1% 0" }}>
            <img src={service && service.img} style={{ width: "60%", borderRadius: 10, filter: "drop-shadow(16px 16px 20px white) invert(10%)" }} alt="" srcSet="" />
          </Grid>
        </Grid>

        {/* Descripción del servicio y su precio */}
        <Grid container>
          <Grid item sm={6} md={6} sx={{ my: 5, ml: 2, mr: 5, p: 4, fontFamily: "Protest Revolution", boxShadow: "0px 1px 10px 5px white", borderRadius: 5, background: "black" }}>
            <p style={{padding: 0, margin: 0, fontSize: 22}}>Tipo de servicio: {service && service.type}</p> <br />
            <p style={{padding: 0, margin: 0, fontSize: 22}}>Descripción: {service && service.desc}</p> <br />
            <p style={{padding: 0, margin: 0, fontSize: 22}}>Fecha de uso: {service && service.date}</p>
          </Grid>
          <Grid
            item
            sm={5}
            md={5}
            sx={{ display: "flex", alignItems: "center", mt: 13, p: 2, background: "black", boxShadow: "0px 1px 10px 5px white", borderRadius: 5, height: 85 }}
          >
            <Typography variant="p" margin={0} sx={{fontFamily: "Protest Revolution", fontSize: 22}}>Precio: ${service && service.price}</Typography>
            <Link to={`/purchase/service/${id}`} className="btnPurchase">
              Comprar
            </Link>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
};