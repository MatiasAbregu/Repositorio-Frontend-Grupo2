import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { Box, Grid, Typography } from "@mui/material";
import Footer from "../../components/Footer";
import PackageService from "../../services/PackageService";

/**
 * Componente `PackageIdPage` muestra información detallada sobre un paquete específico identificado por su ID.
 * @returns {JSX.Element} Componente PackageIdPage.
 */
export const PackageIdPage = () => {

    // Obtiene el parámetro de ruta `id` del URL usando `useParams`.
    const { id } = useParams();

    /**
   * Estado para almacenar la información del paquete.
   * @type {Object}
   */
    const [packageData, setPackageData] = useState({});
    
    // Efecto para cargar la información del paquete especificado desde su servicio que conecta con la API.
    useEffect(() => {
        PackageService.getPackageById(id).then(res => {
            setPackageData(res.data);
        }
        ).catch(e => console.log(e));

    }, [id])

    return (
        <>
            <Header variant={1} />
            <Box sx={{ backgroundImage: "url(https://images.unsplash.com/photo-1589311836849-4cec35b363cb?q=80&w=1505&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)", backgroundSize: "cover" }}>
                {/* Nombre del paquete */}
                <Grid container>
                    <Grid
                        item
                        xs={12}
                        md={12}
                        sx={{ height: "auto", overflowWrap: "break-word", p: 3 }}
                    >
                        <Typography variant="h3" sx={{ fontFamily: "Protest Revolution" }} align="center">{
                            packageData.packageInfo && packageData.packageInfo.name
                        }</Typography>
                    </Grid>
                </Grid>

                {/* Imagenes de los servicios del paquete */}
                <Grid container>
                    <Grid item sm={12} md={12} sx={{ margin: 3, width: "100%", display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                        {
                            packageData.services && packageData.services.map(s =>
                                <img src={s.img} style={{ width: "45%", height: "450px", borderRadius: 10, filter: "drop-shadow(16px 16px 20px white) invert(10%)" }} alt="" srcSet="" />)
                        }
                    </Grid>
                </Grid>

                {/* Servicios del paquete y precio */}
                <Grid container>
                    <Grid item sm={6} md={6} sx={{ my: 5, ml: 2, mr: 5, p: 4, fontFamily: "Protest Revolution", boxShadow: "0px 1px 10px 5px white", borderRadius: 5, background: "black" }}>
                        <p style={{ padding: 0, margin: 0, fontSize: 22 }}><u>Servicios que trae este paquete:</u></p> <br />
                        {
                            packageData.services && packageData.services.map(s =>
                                <p style={{ padding: 0, margin: "1% 0", fontSize: 22 }}>-•- {s.name}: {s.desc} | Fecha de uso: {s.date}</p>)
                        }
                    </Grid>
                    <Grid
                        item
                        sm={5}
                        md={5}
                        sx={{ display: "flex", alignItems: "center", mt: 18, p: 2, background: "black", boxShadow: "0px 1px 10px 5px white", borderRadius: 5, height: 85 }}
                    >
                        <Typography variant="p" margin={0} sx={{ fontFamily: "Protest Revolution", fontSize: 22 }}>Precio: ${
                            packageData.services && packageData.services.reduce((totalPrice, service) => totalPrice + service.price, 0) * 0.9
                        }</Typography>
                        <Link to={`/purchase/package/${id}`} className="btnPurchase">
                            Comprar
                        </Link>
                    </Grid>
                </Grid>
            </Box>
            <Footer />
        </>
    );
};