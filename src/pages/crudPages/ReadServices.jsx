import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import Footer from "../../components/Footer";
import { AES, enc } from "crypto-js";
import { jwtDecode } from "jwt-decode";
import ServiceConnection from '../../services/ServiceConnection';
import { Link } from "react-router-dom";

/**
 * El componente `ReadServices` permite a los administradores y empleados ver y gestionar los servicios disponibles.
 * @returns {JSX.Element} Componente ReadServices.
 */
export const ReadServices = () => {

  // Estado para almacenar los datos de los servicios
  const [data, setData] = useState([]);

  // Estado para almacenar los datos filtrados
  const [dataFilter, setDataFilter] = useState([]);

  // Estado para almacenar el dato a buscar en el buscador
  const [searchValue, setSearchValue] = useState('');

  // Función para eliminar un servicio por id
  const deleteService = (id) => {
    ServiceConnection.deleteService(id, AES.decrypt(sessionStorage.getItem('token'), "patito").toString(enc.Utf8)).then(r => listOfServices()).catch(e => console.log(e));
  }

  // Función para cambiar el estado del "searchValue"
  const handleChange = (event) => setSearchValue(event.target.value);

  // Función para filtrar por el valor de searchValue
  const filterService = () => setDataFilter(data.filter((service) => service.name.includes(searchValue)));

  // Función para obtener la lista de servicios
  const listOfServices = () => {
    ServiceConnection.getAllServicesDetailed(AES.decrypt(sessionStorage.getItem('token'), "patito").toString(enc.Utf8)).then(res => {
      setData(res.data)
    }).catch(e => console.log(e));
  }

  // Cargar la lista de servicios
  useEffect(() => {
    listOfServices();
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
                <i>Filtrar por nombre:</i>
              </Typography>
              <TextField sx={{ mr: 3, mb: 1, width: "50%", border: "1px solid #222", borderRadius: 2 }} 
              onChange={handleChange} value={searchValue} label="Nombre" variant="filled" InputLabelProps={{ shrink: true }} InputProps={{ disableUnderline: true }} />
              <button style={{ height: "auto", width: "10%", marginLeft: "20px", backgroundColor: "#333333" }} onClick={() => filterService()} > Filtrar </button>
              <button style={{ height: "auto", width: "10%", marginLeft: 10, backgroundColor: "#333333" }} onClick={() => setDataFilter([])}> Recagar </button>
            </Box>
            <button className="btnAdd" onClick={() => { window.location.href = "/employee/create-service" }}>Agregar servicio</button>
            <TableContainer sx={{ maxHeight: 550 }}>
              <Table stickyHeader sx={{ minWidth: 660 }}>
                <TableHead style={{ position: "sticky" }}>
                  <TableRow>
                    <TableCell sx={{ background: "#333", color: "white", textAlign: "center" }}>Código</TableCell>
                    <TableCell sx={{ background: "#333", color: "white", textAlign: "center" }}>Nombre</TableCell>
                    <TableCell sx={{ background: "#333", color: "white", textAlign: "center" }}>Descripción</TableCell>
                    <TableCell sx={{ background: "#333", color: "white", textAlign: "center" }}>Imagen</TableCell>
                    <TableCell sx={{ background: "#333", color: "white", textAlign: "center" }}>Destino</TableCell>
                    <TableCell sx={{ background: "#333", color: "white", textAlign: "center" }}>Fecha</TableCell>
                    <TableCell sx={{ background: "#333", color: "white", textAlign: "center" }}>Tipo de servicio</TableCell>
                    <TableCell sx={{ background: "#333", color: "white", textAlign: "center" }}>Precio</TableCell>
                    <TableCell sx={{ background: "#333", color: "white", textAlign: "center" }}>Funcionalidades</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataFilter && dataFilter.length > 0 ? dataFilter.map((row) => (
                    <TableRow key={row.code}>
                      <TableCell align="center" sx={{ background: "#FFF", color: "black", border: "1px solid #BBB", maxWidth: 10 }}> {row.code} </TableCell>
                      <TableCell align="center" sx={{ background: "#FFF", color: "black", border: "1px solid #BBB", minWidth: 200 }}>{row.name}</TableCell>
                      <TableCell align="center" sx={{ background: "#FFF", color: "black", border: "1px solid #BBB", minWidth: 300 }}>{row.desc}</TableCell>
                      <TableCell align="center" sx={{ background: "#FFF", color: "black", overflowX: "auto", border: "1px solid #BBB", maxWidth: 400 }}>{row.img}</TableCell>
                      <TableCell align="center" sx={{ background: "#FFF", color: "black", border: "1px solid #BBB", minWidth: 120 }}>{row.destination}</TableCell>
                      <TableCell align="center" sx={{ background: "#FFF", color: "black", border: "1px solid #BBB", minWidth: 120 }}>{row.date}</TableCell>
                      <TableCell align="center" sx={{ background: "#FFF", color: "black", border: "1px solid #BBB", minWidth: 110 }}>{row.type}</TableCell>
                      <TableCell align="center" sx={{ background: "#FFF", color: "black", border: "1px solid #BBB", minWidth: 120 }}>${row.price}</TableCell>
                      <TableCell sx={{ background: "#FFF", border: "1px solid #BBB" }}>
                        <Link to={`/employee/update-service/${row.code}`} className="btnModify">Modificar</Link>
                        <button className="btnDelete" onClick={() => deleteService(row.code)}>Eliminar</button>
                      </TableCell>
                    </TableRow>
                  )) : 
                  data.map((row) => (
                    <TableRow key={row.code}>
                      <TableCell align="center" sx={{ background: "#FFF", color: "black", border: "1px solid #BBB", maxWidth: 10 }}> {row.code} </TableCell>
                      <TableCell align="center" sx={{ background: "#FFF", color: "black", border: "1px solid #BBB", minWidth: 200 }}>{row.name}</TableCell>
                      <TableCell align="center" sx={{ background: "#FFF", color: "black", border: "1px solid #BBB", minWidth: 300 }}>{row.desc}</TableCell>
                      <TableCell align="center" sx={{ background: "#FFF", color: "black", overflowX: "auto", border: "1px solid #BBB", maxWidth: 400 }}>{row.img}</TableCell>
                      <TableCell align="center" sx={{ background: "#FFF", color: "black", border: "1px solid #BBB", minWidth: 120 }}>{row.destination}</TableCell>
                      <TableCell align="center" sx={{ background: "#FFF", color: "black", border: "1px solid #BBB", minWidth: 120 }}>{row.date}</TableCell>
                      <TableCell align="center" sx={{ background: "#FFF", color: "black", border: "1px solid #BBB", minWidth: 110 }}>{row.type}</TableCell>
                      <TableCell align="center" sx={{ background: "#FFF", color: "black", border: "1px solid #BBB", minWidth: 120 }}>${row.price}</TableCell>
                      <TableCell sx={{ background: "#FFF", border: "1px solid #BBB" }}>
                        <Link to={`/employee/update-service/${row.code}`} className="btnModify">Modificar</Link>
                        <button className="btnDelete" onClick={() => deleteService(row.code)}>Eliminar</button>
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