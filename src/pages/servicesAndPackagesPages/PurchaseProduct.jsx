import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { AES, enc } from "crypto-js";
import { jwtDecode } from "jwt-decode";
import { Alert, Box, FormControl, FormHelperText, InputLabel, List, ListItemButton, ListItemText, MenuItem, Select, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import dayjs from "dayjs";
import ServiceConnection from "../../services/ServiceConnection";
import { useParams } from "react-router-dom";
import EmployeeService from "../../services/EmployeeService";
import PackageService from "../../services/PackageService";
import SalesService from "../../services/SalesService";

/**
 * El componente `PurchaseProduct` permite al usuario comprar un servicio o un paquete.
 * @param {string} typeProduct - El tipo de producto a comprar ('service' o 'package') para cargar una u otra información.
 * @returns {JSX.Element} Componente PurchaseProduct.
 */
export const PurchaseProduct = ({ typeProduct }) => {

    // Esquema de validación YUP para el formulario de compra
    const schema = yup.object().shape({
        payment: yup.string().oneOf(["Efectivo", "Tarjeta de Crédito", "Tarjeta de Dédito", "Monedero Virtual", "Transeferencia"], "Por favor selecciona uno de los tipos existentes.").default("Efectivo").required('Selecciona unn método de pago antes de continuar.'),
        date: yup.date().required("Debes seleccionar una fecha.").typeError("Debe ser una fecha válida."),
    });

     // Estado para el método de pago seleccionado
    const [paymentMethod, setPaymentMethod] = useState('Efectivo');

     // Estado para mensajes de alertas
    const [log, setLog] = useState("");
    const [alertComponent, setAlertComponent] = useState(null);

    // Obtener el ID del producto de los parámetros de la URL
    const { id } = useParams();

    // Todas las métodos de YUP a usar + Hook useForm para validar
    const { handleSubmit, setValue, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    // Estado para almacenar los empleados
    const [dataE, setDataE] = useState([]);

    // Estado para el empleado seleccionado
    const [selectedEmployee, setSelectedEmployee] = useState(0);

     // Estado para almacenar los datos del producto a comprar
    const [dataToBuy, setDataToBuy] = useState([]);

    // Función para manejar la selección de empleados
    const handleListEmployees = (event, id) => setSelectedEmployee(id);

    // Función para manejar cambios en el método de pago
    const handleChange = (e) => {
        setPaymentMethod(e.target.value);
        setValue("payment", e.target.value, { shouldValidate: true });
    }

    // Función dónde se registrará en la API la venta realizada
    const onSubmit = (data) => {
        if (selectedEmployee === 0) return setLog("Fill");
        else { setLog(""); setAlertComponent(null); }

        data.date = dayjs(data.date).format("YYYY-MM-DD");
        let sale;
        const dni = jwtDecode(AES.decrypt(sessionStorage.getItem('token'), "patito").toString(enc.Utf8));

        if (typeProduct == "service") {
            sale = {
                date: data.date,
                payment: data.payment,
                client: {
                    person: {
                        dni: dni.dni
                    },
                },
                service: {
                    code: dataToBuy.code
                },
                employee: {
                    code: selectedEmployee
                }
            }
        } else {
            sale = {
                date: data.date,
                payment: data.payment,
                client: {
                    person: {
                        dni: dni.dni
                    },
                },
                packageName: {
                    code: dataToBuy.packageInfo.code
                },
                employee: {
                    code: selectedEmployee
                }
            };
        }

        SalesService.createSaleFromClient(sale).then(r => {
            if (r.data) {
                setValue("payment", "");
                setValue("date", "");
                setSelectedEmployee(0);
                setLog("Success");
            } else setLog("Failed")
        }).catch(e => console.log(e));
    }

    // Función para cargar los empleados
    const loadEmployees = () => {
        EmployeeService.getAllEmployees(AES.decrypt(sessionStorage.getItem('token'), "patito").toString(enc.Utf8))
            .then(r => setDataE(r.data))
            .catch(e => console.log(e));
    }

    // Función para cargar el servicio
    const loadService = () => {
        ServiceConnection.getServiceById(id)
            .then(r => setDataToBuy(r.data))
            .catch(e => console.log(e));
    }

    // Función para cargar el paquete
    const loadPackage = () => {
        PackageService.getPackageById(id)
            .then(r => setDataToBuy(r.data))
            .catch(e => console.log(e));
    }

    // Se cargan empleados y datos del producto y para mostrar el mensaje en el componente.
    useEffect(() => {
        loadEmployees();
        console.log(dataToBuy);

        if (typeProduct === "service") { loadService(); setValue("date", new Date()); }
        else if (typeProduct === "package") { loadPackage(); setValue("date", new Date()); }

        if (log === "Success") {
                setAlertComponent(
                    <Alert severity="success" sx={{ width: "96%", mt: 2, '*': { width: "auto" } }}>
                        ¡Venta realizada con éxito! ¡Gracias por comprar en Travsky!
                    </Alert>
                );
        } else if (log === "Failed") {
            setAlertComponent(
                <Alert severity="error" sx={{ width: "96%", mt: 2, '*': { width: "auto" } }}>
                    ¡Algo salió mal! Vuelve a intentarlo.
                </Alert>
            );
        } else if (log === "Fill") {
            setAlertComponent(
                <Alert severity="error" sx={{ width: "96%", mt: 2, '*': { width: "auto" } }}>
                    ¡Debe seleccionar por lo menos un empleado!
                </Alert>
            );
        }

    }, [log]);

    // Verifica si existe un token, sino lo redirecciona a iniciar sesión
    if (sessionStorage.getItem('token')) {
        const token = AES.decrypt(sessionStorage.getItem('token'), "patito");
        const rol = jwtDecode(token.toString(enc.Utf8));

        if (rol.role == "Admin" || rol.role == "Employee" || rol.role == "User") {
            return (
                <>
                    <Header variant={1} />
                    <FormControl sx={{ width: "80%", margin: "5% 8%", background: "white", padding: 2, borderRadius: 3, boxShadow: "1px 1px 20px #333" }}>
                        <Typography variant="h5" sx={{ textAlign: "center", color: "black", padding: "1% 0" }}>Para proseguir en tu compra:</Typography>
                        <hr />
                        {/* Información del paquete o servicio */}
                        <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", border: "3px double gray", borderRadius: 2, color: "black" }}>
                            <Typography sx={{fontSize: 20, mb: 2}} align="center">Vas a comprar:</Typography>
                            <Box sx={{ width: "49%", mr: 2, mb: 1 }}>

                                <p style={{ margin: "0 2%" }}><u>Nombre del servicio/paquete:</u> <b>
                                    {(dataToBuy.packageInfo && dataToBuy.packageInfo.name) || dataToBuy.name}
                                </b></p>

                                <p style={{ margin: "0 2%" }}><u>Precio del servicio/paquete:</u>
                                    <b> ${(dataToBuy.packageInfo && dataToBuy.services.reduce((totalPrice, service) => totalPrice + service.price, 0) * 0.9) || dataToBuy.price}
                                    </b></p>

                                {(dataToBuy.services && <p style={{ margin: "0 2%" }}><u>Servicios que trae:</u></p>)
                                    || <p style={{ margin: "0 2%" }}><u>Descripción del servicio:</u> {dataToBuy.desc}</p>}

                                {dataToBuy.services && dataToBuy.services.map(s => 
                                <p key={s.idSxP} style={{ margin: "0 2%" }}>-•- {s.name}: {s.desc} | Fecha de uso: {s.date}</p>)}

                                {dataToBuy.date && <p style={{ margin: "0 2%" }}><u>Fecha de uso:</u> {dataToBuy.date}</p>}
                            </Box>
                            <Box sx={{ width: "48%", borderRadius: 2, border: "1px solid gray", padding: "1% 0 0.6% 0.5%", mb: 1 }}>
                                {(dataToBuy.services && dataToBuy.services.map(s => <img key={s.idSxP} src={s.img} style={{
                                    width: "47%", height: "200px",
                                    borderRadius: 10, border: "1px solid gray", margin: "0 1%"
                                }} />)) || <img src={dataToBuy.img} style={{width: "95%", height: "300px", borderRadius: 10, border: "1px solid gray", margin: "0 1%"}} />}
                            </Box>
                        </Box>
                        
                        {/* Formulario para hacer la venta */}
                        <Box sx={{ display: "flex", flexWrap: "wrap", margin: "2% 5%", maxWidth: "90%", justifyContent: "center" }} component="form"
                            onSubmit={handleSubmit(data => onSubmit(data))}>
                            <FormControl variant="filled" error={errors.type?.message} sx={{
                                width: "47%",
                                mr: "1%",
                                height: "56px",
                                border: "2px solid #CCC",
                                borderRadius: 2,
                                mt: 16,
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
                                <InputLabel id="demo-simple-select-filled-label">Escoge el método de pago</InputLabel>
                                <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="payment"
                                    value={paymentMethod}
                                    onChange={handleChange}
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                maxWidth: "10%"
                                            }
                                        }
                                    }}
                                >
                                    <MenuItem value={"Efectivo"}>Efectivo</MenuItem>
                                    <MenuItem value={"Tarjeta de Crédito"}>Tarjeta de Crédito</MenuItem>
                                    <MenuItem value={"Tarjeta de Dédito"}>Tarjeta de Dédito</MenuItem>
                                    <MenuItem value={"Monedero Virtual"}>Monedero Virtual</MenuItem>
                                    <MenuItem value={"Transeferencia"}>Transferencia</MenuItem>
                                </Select>
                                <FormHelperText sx={{ width: "90%" }}>{errors.type?.message}</FormHelperText>
                            </FormControl>
                            <Box sx={{ width: "47%", color: "black", ml: "2%" }}>
                                <Typography component="h2" color="black">Escoge el empleado con quién vas a querer realizar tu compra:</Typography>
                                <hr />
                                <List sx={{ border: "1px solid black", maxHeight: 350, overflowY: "scroll" }}>
                                    {dataE.map(data => (
                                        <ListItemButton
                                            key={data.code}
                                            selected={selectedEmployee === data.code}
                                            onClick={(event) => handleListEmployees(event, data.code)}
                                        >
                                            <ListItemText primary={`${data.person.firstName} ${data.person.lastName}`} />
                                        </ListItemButton>
                                    ))}
                                </List>
                            </Box>
                            <button style={{ width: "50%", margin: "3% 25% 0 25%" }} className="btnAdd" type="submit">Comprar</button>
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