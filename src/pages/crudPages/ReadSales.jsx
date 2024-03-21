import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import Footer from "../../components/Footer";
import { AES, enc } from "crypto-js";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import SalesService from "../../services/SalesService";

export const ReadSales = () => {
    const [data, setData] = useState([]);

    const deleteSale = (id) => {
        SalesService.deleteSale(id, AES.decrypt(sessionStorage.getItem('token'), "patito").toString(enc.Utf8)).then(r => listOfServices()).catch(e => console.log(e));
    }

    const listOfSales = () => {
        SalesService.getAllSales(AES.decrypt(sessionStorage.getItem('token'), "patito").toString(enc.Utf8)).then(res => {
            setData(res.data)
        }).catch(e => console.log(e));
    }

    useEffect(() => {
        listOfSales();
    }, []);

    if (sessionStorage.getItem('token')) {
        const token = AES.decrypt(sessionStorage.getItem('token'), "patito");
        const rol = jwtDecode(token.toString(enc.Utf8));

        if (rol.role == "Admin" || rol.role == "Employee") {
            return (
                <>
                    <Header variant={2} />
                    <Paper sx={{ width: '98%', overflow: 'hidden', margin: "1% 1%", background: "transparent", boxShadow: "none" }}>
                        <button className="btnAdd" onClick={() => { window.location.href = "/employee/create-sale" }}>Agregar venta</button>
                        <TableContainer sx={{ maxHeight: 550 }}>
                            <Table stickyHeader sx={{ minWidth: 660 }}>
                                <TableHead style={{ position: "sticky" }}>
                                    <TableRow>
                                        <TableCell sx={{ background: "#333", color: "white", textAlign: "center" }}>Código</TableCell>
                                        <TableCell sx={{ background: "#333", color: "white", textAlign: "center" }}>Fecha</TableCell>
                                        <TableCell sx={{ background: "#333", color: "white", textAlign: "center" }}>Método de pago</TableCell>
                                        <TableCell sx={{ background: "#333", color: "white", textAlign: "center" }}>Cliente</TableCell>
                                        <TableCell sx={{ background: "#333", color: "white", textAlign: "center" }}>Servicio/Paquete</TableCell>
                                        <TableCell sx={{ background: "#333", color: "white", textAlign: "center" }}>Empleado</TableCell>
                                        <TableCell sx={{ background: "#333", color: "white", textAlign: "center" }}>Funcionalidades</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((row) => (
                                        <TableRow key={row.code}>
                                            <TableCell align="center" sx={{ background: "#FFF", color: "black", border: "1px solid #BBB", maxWidth: 10 }}> {row.code} </TableCell>
                                            <TableCell align="center" sx={{ background: "#FFF", color: "black", border: "1px solid #BBB", minWidth: 100 }}>{row.date}</TableCell>
                                            <TableCell align="center" sx={{ background: "#FFF", color: "black", border: "1px solid #BBB", minWidth: 200 }}>{row.payment}</TableCell>
                                            <TableCell align="center" sx={{ background: "#FFF", color: "black", overflowX: "auto", border: "1px solid #BBB", minWidth: 200 }}>
                                                <Link to={`/employee/clients/${row.client.code}`}>DNI: {row.client.person.dni}</Link> <br />
                                                {row.client.person.firstName} {row.client.person.lastName}
                                            </TableCell>
                                            <TableCell align="center" sx={{ background: "#FFF", color: "black", border: "1px solid #BBB", minWidth: 200 }}>
                                                {
                                                row.service ? 
                                                `${row.service.name} (Servicio)` : 
                                                `${row.packageName.name} (Paquete)`
                                                }
                                            </TableCell>
                                            <TableCell align="center" sx={{ background: "#FFF", color: "black", border: "1px solid #BBB", minWidth: 200 }}>
                                                <Link to={`/employee/update-employee/${row.employee.code}`}>ID de empleado: {row.employee.person.dni}</Link> <br />
                                                {row.employee.person.firstName} {row.employee.person.lastName}
                                            </TableCell>
                                            <TableCell sx={{ background: "#FFF", border: "1px solid #BBB" }}>
                                                <Link to={`/employee/update-sale/${row.code}`} className="btnModify">Modificar</Link>
                                                <button className="btnDelete" onClick={() => deleteSale(row.code)}>Eliminar</button>
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