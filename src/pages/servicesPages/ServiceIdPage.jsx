import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ServiceConnection from "../../services/ServiceConnection";
import Header from "../../components/Header";
import { Button, Container, Grid, Typography } from "@mui/material";
import Footer from "../../components/Footer";

export const ServiceIdPage = () => {

  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    ServiceConnection.getServiceById(id).then(res => setService(res.data)).catch(e => console.log(e));
  },[id])

  return (
    <>
      <Header variant={1}/>
      <Container>
        <Grid container>
          <Grid
            item
            xs={12}
            md={8.1}
            sx={{ height: "auto", overflowWrap: "break-word", p: 3 }}
          >
            <Typography variant="h4">{service && service.name}</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item sm={12} md={12} sx={{ margin: 6 }}>
            <img src={service && service.img} alt="" srcSet="" />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item sm={6} md={8} sx={{ p: 4 }}>
            {service && service.desc}
          </Grid>
          <Grid
            item
            sm={6}
            md={4}
            sx={{ display: "flex", alignItems: "end", padding: 3 }}
          >
            <Typography variant="h6">costo: ${service && service.price}</Typography>
            <Button
              variant="contained"
              sx={{
                ml: 2,
              }}
            >
              comprar
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};