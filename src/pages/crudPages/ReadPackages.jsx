import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Alert, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import Footer from "../../components/Footer";
import { AES, enc } from "crypto-js";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import PackageService from "../../services/PackageService";

/**
 * El componente `ReadPackages` permite a los administradores y empleados ver y gestionar los paquetes.
 * @returns {JSX.Element} Componente ReadPackages.
 */
export const ReadPackages = () => {

    // Estado para almacenar los datos de los paquetes
    const [data, setData] = useState([]);

    // Estado para almacenar los datos filtrados
    const [dataFilter, setDataFilter] = useState([]);

    // Estado para almacenar el dato a buscar en el buscador
    const [searchValue, setSearchValue] = useState('');

    // Función para cambiar el estado del "searchValue"
    const handleChange = (event) => setSearchValue(event.target.value);

    // Función para filtrar por el valor de searchValue
    const filterService = () => setDataFilter(data.filter((packageData) => packageData.packageInfo.name.includes(searchValue)));

    // Función para eliminar un paquete por ID
    const deletePackage = (id) => {
        PackageService.deletePackage(id, AES.decrypt(sessionStorage.getItem('token'), "patito").toString(enc.Utf8)).then(r => listOfPackages()).catch(e => console.log(e));
    }

    // Función para obtener la lista de paquetes
    const listOfPackages = () => {
        PackageService.getAllPackages().then(res => {
            setData(res.data)
        }).catch(e => console.log(e));
    }

    // Cargar la lista de paquetes
    useEffect(() => {
        listOfPackages();
    }, []);

    // Verificar si hay un token de sesión activo
    if (sessionStorage.getItem('token')) {
        const token = AES.decrypt(sessionStorage.getItem('token'), "patito");
        const rol = jwtDecode(token.toString(enc.Utf8));

        // Se desencripta y verifica si trae rol "Admin" o "Employee", si no, entonces se lo redirecciona a iniciar sesión
        if (rol.role == "Admin" || rol.role == "Employee") {
            return (
                <>
                    <Header variant={2} />
                    <Paper sx={{ width: '98%', overflow: 'hidden', margin: "1% 1%", background: "transparent", boxShadow: "none" }}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexWrap: "nowrap",
                                p: 1
                            }}
                        >
                            <Typography component={"p"} sx={{
                                textAlign: "center", width: "10%", display: "flex",
                                alignContent: "center",
                                justifyContent: "center",
                            }}>
                                <i>Filtrar por nombre de paquete:</i>
                            </Typography>
                            <TextField sx={{ mr: 3, mb: 1, width: "50%", border: "1px solid #222", borderRadius: 2 }}
                                onChange={handleChange} value={searchValue} label="Nombre" variant="filled" InputLabelProps={{ shrink: true }} InputProps={{ disableUnderline: true }} />
                            <button style={{ height: "auto", width: "10%", marginLeft: "20px", backgroundColor: "#333333" }} onClick={() => filterService()} > Filtrar </button>
                            <button style={{ height: "auto", width: "10%", marginLeft: 10, backgroundColor: "#333333" }} onClick={() => setDataFilter([])}> Recagar </button>
                        </Box>
                        <Alert severity="warning" sx={{ width: "96%", mt: 2, mb: 1, '*': { width: "auto" } }}>
                            ¡Atención! El precio del paquete es la suma de los precios de los servicios menos un 10%.
                        </Alert>
                        <button className="btnAdd" onClick={() => { window.location.href = "/employee/create-package" }}>Agregar paquete</button>
                        <TableContainer sx={{ maxHeight: 550 }}>
                            <Table stickyHeader sx={{ minWidth: 660 }}>
                                <TableHead style={{ position: "sticky" }}>
                                    <TableRow>
                                        <TableCell sx={{ background: "#333", color: "white", textAlign: "center" }}>Código</TableCell>
                                        <TableCell sx={{ background: "#333", color: "white", textAlign: "center" }}>Nombre</TableCell>
                                        <TableCell sx={{ background: "#333", color: "white", textAlign: "center" }}>Servicios</TableCell>
                                        <TableCell sx={{ background: "#333", color: "white", textAlign: "center" }}>Precio</TableCell>
                                        <TableCell sx={{ background: "#333", color: "white", textAlign: "center" }}>Funcionalidades</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dataFilter && dataFilter.length > 0 ? 
                                    dataFilter.map((row) => (
                                        <TableRow key={row.packageInfo.code}>
                                            <TableCell align="center" sx={{ background: "#FFF", color: "black", border: "1px solid #BBB", maxWidth: 10 }}>
                                                {row.packageInfo.code}
                                            </TableCell>
                                            <TableCell align="center" sx={{ background: "#FFF", color: "black", border: "1px solid #BBB", minWidth: 300 }}>
                                                {row.packageInfo.name}
                                            </TableCell>
                                            <TableCell align="center" sx={{ background: "#FFF", color: "black", border: "1px solid #BBB", minWidth: 300 }}>
                                                {row.services.map(d => (
                                                    <>
                                                        <p>{d.name}</p>
                                                    </>
                                                ))}
                                            </TableCell>
                                            <TableCell align="center" sx={{ background: "#FFF", color: "black", border: "1px solid #BBB", minWidth: 200 }}>$
                                                {
                                                    row.services.reduce((totalPrice, service) => totalPrice + service.price, 0) * 0.9
                                                }
                                            </TableCell>
                                            <TableCell sx={{ background: "#FFF", border: "1px solid #BBB", minWidth: 200 }}>
                                                <Link to={`/employee/update-package/${row.packageInfo.code}`} className="btnModify" style={{ padding: "3% 34%" }}>Modificar</Link>
                                                <button className="btnDelete" style={{ marginTop: 15 }} onClick={() => deletePackage(row.packageInfo.code)}>Eliminar</button>
                                            </TableCell>
                                        </TableRow>
                                    )): 
                                    data.map((row) => (
                                        <TableRow key={row.packageInfo.code}>
                                            <TableCell align="center" sx={{ background: "#FFF", color: "black", border: "1px solid #BBB", maxWidth: 10 }}>
                                                {row.packageInfo.code}
                                            </TableCell>
                                            <TableCell align="center" sx={{ background: "#FFF", color: "black", border: "1px solid #BBB", minWidth: 300 }}>
                                                {row.packageInfo.name}
                                            </TableCell>
                                            <TableCell align="center" sx={{ background: "#FFF", color: "black", border: "1px solid #BBB", minWidth: 300 }}>
                                                {row.services.map(d => (
                                                    <>
                                                        <p>{d.name}</p>
                                                    </>
                                                ))}
                                            </TableCell>
                                            <TableCell align="center" sx={{ background: "#FFF", color: "black", border: "1px solid #BBB", minWidth: 200 }}>$
                                                {
                                                    row.services.reduce((totalPrice, service) => totalPrice + service.price, 0) * 0.9
                                                }
                                            </TableCell>
                                            <TableCell sx={{ background: "#FFF", border: "1px solid #BBB", minWidth: 200 }}>
                                                <Link to={`/employee/update-package/${row.packageInfo.code}`} className="btnModify" style={{ padding: "3% 34%" }}>Modificar</Link>
                                                <button className="btnDelete" style={{ marginTop: 15 }} onClick={() => deletePackage(row.packageInfo.code)}>Eliminar</button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                    <Footer />
                </>
            );
        } else return window.location.href = "/user/login";
    } else
        return window.location.href = "/user/login";
};