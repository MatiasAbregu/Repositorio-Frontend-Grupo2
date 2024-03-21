import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ServiceConnection from "../../services/ServiceConnection";
import Header from "../../components/Header";
import { Button, Container, Grid, Typography } from "@mui/material";
import Footer from "../../components/Footer";

export const ServiceIdPage = () => {

  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    ServiceConnection.getServiceById(id).then(res => setService(res.data)).catch(e => console.log(e));
  }, [id])

  return (
    <>
      <Header variant={1} />
      <Container>
        <Grid container>
          <Grid
            item
            xs={12}
            md={8.1}
            sx={{ height: "auto", overflowWrap: "break-word", p: 3 }}
          >
            <Typography variant="h3">{service && service.name}</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item sm={12} md={12} sx={{ display: "flex", justifyContent: "center", margin: "1% 0" }}>
            <img src={service && service.img} style={{ width: "60%" }} alt="" srcSet="" />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item sm={6} md={8} sx={{ p: 4 }}>
            Descripción: {service && service.desc}
          </Grid>
          <Grid
            item
            sm={6}
            md={4}
            sx={{ display: "flex", alignItems: "center", padding: 3, mt: 10 }}
          >
            <Typography variant="h6" margin={0}>Precio: ${service && service.price}</Typography>
            <Link to={`/purchase/service/${id}`} className="btnPurchase">
              Comprar
            </Link>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};