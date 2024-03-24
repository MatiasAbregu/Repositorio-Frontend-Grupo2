import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Box, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import Footer from "../../components/Footer";
import { AES, enc } from "crypto-js";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import EmployeeService from "../../services/EmployeeService";

/**
 * El componente `ReadEmployees` permite a los administradores ver y gestionar los empleados.
 * @returns {JSX.Element} Componente ReadEmployees.
 */
export const ReadEmployees = () => {

    // Estado para almacenar los datos de los empleados
    const [data, setData] = useState([]);

    // Estado para almacenar los datos filtrados
    const [dataFilter, setDataFilter] = useState([]);

    // Estado para almacenar el dato a buscar en el buscador
    const [searchValue, setSearchValue] = useState('');

    // Estado para almacenar el ID del empleado seleccionado
    const [id, setId] = useState(0);

    // Estado para controlar la visualización de los empleados inactivos
    const [employeesInactive, setEmployeesInactive] = useState(false);

    // Estado para controlar la apertura y cierre del modal de advertencia
    const [open, setOpen] = useState(false);

    // Función para abrir el modal de advertencia y almacenar el ID del empleado
    const handleOpen = (id) => {
        setOpen(true);
        setId(id);
    };

    // Función para cambiar el estado del "searchValue"
    const handleChange = (event) => setSearchValue(event.target.value);

    // Función para filtrar por el valor de searchValue
    const filterService = () => setDataFilter(data.filter((employee) => employee.person.firstName.includes(searchValue)));

    // Función para cerrar el modal de advertencia
    const handleClose = () => setOpen(false);

    // Función para eliminar un empleado por ID y por una operación de las 2 permitidas.
    const deleteEmployee = (id, operation) => {
        if (operation == 1) {
            EmployeeService.deleteEmployee(id, operation, AES.decrypt(sessionStorage.getItem('token'), "patito").toString(enc.Utf8))
                .then(r => listOfEmployees())
                .catch(e => console.log(e))
                .finally(handleClose());
        } else if (operation == 2) {
            EmployeeService.deleteEmployee(id, operation, AES.decrypt(sessionStorage.getItem('token'), "patito").toString(enc.Utf8))
                .then(r => listOfEmployees())
                .catch(e => console.log(e))
                .finally(handleClose());
        }
    }

    // Función para obtener la lista de empleados
    const listOfEmployees = () => {
        EmployeeService.getAllEmployeesWithAllInfo(AES.decrypt(sessionStorage.getItem('token'), "patito").toString(enc.Utf8)).then(res => {
            setData(res.data)
        }).catch(e => console.log(e));
    }

    // Cargar la lista de empleados
    useEffect(() => {
        listOfEmployees();
    }, []);

    // Verificar si hay un token de sesión activo
    if (sessionStorage.getItem('token')) {
        const token = AES.decrypt(sessionStorage.getItem('token'), "patito");
        const rol = jwtDecode(token.toString(enc.Utf8));

        // Se desencripta y verifica si trae rol "Admin", si no, entonces se lo redirecciona a iniciar sesión
        if (rol.role == "Admin") {
            return (
                <>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            maxHeight: 500,
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4,
                            color: "black",
                            overflowY: "scroll"
                        }}>
                            <Typography id="modal-modal-title" variant="h6" component="h2" align="center" color="red">
                                ¡Ten cuidado!
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }} align="center">
                                ¡Estás a punto de hacer una acción irreversible con la cual después no hay marcha atras! <br /><br /> ¡Si deseas desactivar un empleado para poder seguir visualizando sus ventas simplemente colocale ingresos 0! <br /><br /> Tienes tres opciones:
                                <br /><br />
                                1. Cancelar esta operación
                                <br /><br />
                                2. Eliminar el empleado y sus ventas pero dejar los datos de su usuario aún activo con el rol de "usuario".
                                <br /><br />
                                3. Eliminar empleado y persona debido a un error al momento de crear un empleado.
                            </Typography>
                            <Box>
                                <button style={{ margin: "1% 0" }} className="btnWarning" onClick={handleClose}>Cancelar</button>
                                <button style={{ margin: "1% 0" }} className="btnDelete" onClick={() => deleteEmployee(id, 1)}>Eliminar empleado y sus ventas y dejarlo con rol "usuario"</button>
                                <button style={{ margin: "1% 0" }} className="btnDelete" onClick={() => deleteEmployee(id, 2)}>Eliminar empleado y sus datos debido a un error</button>
                            </Box>
                        </Box>
                    </Modal>
                    <Header variant={2} />
                    <Paper sx={{ width: '98%', overflow: 'hidden', margin: "1% 1% 6% 1%", background: "transparent", boxShadow: "none" }}>
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
                        <Box sx={{ mb: 2 }}>
                            <button className="btnAdd" onClick={() => { window.location.href = "/employee/create-employee" }} style={{ width: "40%", margin: "0 5%" }}>Agregar empleado</button>
                            <button className="btnAdd" onClick={() => { if (employeesInactive == true) setEmployeesInactive(false); else setEmployeesInactive(true) }}
                                style={{ width: "40%", margin: "0 5%" }}>
                                {employeesInactive ? "Mostrar empleados activos" : "Mostrar empleados inactivos"} </button>
                        </Box>
                        <TableContainer sx={{ maxHeight: 550 }}>
                            <Table stickyHeader sx={{ minWidth: 660 }}>
                                <TableHead style={{ position: "sticky" }}>
                                    <TableRow>
                                        <TableCell sx={{ background: "#333", color: "white", textAlign: "center" }}>Código</TableCell>
                                        <TableCell sx={{ background: "#333", color: "white", textAlign: "center" }}>DNI</TableCell>
                                        <TableCell sx={{ background: "#333", color: "white", textAlign: "center" }}>Puesto</TableCell>
                                        <TableCell sx={{ background: "#333", color: "white", textAlign: "center" }}>Ingreso</TableCell>
                                        <TableCell sx={{ background: "#333", color: "white", textAlign: "center" }}>Funcionalidades</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dataFilter && dataFilter.length > 0 ?
                                        dataFilter.map((row) => {
                                            if (employeesInactive) {
                                                if (row.income == 0) {
                                                    return (
                                                        <TableRow key={row.code}>
                                                            <TableCell align="center" sx={{ background: "#FFF", color: "black", border: "1px solid #BBB", maxWidth: 10 }}> {row.code} </TableCell>
                                                            <TableCell align="center" sx={{ background: "#FFF", color: "black", border: "1px solid #BBB", minWidth: 300 }}>
                                                                <Link to={`/employee/update-employee/${row.code}`}>{row.person.dni} (Click para modificar)</Link>
                                                            </TableCell>
                                                            <TableCell align="center" sx={{ background: "#FFF", color: "black", minWidth: 300, border: "1px solid #BBB" }}>{row.job}</TableCell>
                                                            <TableCell align="center" sx={{ background: "#FFF", color: "black", minWidth: 300, overflowX: "auto", border: "1px solid #BBB" }}>${row.income}</TableCell>
                                                            <TableCell sx={{ background: "#FFF", border: "1px solid #BBB" }}>
                                                                <button className="btnDelete" onClick={() => deleteEmployee(row.code)} style={{ margin: 0 }}>Eliminar</button>
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                }
                                            } else {
                                                if (row.income > 0) {
                                                    return (
                                                        <TableRow key={row.code}>
                                                            <TableCell align="center" sx={{ background: "#FFF", color: "black", border: "1px solid #BBB", maxWidth: 10 }}> {row.code} </TableCell>
                                                            <TableCell align="center" sx={{ background: "#FFF", color: "black", border: "1px solid #BBB", minWidth: 300 }}>
                                                                <Link to={`/employee/update-employee/${row.code}`}>{row.person.dni} (Click para modificar)</Link>
                                                            </TableCell>
                                                            <TableCell align="center" sx={{ background: "#FFF", color: "black", minWidth: 300, border: "1px solid #BBB" }}>{row.job}</TableCell>
                                                            <TableCell align="center" sx={{ background: "#FFF", color: "black", minWidth: 300, overflowX: "auto", border: "1px solid #BBB" }}>${row.income}</TableCell>
                                                            <TableCell sx={{ background: "#FFF", border: "1px solid #BBB" }}>
                                                                <button className="btnDelete" onClick={() => handleOpen(row.code)} style={{ margin: 0 }}>Eliminar</button>
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                }
                                            }
                                        }) :
                                        data.map((row) => {
                                            if (employeesInactive) {
                                                if (row.income == 0) {
                                                    return (
                                                        <TableRow key={row.code}>
                                                            <TableCell align="center" sx={{ background: "#FFF", color: "black", border: "1px solid #BBB", maxWidth: 10 }}> {row.code} </TableCell>
                                                            <TableCell align="center" sx={{ background: "#FFF", color: "black", border: "1px solid #BBB", minWidth: 300 }}>
                                                                <Link to={`/employee/update-employee/${row.code}`}>{row.person.dni} (Click para modificar)</Link>
                                                            </TableCell>
                                                            <TableCell align="center" sx={{ background: "#FFF", color: "black", minWidth: 300, border: "1px solid #BBB" }}>{row.job}</TableCell>
                                                            <TableCell align="center" sx={{ background: "#FFF", color: "black", minWidth: 300, overflowX: "auto", border: "1px solid #BBB" }}>${row.income}</TableCell>
                                                            <TableCell sx={{ background: "#FFF", border: "1px solid #BBB" }}>
                                                                <button className="btnDelete" onClick={() => deleteEmployee(row.code)} style={{ margin: 0 }}>Eliminar</button>
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                }
                                            } else {
                                                if (row.income > 0) {
                                                    return (
                                                        <TableRow key={row.code}>
                                                            <TableCell align="center" sx={{ background: "#FFF", color: "black", border: "1px solid #BBB", maxWidth: 10 }}> {row.code} </TableCell>
                                                            <TableCell align="center" sx={{ background: "#FFF", color: "black", border: "1px solid #BBB", minWidth: 300 }}>
                                                                <Link to={`/employee/update-employee/${row.code}`}>{row.person.dni} (Click para modificar)</Link>
                                                            </TableCell>
                                                            <TableCell align="center" sx={{ background: "#FFF", color: "black", minWidth: 300, border: "1px solid #BBB" }}>{row.job}</TableCell>
                                                            <TableCell align="center" sx={{ background: "#FFF", color: "black", minWidth: 300, overflowX: "auto", border: "1px solid #BBB" }}>${row.income}</TableCell>
                                                            <TableCell sx={{ background: "#FFF", border: "1px solid #BBB" }}>
                                                                <button className="btnDelete" onClick={() => handleOpen(row.code)} style={{ margin: 0 }}>Eliminar</button>
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                }
                                            }
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                    <Footer />
                </>
            );
        } else if (rol.role == "Employee") return window.location.href = "/employee/home";
        else return window.location.href = "/user/login";
    } else
        return window.location.href = "/user/login";
};