import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import Footer from "../../components/Footer";
import { AES, enc } from "crypto-js";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import ClientService from "../../services/ClientService";

export const ReadClient = () => {
    const [data, setData] = useState([]);

    const listOfClients = () => {
        ClientService.getAllClients(AES.decrypt(sessionStorage.getItem('token'), "patito").toString(enc.Utf8)).then(res => {
            setData(res.data)
        }).catch(e => console.log(e));
    }

    useEffect(() => {
        listOfClients();
    }, []);

    if (sessionStorage.getItem('token')) {
        const token = AES.decrypt(sessionStorage.getItem('token'), "patito");
        const rol = jwtDecode(token.toString(enc.Utf8));

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