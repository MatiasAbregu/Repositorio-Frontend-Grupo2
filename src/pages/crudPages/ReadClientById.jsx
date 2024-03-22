import React, { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { AES, enc } from "crypto-js";
import { jwtDecode } from "jwt-decode";
import { Box, FormControl, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import ClientService from "../../services/ClientService";

/**
 * El componente `ReadClientById` permite a los administradores y empleados ver los detalles de un cliente específico.
 * @returns {JSX.Element} Componente ReadClientById.
 */
export const ReadClientById = () => {

    // Obtener el parámetro de la URL para el ID del cliente
    const { id } = useParams()

    // Efecto para cargar los datos del cliente
    useEffect(() => {
        if (id) {
            ClientService.getClientById(id, AES.decrypt(sessionStorage.getItem('token'), "patito").toString(enc.Utf8)).then(r => {
                document.getElementById("dni").value = r.data.person.dni;
                document.getElementById("firstName").value = r.data.person.firstName;
                document.getElementById("lastName").value = r.data.person.lastName;
                document.getElementById("birthdate").value = r.data.person.birthdate;
                document.getElementById("address").value = r.data.person.address;
                document.getElementById("nationality").value = r.data.person.nationality;
                document.getElementById("email").value = r.data.person.user.email;
                document.getElementById("cellphone").value = r.data.person.user.cellphone;
            }).catch(e => console.log(e));
        }
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
                    <FormControl sx={{ width: "80%", margin: "5% 8%", background: "white", padding: 2, borderRadius: 3, boxShadow: "1px 1px 20px #333" }}>
                        <Typography variant="h5" sx={{ textAlign: "center", color: "black", padding: "1% 0" }}>Ver datos de cliente</Typography>
                        <hr />
                        <Box sx={{ display: "flex", flexWrap: "wrap", margin: "2% 5%", maxWidth: "90%", justifyContent: "center" }} component="form">
                            <TextField
                                id="dni"
                                label="DNI de la persona"
                                variant="filled"
                                type="text"
                                InputProps={{ disableUnderline: true }}
                                InputLabelProps={{ shrink: true }}
                                sx={{
                                    width: "47%",
                                    mr: "1%",
                                    border: "2px solid #CCC",
                                    borderRadius: 2,
                                }}
                            />
                            <TextField
                                id="firstName"
                                label="Nombre"
                                type="text"
                                variant="filled"
                                InputProps={{ disableUnderline: true }}
                                InputLabelProps={{ shrink: true }}
                                sx={{
                                    width: "47%",
                                    height: "0",
                                    ml: "2%",
                                    border: "2px solid #CCC",
                                    borderRadius: 2,
                                }}
                            />
                            <TextField
                                id="lastName"
                                label="Apellido"
                                type="text"
                                variant="filled"
                                InputProps={{ disableUnderline: true }}
                                InputLabelProps={{ shrink: true }}
                                sx={{
                                    width: "47%",
                                    height: "0",
                                    mr: "1%",
                                    mt: "3%",
                                    border: "2px solid #CCC",
                                    borderRadius: 2,
                                }}
                            />
                            <Box sx={{ width: "47%", mt: "3%", ml: "2%", }}>
                                <TextField
                                    id="birthdate"
                                    type="date"
                                    variant="filled"
                                    inputProps={{ style: { paddingTop: "17px", paddingBottom: "16px" } }}
                                    InputLabelProps={{ shrink: true }}
                                    InputProps={{ disableUnderline: true }}
                                    sx={{
                                        border: "2px solid #CCC",
                                        borderRadius: 2,
                                    }}
                                />
                                <p style={{ color: "gray", fontSize: "smaller", marginLeft: 5, marginTop: 1 }}>Introduce la fecha de su nacimiento</p>
                            </Box>
                            <TextField
                                id="address"
                                label="Dirección"
                                type="text"
                                variant="filled"
                                InputProps={{ disableUnderline: true }}
                                InputLabelProps={{ shrink: true }}
                                sx={{
                                    width: "47%",
                                    height: "0",
                                    mr: "2.8%",
                                    mt: "1%",
                                    border: "2px solid #CCC",
                                    borderRadius: 2,
                                }}
                            />
                            <TextField
                                id="nationality"
                                label="Nacionalidad"
                                variant="filled"
                                type="text"
                                InputProps={{ disableUnderline: true }}
                                InputLabelProps={{ shrink: true }}
                                sx={{
                                    width: "47%",
                                    mt: "1%",
                                    height: "0",
                                    border: "2px solid #CCC",
                                    borderRadius: 2,
                                }}
                            />
                            <TextField
                                id="email"
                                label="Email"
                                type="text"
                                variant="filled"
                                InputProps={{ disableUnderline: true }}
                                InputLabelProps={{ shrink: true }}
                                sx={{
                                    width: "47%",
                                    height: "0",
                                    mr: "1%",
                                    mt: "3%",
                                    border: "2px solid #CCC",
                                    borderRadius: 2,
                                }}
                            />
                            <TextField
                                id="cellphone"
                                label="Celular"
                                variant="filled"
                                type="text"
                                InputProps={{ disableUnderline: true }}
                                InputLabelProps={{ shrink: true }}
                                sx={{
                                    width: "47%",
                                    ml: "2%",
                                    mt: "3%",
                                    height: "0",
                                    border: "2px solid #CCC",
                                    borderRadius: 2,
                                }}
                            />
                        </Box>
                    </FormControl>
                    <Footer />
                </>
            );
        } else return window.location.href = "/employee/home";
    } else
        return window.location.href = "/user/login";
}