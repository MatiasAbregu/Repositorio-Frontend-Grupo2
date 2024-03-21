import React, { useEffect, useState } from "react";
import ServiceCard from "../../components/ServiceCard.jsx";
import { Container, Grid } from "@mui/material";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import PackageService from "../../services/PackageService.js";

export const PackagePage = () => {
  
    const [list, setList] = useState([]);

    useEffect(() => {
        PackageService.getAllPackages().then(r => setList(r.data)).catch(e => console.log(e));
    }, [])

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