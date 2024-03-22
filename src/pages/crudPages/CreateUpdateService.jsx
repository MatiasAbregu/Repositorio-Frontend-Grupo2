import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { AES, enc } from "crypto-js";
import { jwtDecode } from "jwt-decode";
import { Alert, Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { serviceValidationYup } from "../../hooks/serviceValidationYup";
import dayjs from "dayjs";
import ServiceConnection from "../../services/ServiceConnection";
import { useParams } from "react-router-dom";

/**
 * El componente `CreateUpdateService` permite a los administradores y empleados crear o actualizar servicios.
 * @returns {JSX.Element} Componente CreateUpdateService.
 */
export const CreateUpdateService = () => {

    // Estado para almacenar el tipo de servicio
    const [typeS, setTypeS] = useState('Hoteles');

    // Estado para almacenar mensajes de registro o actualización exitosa o fallida
    const [log, setLog] = useState("");

    // Estado para el componente de alerta
    const [alertComponent, setAlertComponent] = useState(null);

    // Obtener el ID del servicio de los parámetros de la URL
    const { id } = useParams()

    // React Hook Form para manejar el formulario y la validación
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({ resolver: yupResolver(serviceValidationYup()) });

    // Función para manejar el cambio en el tipo de servicio
    const handleChange = (e) => {
        setTypeS(e.target.value);
        setValue("type", e.target.value, { shouldValidate: true })
    }

    // Función para crear o actualizar un servicio
    const onSubmit = (data) => {
        data.date = dayjs(data.date).format("YYYY-MM-DD");
        let service;

        if (id) {
            service = {
                code: id,
                name: data.name,
                desc: data.desc,
                img: data.img,
                destination: data.destination,
                date: data.date,
                type: data.type,
                price: data.price
            };

            ServiceConnection.updateService(service, id, AES.decrypt(sessionStorage.getItem('token'), "patito").toString(enc.Utf8)).then(r => {
                if (r) {
                    setValue("name", "");
                    setValue("img", "");
                    setValue("destination", "");
                    setTypeS('Hoteles');
                    setValue("type", "Hoteles");
                    setValue("price", "");
                    setValue("desc", "");
                    setLog("Success");
                } else setLog("Failed")
            }).catch(e => console.log(e));
        } else {
            service = {
                name: data.name,
                desc: data.desc,
                img: data.img,
                destination: data.destination,
                date: data.date,
                type: data.type,
                price: data.price
            };

            ServiceConnection.createService(service, AES.decrypt(sessionStorage.getItem('token'), "patito").toString(enc.Utf8)).then(r => {
                if (r.data) {
                    setValue("name", "");
                    setValue("img", "");
                    setValue("destination", "");
                    setTypeS('Hoteles');
                    setValue("type", "Hoteles");
                    setValue("price", "");
                    setValue("desc", "");
                    setLog("Success");
                } else setLog("Failed")
            }).catch(e => console.log(e));
        }
    }

    // Efecto para mostrar alertas después de la creación o actualización exitosa o fallida
    useEffect(() => {
        if (log === "Success") {
            if (id) {
                setAlertComponent(
                    <Alert severity="success" sx={{ width: "96%", mt: 2, '*': {width: "auto"} }}>
                        ¡Servicio actualizado con éxito! Ve a gestión de servicios para visualizarlo.
                    </Alert>
                );
            } else {
                setAlertComponent(
                    <Alert severity="success" sx={{ width: "96%", mt: 2, '*': {width: "auto"} }}>
                        ¡Servicio creado con éxito! Ve a gestión de servicios para visualizarlo.
                    </Alert>
                );
            }
        } else if (log === "Failed") {
            setAlertComponent(
                <Alert severity="error" sx={{ width: "96%", mt: 2, '*': {width: "auto"} }}>
                    ¡Algo salió mal! Vuelve a intentarlo.
                </Alert>
            );
        }

        if (id) {
            ServiceConnection.getServiceById(id).then(r => {
                document.getElementById("name").value = r.data.name;
                setValue("name", r.data.name);
                document.getElementById("img").value = r.data.img;
                setValue("img", r.data.img);
                document.getElementById("destination").value = r.data.destination;
                setValue("destination", r.data.destination);
                setTypeS(r.data.type);
                setValue("type", r.data.type);
                document.getElementById("date").value = r.data.date;
                setValue("date", r.data.date);
                document.getElementById("price").value = r.data.price;
                setValue("price", r.data.price);
                document.getElementById("desc").value = r.data.desc;
                setValue("desc", r.data.desc);
            }).catch(e => console.log(e));
        }

    }, [log]);

    // Verifica si existe un token, sino lo redirecciona a iniciar sesión
    if (sessionStorage.getItem('token')) {
        const token = AES.decrypt(sessionStorage.getItem('token'), "patito");
        const rol = jwtDecode(token.toString(enc.Utf8));

        // Se desencripta y verifica si trae rol "Admin" o "Employee", si no, entonces se lo redirecciona a iniciar sesión
        if (rol.role == "Admin" || rol.role == "Employee") {
            return (
                <>
                    <Header variant={2} />
                    <FormControl sx={{ width: "80%", margin: "5% 8%", background: "white", padding: 2, borderRadius: 3, boxShadow: "1px 1px 20px #333" }}>
                        <Typography variant="h5" sx={{ textAlign: "center", color: "black", padding: "1% 0" }}>{id ? "Actualizar servicio" : "Crear servicio"}</Typography>
                        <hr />
                        <Box sx={{ display: "flex", flexWrap: "wrap", margin: "2% 5%", maxWidth: "90%", justifyContent: "center" }} component="form" onSubmit={handleSubmit(data => onSubmit(data))}>
                            <TextField
                                id="name"
                                label="Nombre del servicio"
                                variant="filled"
                                type="text"
                                {...register("name")}
                                InputProps={{disableUnderline: true}}
                                InputLabelProps={{ shrink: true }}
                                error={errors.name?.message}
                                helperText={errors.name?.message}
                                sx={{
                                    width: "47%",
                                    mr: "1%",
                                    border: "2px solid #CCC",
                                    borderRadius: 2,          
                                }}
                            />
                            <TextField
                                id="img"
                                label="Imagen"
                                type="text"
                                variant="filled"
                                placeholder="Solo url, ej: https://images.unsplash.com/photo-1606663889134-b1dedb5ed8b7?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                {...register("img")}
                                InputProps={{disableUnderline: true}}
                                InputLabelProps={{ shrink: true }}
                                error={errors.img?.message}
                                helperText={errors.img?.message}
                                sx={{
                                    width: "47%",
                                    height: "0",
                                    ml: "2%",
                                    border: "2px solid #CCC",
                                    borderRadius: 2,
                                }}
                            />
                            <TextField
                                id="destination"
                                label="Destino"
                                type="text"
                                variant="filled"
                                {...register("destination")}
                                InputProps={{disableUnderline: true}}
                                InputLabelProps={{ shrink: true }}
                                error={errors.destination?.message}
                                helperText={errors.destination?.message}
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
                                    id="date"
                                    type="date"
                                    variant="filled"
                                    inputProps={{ style: { paddingTop: "17px", paddingBottom: "16px" } }}
                                    {...register("date")}
                                    InputProps={{disableUnderline: true}}
                                    error={errors.date?.message}
                                    helperText={errors.date?.message}
                                    sx={{
                                        border: "2px solid #CCC",
                                        borderRadius: 2,
                                    }}
                                />
                                <p style={{ color: "gray", fontSize: "smaller", marginLeft: 5, marginTop: 1 }}>Introduce una fecha</p>
                            </Box>
                            <FormControl variant="filled" error={errors.type?.message} sx={{
                                width: "47%",
                                mr: "3%",
                                height: "56px",
                                mt: "1%",
                                border: "2px solid #CCC",
                                borderRadius: 2,
                                '& .MuiFilledInput-underline:after': {
                                    borderBottom: 'none', // Desactiva el subrayado
                                },
                                '& .MuiFilledInput-underline:before': {
                                    borderBottom: 'none', // Desactiva el subrayado
                                },
                                '& .MuiFilledInput-underline:hover': {
                                    borderBottom: 'none', // Desactiva el subrayado
                                },
                                '& .MuiFilledInput-underline:hover:before': {
                                    borderBottom: 'none', // Desactiva el subrayado
                                },
                                '& .MuiFilledInput-underline': {
                                    '&:hover:not(.Mui-disabled):before': {
                                        borderBottom: 'none',
                                    },
                                },
                            }}>
                                <InputLabel id="demo-simple-select-filled-label">Tipo de servicio</InputLabel>
                                <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="type"
                                    value={typeS}
                                    onChange={handleChange}
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                maxWidth: "10%"
                                            }
                                        }
                                    }}
                                >
                                    <MenuItem value={"Hoteles"}>Hoteles</MenuItem>
                                    <MenuItem value={"Autos"}>Autos</MenuItem>
                                    <MenuItem value={"Aviones"}>Aviones</MenuItem>
                                    <MenuItem value={"Colectivos"}>Colectivos</MenuItem>
                                    <MenuItem value={"Eventos"}>Eventos</MenuItem>
                                    <MenuItem value={"Trenes"}>Trenes</MenuItem>
                                    <MenuItem value={"Excursiones"}>Excursiones</MenuItem>
                                </Select>
                                <FormHelperText sx={{ width: "90%" }}>{errors.type?.message}</FormHelperText>
                            </FormControl>
                            <TextField
                                id="price"
                                label="Precio"
                                variant="filled"
                                type="text"
                                {...register("price")}
                                InputProps={{disableUnderline: true}}
                                InputLabelProps={{ shrink: true }}
                                error={errors.price?.message}
                                helperText={errors.price?.message}
                                sx={{
                                    width: "47%",
                                    mt: "1%",
                                    height: "0",
                                    border: "2px solid #CCC",
                                    borderRadius: 2,
                                }}
                            />
                            <TextField
                                id="desc"
                                label="Descripción"
                                variant="filled"
                                multiline
                                rows={7}
                                {...register("desc")}
                                InputProps={{disableUnderline: true}}
                                InputLabelProps={{ shrink: true }}
                                error={errors.desc?.message}
                                helperText={errors.desc?.message}
                                sx={{
                                    mt: "3%",
                                    mb: "3%",
                                    border: "2px solid #CCC",
                                    borderRadius: 2,
                                }}
                            />
                            <button style={{ width: "50%", margin: "0 25%" }} className="btnAdd" type="submit">{id ? "Actualizar servicio" : "Crear servicio"}</button>
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