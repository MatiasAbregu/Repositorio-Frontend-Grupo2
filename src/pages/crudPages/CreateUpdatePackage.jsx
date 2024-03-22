import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { AES, enc } from "crypto-js";
import { jwtDecode } from "jwt-decode";
import { Alert, Box, FormControl, List, ListItem, ListItemButton, ListItemText, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ServiceConnection from "../../services/ServiceConnection";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import PackageService from "../../services/PackageService";

/**
 * El componente `CreateUpdatePackages` permite a los administradores y empleados crear o actualizar paquetes.
 * @returns {JSX.Element} Componente CreateUpdatePackages.
 */
export const CreateUpdatePackage = () => {

    // Esquema de validación Yup para el formulario
    const schema = yup.object().shape({
        name: yup.string().required("Debe rellenar este campo."),
    });

    // Estado para actualizar datos.
    const [dataRefresh, setDataRefresh] = useState(true);
    
     // Índice temporal para servicios.
    const [indexTemporal, setIndexTemporal] = useState(1);

    // Estado para almacenar servicios.
    const [dataServices, setDataServices] = useState([]);

    // Estado para almacenar el paquete.
    const [dataPackage, setDataPackage] = useState([]);

    // Estado para almacenar mensajes de registro o actualización exitosa o fallida
    const [log, setLog] = useState("");

    // Estado para el componente de alerta
    const [alertComponent, setAlertComponent] = useState(null);

    // Estado para almacenar mensajes de registro o actualización exitosa o fallida
    const { id } = useParams()

    // React Hook Form para manejar el formulario y la validación
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    // Función para crear o actualizar un paquete
    const onSubmit = (data) => {
        if (dataPackage.length < 2) return setLog("Fill");
        else { setLog(""); setAlertComponent(null); }

        let packageWithServices;
        let services = dataPackage.map(({ indexTemporal, ...rest }) => rest);
        services = services.map(({ id, ...rest }) => ({ code: id, ...rest }));

        if (id) {
            packageWithServices = {
                packageInfo: {
                    code: id,
                    name: data.name
                },
                services: services
            };

            console.log(packageWithServices);

            PackageService.updatePackage(id, packageWithServices, AES.decrypt(sessionStorage.getItem('token'), "patito").toString(enc.Utf8)).then(r => {
                if (r) {
                    setLog("Success");
                } else setLog("Failed")
            }).catch(e => console.log(e));
        } else {
            packageWithServices = {
                packageInfo: {
                    name: data.name
                },
                services: services
            };

            PackageService.createPackage(packageWithServices, AES.decrypt(sessionStorage.getItem('token'), "patito").toString(enc.Utf8)).then(r => {
                if (r.data) {
                    setValue("name", "");
                    setDataPackage([]);
                    setLog("Success");
                } else setLog("Failed")
            }).catch(e => console.log(e));
        }
    }

    // Función para cargar los servicios
    const loadServices = () => {
        ServiceConnection.getAllServicesDetailed(AES.decrypt(sessionStorage.getItem('token'), "patito").toString(enc.Utf8))
            .then(r => setDataServices(r.data));
    }

    // Efecto para mostrar alertas después de la creación o actualización exitosa o fallida y cargar servicios
    useEffect(() => {
        if (dataRefresh) {
            loadServices();
            if (id) {
                PackageService.getPackageById(id).then(r => {
                    setValue("name", r.data.packageInfo.name);
                    setDataPackage(r.data.services)
                }).catch(e => console.log(e));
            }
            setDataRefresh(false);
        }

        if (log === "Success") {
            if (id) {
                setAlertComponent(
                    <Alert severity="success" sx={{ width: "96%", mt: 2, '*': { width: "auto" } }}>
                        ¡Paquete actualizado con éxito! Ve a gestión de paquetes para visualizarlo.
                    </Alert>
                );
            } else {
                setAlertComponent(
                    <Alert severity="success" sx={{ width: "96%", mt: 2, '*': { width: "auto" } }}>
                        ¡Paquete creado con éxito! Ve a gestión de paquetes para visualizarlo.
                    </Alert>
                );
            }
        } else if (log === "Failed") {
            setAlertComponent(
                <Alert severity="error" sx={{ width: "96%", mt: 2, '*': { width: "auto" } }}>
                    ¡Algo salió mal! Vuelve a intentarlo.
                </Alert>
            );
        } else if (log === "Fill") {
            setAlertComponent(
                <Alert severity="error" sx={{ width: "96%", mt: 2, '*': { width: "auto" } }}>
                    ¡Debe haber por lo menos 2 servicios antes de continuar! Si deseas eliminar el paquete puedes hacerlo desde "Gestión de paquetes".
                </Alert>
            );
        }

    }, [log]);

    // Añade servicios al paquete
    const addService = (id, name) => {
        setIndexTemporal(indexTemporal + 1);
        const services = [...dataPackage, { indexTemporal, id, name }];
        setDataPackage(services);
        setDataRefresh(true);
    }

    // Elimina servicios del paquete
    const removeService = (index) => {
        if (id) {
            const newDataPackage = dataPackage.filter(service => service.idSxP !== index);
            setDataPackage(newDataPackage);
        } else {
            const newDataPackage = dataPackage.filter(service => service.indexTemporal !== index);
            setDataPackage(newDataPackage);
        }
        setDataRefresh(true);
    }

    // Verifica si existe un token, sino lo redirecciona a iniciar sesión
    if (sessionStorage.getItem('token')) {
        const token = AES.decrypt(sessionStorage.getItem('token'), "patito");
        const rol = jwtDecode(token.toString(enc.Utf8));

        // Se desencripta y verifica si trae rol "Admin" o "Employee", si no, entonces se lo redirecciona a iniciar sesión
        if (rol.role == "Admin" || rol.role == "Employee") {
            return (
                <>
                    <Header variant={2} />
                    <FormControl sx={{ position: "none", width: "80%", margin: "5% 8%", background: "white", padding: 2, borderRadius: 3, boxShadow: "1px 1px 20px #333" }}>
                        <Alert severity="info" sx={{ width: "96%", mt: 2, mb: 1, '*': { width: "auto" } }}>
                            ¡Para poder agregar servicios al paquete has click en la lista de la derecha y automáticamente pasaran a la lista de la izquierda dónde luego de pulsar el boton se guardarán! En caso de querer eliminar un servicio del paquete basta con hacer click sobre el servicio a eliminar de la lista de la izquierda.
                        </Alert>
                        <Typography variant="h5" sx={{ textAlign: "center", color: "black", padding: "1% 0" }}>{id ? "Actualizar paquete" : "Crear paquete"}</Typography>
                        <hr />
                        <Box sx={{ display: "flex", flexWrap: "wrap", margin: "2% 5%", maxWidth: "90%", justifyContent: "center" }} component="form" onSubmit={handleSubmit(data => onSubmit(data))}>
                            <Box width={"40%"} sx={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "0 5%" }}>
                                <Typography component="h2" color="black">Datos del paquete:</Typography>
                                <hr />
                                <TextField
                                    id="name"
                                    label="Nombre del paquete"
                                    variant="filled"
                                    type="text"
                                    {...register("name")}
                                    InputProps={{ disableUnderline: true }}
                                    InputLabelProps={{ shrink: true }}
                                    error={errors.name?.message}
                                    helperText={errors.name?.message}
                                    sx={{
                                        width: "100%",
                                        mr: "1%",
                                        border: "2px solid #CCC",
                                        borderRadius: 2,
                                    }}
                                />
                                <Typography component="h2" mt={2} color="black">Aquí se mostrarán los servicios del paquete:</Typography>
                                <hr />
                                <List sx={{ color: "black", maxHeight: 380, overflowY: "scroll" }}>
                                    {dataPackage.map(d => (
                                        d.indexTemporal ? (
                                            <ListItem key={d.indexTemporal} disablePadding sx={{ border: "2px solid #CCC", borderRadius: 2, marginBottom: "1px" }}>
                                                <ListItemButton component="button" sx={{
                                                    "&:focus": {
                                                        outline: "none",
                                                    },
                                                    "&:focus-visible": {
                                                        outline: "none",
                                                    },
                                                }} onClick={() => removeService(d.indexTemporal)}>
                                                    <ListItemText primary={d.name} />
                                                </ListItemButton>
                                            </ListItem>
                                        ) : (
                                            <ListItem key={d.idSxP} disablePadding sx={{ border: "2px solid #CCC", borderRadius: 2, marginBottom: "1px" }}>
                                                <ListItemButton component="button" sx={{
                                                    "&:focus": {
                                                        outline: "none",
                                                    },
                                                    "&:focus-visible": {
                                                        outline: "none",
                                                    },
                                                }} onClick={() => removeService(d.idSxP)}>
                                                    <ListItemText primary={d.name} />
                                                </ListItemButton>
                                            </ListItem>
                                        )
                                    ))}
                                </List>
                            </Box>
                            <Box width={"40%"} sx={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "0 5%" }}>
                                <Typography component="h2" color="black">Lista de los servicios:</Typography>
                                <hr />
                                <List sx={{ color: "black", maxHeight: 500, overflowY: "scroll" }}>
                                    {dataServices.map(d => (
                                        <ListItem key={d.code} disablePadding sx={{ border: "2px solid #CCC", borderRadius: 2, marginBottom: "1px" }}>
                                            <ListItemButton component="button" sx={{
                                                "&:focus": {
                                                    outline: "none",
                                                },
                                                "&:focus-visible": {
                                                    outline: "none",
                                                },
                                            }} onClick={() => addService(d.code, d.name)}>
                                                <ListItemText primary={d.name} />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                            <button style={{ width: "50%", margin: "3% 25% 0 25%" }} className="btnAdd" type="submit">{id ? "Actualizar paquete" : "Crear paquete"}</button>
                        </Box>
                        {alertComponent}
                    </FormControl>
                    <Footer />
                </>
            );
        } else return window.location.href = "/user/login";
    } else
        return window.location.href = "/user/login";
}