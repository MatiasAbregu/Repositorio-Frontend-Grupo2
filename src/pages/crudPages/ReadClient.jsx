import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import Footer from "../../components/Footer";
import { AES, enc } from "crypto-js";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import ClientService from "../../services/ClientService";

/**
 * El componente `ReadClient` permite a los administradores y empleados ver la lista de clientes registrados.
 * @returns {JSX.Element} Componente ReadClient.
 */
export const ReadClient = () => {

    // Estado para almacenar los datos de los clientes
    const [data, setData] = useState([]);

    // Función para obtener la lista de clientes
    const listOfClients = () => {
        ClientService.getAllClients(AES.decrypt(sessionStorage.getItem('token'), "patito").toString(enc.Utf8)).then(res => {
            setData(res.data)
        }).catch(e => console.log(e));
    }

    // Cargar la lista de clientes
    useEffect(() => {
        listOfClients();
    }, []);

    // Verifica si existe un token, sino lo redirecciona a iniciar sesión
    if (sessionStorage.getItem('token')) {
        const token = AES.decrypt(sessionStorage.getItem('token'), "patito");
        const rol = jwtDecode(token.toString(enc.Utf8));

        // Se desencripta y verifica si trae rol "Admin" o "Employee", si no, entonces se lo redirecciona a iniciar sesión
        if (rol.role == "Admin" || rol.role == "Employee") {
            return (
                <>
                    <Header variant={2} />
                    <Paper sx={{ width: '98%', overflow: 'hidden', margin: "1% 1%", background: "transparent", boxShadow: "none" }}>
                        <TableContainer sx={{ maxHeight: 550 }}>
                            <Table stickyHeader sx={{ minWidth: 660 }}>
                                <TableHead style={{ position: "sticky" }}>
                                    <TableRow>
                                        <TableCell sx={{ background: "#333", color: "white", textAlign: "center" }}>Código</TableCell>
                                        <TableCell sx={{ background: "#333", color: "white", textAlign: "center" }}>DNI</TableCell>
                                        <TableCell sx={{ background: "#333", color: "white", textAlign: "center" }}>Nombre</TableCell>
                                        <TableCell sx={{ background: "#333", color: "white", textAlign: "center" }}>Apellido</TableCell>
                                        <TableCell sx={{ background: "#333", color: "white", textAlign: "center" }}>Nacionalidad</TableCell>
                                        <TableCell sx={{ background: "#333", color: "white", textAlign: "center" }}>Email</TableCell>
                                        <TableCell sx={{ background: "#333", color: "white", textAlign: "center" }}>Celular</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((row) => (
                                        <TableRow key={row.code}>
                                            <TableCell align="center" sx={{ background: "#FFF", color: "black", border: "1px solid #BBB", maxWidth: 10 }}> {row.code} </TableCell>
                                            <TableCell align="center" sx={{ background: "#FFF", color: "black", border: "1px solid #BBB", minWidth: 150 }}>
                                                <Link to={`/employee/clients/${row.code}`}>
                                                    {row.person.dni}
                                                </Link>
                                            </TableCell>
                                            <TableCell align="center" sx={{ background: "#FFF", color: "black", border: "1px solid #BBB", minWidth: 150 }}>
                                                {row.person.firstName}
                                            </TableCell>
                                            <TableCell align="center" sx={{ background: "#FFF", color: "black", overflowX: "auto", border: "1px solid #BBB", minWidth: 150 }}>
                                                {row.person.lastName}
                                            </TableCell>
                                            <TableCell align="center" sx={{ background: "#FFF", color: "black", border: "1px solid #BBB", minWidth: 150 }}>
                                                {row.person.nationality}
                                            </TableCell>
                                            <TableCell align="center" sx={{ background: "#FFF", color: "black", border: "1px solid #BBB", minWidth: 150 }}>
                                                {row.person.user && row.person.user.email}
                                            </TableCell>
                                            <TableCell align="center" sx={{ background: "#FFF", color: "black", border: "1px solid #BBB", minWidth: 150 }}>
                                                {row.person.user && row.person.user.cellphone}
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