import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { Button, Container, Grid, Typography } from "@mui/material";
import Footer from "../../components/Footer";
import PackageService from "../../services/PackageService";

export const PackageIdPage = () => {

    const { id } = useParams();
    const [packageData, setPackageData] = useState({});

    useEffect(() => {
        PackageService.getPackageById(id).then(res => {
            setPackageData(res.data);
        }
        ).catch(e => console.log(e));

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
                        <Typography variant="h3">{
                            packageData.packageInfo && packageData.packageInfo.name
                        }</Typography>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item sm={12} md={12} sx={{ margin: 3, width: "100%", display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                        {
                            packageData.services && packageData.services.map(s => <img src={s.img} style={{ width: "50%", height: "400px" }} alt="" srcSet="" />)
                        }
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item sm={6} md={8} sx={{ p: 2, mb: 8 }}>
                        Servicios que trae este paquete:
                        {
                            packageData.services && packageData.services.map(s => <p>-{s.name}: {s.desc}</p>)
                        }
                    </Grid>
                    <Grid
                        item
                        sm={6}
                        md={4}
                        sx={{ display: "flex", alignItems: "center", padding: 3 , mt: 15}}
                    >
                        <Typography variant="h6">Precio: ${
                            packageData.services && packageData.services.reduce((totalPrice, service) => totalPrice + service.price, 0) * 0.9
                        }</Typography>
                        <Link to={`/purchase/package/${id}`} className="btnPurchase">
                            Comprar
                        </Link>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
};