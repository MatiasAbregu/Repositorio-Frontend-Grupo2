import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { AES, enc } from "crypto-js";
import { jwtDecode } from "jwt-decode";
import { Alert, Box, FormControl, FormControlLabel, List, ListItemButton, ListItemText, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import dayjs from "dayjs";
import ServiceConnection from "../../services/ServiceConnection";
import { useParams } from "react-router-dom";
import EmployeeService from "../../services/EmployeeService";
import ClientService from "../../services/ClientService";
import PackageService from "../../services/PackageService";
import SalesService from "../../services/SalesService";

/**
 * El componente `CreateUpdateSales` permite a los administradores y empleados crear o actualizar ventas.
 * @returns {JSX.Element} Componente CreateUpdateSales.
 */
export const CreateUpdateSales = () => {

    // Esquema de validación Yup para el formulario
    const schema = yup.object().shape({
        payment: yup.string().required("Debe rellenar este campo."),
        date: yup.date().required("Debes seleccionar una fecha.").typeError("Debe ser una fecha válida."),
    });

    // Estado para almacenar mensajes de registro o actualización exitosa o fallida
    const [log, setLog] = useState("");

    // Estado para el componente de alerta
    const [alertComponent, setAlertComponent] = useState(null);

    // Obtener el ID del servicio de los parámetros de la URL
    const { id } = useParams();

    // Estado para determinar si se debe cargar la información de la solicitud
    const [requestInfo, setRequestInfo] = useState(false);

    // React Hook Form para manejar el formulario y la validación
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    // Estados para el manejo de la lógica del componente
    const [dataE, setDataE] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(0);
    const [dataC, setDataC] = useState([]);
    const [selectedClient, setSelectedClient] = useState(0);
    const [dataToBuy, setDataToBuy] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(0);
    const [typeToRequest, setTypeToRequest] = useState("service");

    // Funciones para manejar la selección de cliente, empleado y producto
    const handleListClient = (event, id) => setSelectedClient(id);
    const handleListEmployees = (event, id) => setSelectedEmployee(id);
    const handleListProduct = (event, id) => setSelectedProduct(id);
    const handleChange = (e) => setTypeToRequest(e.target.value);

    // Función para crear o actualizar una venta
    const onSubmit = (data) => {
        if (selectedEmployee === 0) return setLog("Fill");
        else if (selectedClient === 0) return setLog("Fill");
        else if (selectedProduct === 0) return setLog("Fill");
        else { setLog(""); setAlertComponent(null); }

        data.date = dayjs(data.date).format("YYYY-MM-DD");
        let sale;

        if (id) {
            if (typeToRequest == "service") {
                sale = {
                    code: id,
                    date: data.date,
                    payment: data.payment,
                    client: {
                        code: selectedClient
                    },
                    service: {
                        code: selectedProduct
                    },
                    employee: {
                        code: selectedEmployee
                    }
                };
            } else {
                sale = {
                    code: id,
                    date: data.date,
                    payment: data.payment,
                    client: {
                        code: selectedClient
                    },
                    packageName: {
                        code: selectedProduct
                    },
                    employee: {
                        code: selectedEmployee
                    }
                };
            }

            SalesService.updateSale(id, sale, AES.decrypt(sessionStorage.getItem('token'), "patito").toString(enc.Utf8)).then(r => {
                if (r) {
                    setValue("payment", "");
                    setValue("date", "");
                    setSelectedClient(0);
                    setSelectedEmployee(0);
                    setSelectedProduct(0);
                    setLog("Success");
                } else setLog("Failed")
            }).catch(e => console.log(e));
        } else {
            if (typeToRequest == "service") {
                sale = {
                    date: data.date,
                    payment: data.payment,
                    client: {
                        code: selectedClient
                    },
                    service: {
                        code: selectedProduct
                    },
                    employee: {
                        code: selectedEmployee
                    }
                };
            } else {
                sale = {
                    date: data.date,
                    payment: data.payment,
                    client: {
                        code: selectedClient
                    },
                    packageName: {
                        code: selectedProduct
                    },
                    employee: {
                        code: selectedEmployee
                    }
                };
            }

            SalesService.createSale(sale, AES.decrypt(sessionStorage.getItem('token'), "patito").toString(enc.Utf8)).then(r => {
                if (r.data) {
                    setValue("payment", "");
                    setValue("date", "");
                    setSelectedClient(0);
                    setSelectedEmployee(0);
                    setSelectedProduct(0);
                    setLog("Success");
                } else setLog("Failed")
            }).catch(e => console.log(e));
        }
    }

    // Función para cargar los empleados
    const loadEmployees = () => {
        EmployeeService.getAllEmployees(AES.decrypt(sessionStorage.getItem('token'), "patito").toString(enc.Utf8))
            .then(r => setDataE(r.data))
            .catch(e => console.log(e));
    }

    // Función para cargar los clientes
    const loadClients = () => {
        ClientService.getAllClients(AES.decrypt(sessionStorage.getItem('token'), "patito").toString(enc.Utf8))
            .then(r => setDataC(r.data))
            .catch(e => console.log(e));
    }

    // Función para cargar los servicios
    const loadServices = () => {
        ServiceConnection.getAllServicesDetailed(AES.decrypt(sessionStorage.getItem('token'), "patito").toString(enc.Utf8))
            .then(r => setDataToBuy(r.data))
            .catch(e => console.log(e));
    }

    // Función para cargar los paquetes
    const loadPackages = () => {
        PackageService.getAllPackages()
            .then(r => setDataToBuy(r.data))
            .catch(e => console.log(e));
    }

    // Efecto para mostrar alertas después de la creación o actualización exitosa o fallida y cargar clientes, empleados y servicios o paquetes
    useEffect(() => {
        loadEmployees();
        loadClients();

        if (typeToRequest === "service") { loadServices(); setSelectedProduct(1); }
        else if (typeToRequest === "package") { loadPackages(); setSelectedProduct(1); }

        if (log === "Success") {
            if (id) {
                setAlertComponent(
                    <Alert severity="success" sx={{ width: "96%", mt: 2, '*': { width: "auto" } }}>
                        ¡Venta actualizada con éxito! Ve a gestión de ventas para visualizarlo.
                    </Alert>
                );
            } else {
                setAlertComponent(
                    <Alert severity="success" sx={{ width: "96%", mt: 2, '*': { width: "auto" } }}>
                        ¡Venta creada con éxito! Ve a gestión de ventas para visualizarlo.
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
                    ¡Debe seleccionar por lo menos un empleado, un cliente y un servicio/paquete!
                </Alert>
            );
        }

        if (id && !requestInfo) {
            SalesService.getSaleById(id, AES.decrypt(sessionStorage.getItem('token'), "patito").toString(enc.Utf8)).then(r => {
                setValue("payment", r.data.payment);
                setValue("date", r.data.date);
                setSelectedClient(r.data.client.code);
                setSelectedEmployee(r.data.employee.code);

                if(r.data.service){
                    setTypeToRequest("service");
                    setSelectedProduct(r.data.service.code);
                } else {
                    setTypeToRequest("package");
                    setSelectedProduct(r.data.packageName.code);
                }
                setRequestInfo(true);
            }).catch(e => console.log(e));
        }

    }, [log, typeToRequest]);

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
                        <Typography variant="h5" sx={{ textAlign: "center", color: "black", padding: "1% 0" }}>{id ? "Actualizar venta" : "Crear venta"}</Typography>
                        <hr />
                        <Box sx={{ display: "flex", flexWrap: "wrap", margin: "2% 5%", maxWidth: "90%", justifyContent: "center" }} component="form" onSubmit={handleSubmit(data => onSubmit(data))}>
                            <TextField
                                id="payment"
                                label="Método de pago"
                                variant="filled"
                                type="text"
                                {...register("payment")}
                                InputProps={{ disableUnderline: true }}
                                InputLabelProps={{ shrink: true }}
                                error={errors.payment?.message}
                                helperText={errors.payment?.message}
                                sx={{
                                    width: "47%",
                                    mr: "1%",
                                    border: "2px solid #CCC",
                                    borderRadius: 2,
                                    height: "0"
                                }}
                            />
                            <Box sx={{ width: "47%", ml: "2%", }}>
                                <TextField
                                    id="date"
                                    type="date"
                                    variant="filled"
                                    inputProps={{ style: { paddingTop: "17px", paddingBottom: "16px" } }}
                                    {...register("date")}
                                    InputProps={{ disableUnderline: true }}
                                    error={errors.date?.message}
                                    helperText={errors.date?.message}
                                    sx={{
                                        border: "2px solid #CCC",
                                        borderRadius: 2,
                                    }}
                                />
                                <p style={{ color: "gray", fontSize: "smaller", marginLeft: 5, marginTop: 1 }}>Introduce una fecha</p>
                            </Box>
                            <Box sx={{ width: "47%", mr: "1%", color: "black", }}>
                                <Typography component="h2" color="black">Escoge el cliente al que se le realizó la venta:</Typography>
                                <hr />
                                <List sx={{ border: "1px solid black", maxHeight: 350, overflowY: "scroll" }}>
                                    {dataC.map(data => (
                                        <ListItemButton
                                            key={data.code}
                                            selected={selectedClient === data.code}
                                            onClick={(event) => handleListClient(event, data.code)}
                                        >
                                            <ListItemText primary={`${data.person.firstName} ${data.person.lastName}`} />
                                        </ListItemButton>
                                    ))}
                                </List>
                            </Box>
                            <Box sx={{ width: "47%", color: "black", ml: "2%" }}>
                                <Typography component="h2" color="black">Escoge el empleado que realizó la venta:</Typography>
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
                            <Box sx={{ color: "black", mt: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <Box sx={{ display: "flex", ml: "20%" }}>
                                    <Typography component="h2" color="black" width={"50%"} mt={1.3}>¿Se vendió un servicio o un paquete?</Typography>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        onChange={handleChange}
                                        value={typeToRequest}
                                        name="radio-buttons-group"
                                        sx={{ display: "flex", flexDirection: "row" }}
                                    >
                                        <FormControlLabel value="service" control={<Radio />} label="Servicio" sx={{ width: "25%", mr: 8 }} />
                                        <FormControlLabel value="package" control={<Radio />} label="Paquete" sx={{ width: "25%" }} />
                                    </RadioGroup>
                                </Box>
                                <List sx={{ border: "1px solid black", width: "50%", maxHeight: 350, overflowY: "scroll", mt: 3 }}>
                                    {typeToRequest === "service" ?
                                        (
                                            dataToBuy && dataToBuy.map(data =>
                                                <ListItemButton
                                                    key={data.code}
                                                    selected={selectedProduct === data.code}
                                                    onClick={(event) => handleListProduct(event, data.code)}
                                                >
                                                    <ListItemText primary={`${data.name}`} />
                                                </ListItemButton>)
                                        ) : (
                                            dataToBuy && dataToBuy.map(data =>
                                                <ListItemButton
                                                    key={data.packageInfo && data.packageInfo.code}
                                                    selected={selectedProduct === (data.packageInfo && data.packageInfo.code)}
                                                    onClick={(event) => handleListProduct(event, data.packageInfo && data.packageInfo.code)}
                                                >
                                                    <ListItemText primary={`${data.packageInfo && data.packageInfo.name}`} />
                                                </ListItemButton>)
                                        )
                                    }
                                </List>
                            </Box>
                            <button style={{ width: "50%", margin: "3% 25% 0 25%" }} className="btnAdd" type="submit">{id ? "Actualizar venta" : "Crear "}</button>
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