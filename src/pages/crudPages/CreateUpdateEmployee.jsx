import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { AES, enc } from "crypto-js";
import { jwtDecode } from "jwt-decode";
import { Alert, Box, FormControl, FormHelperText, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { employeeValidationYup } from "../../hooks/employeeValidationYup";
import dayjs from "dayjs";
import EmployeeService from "../../services/EmployeeService";
import { useParams } from "react-router-dom";

export const CreateUpdateEmployee = () => {

    const [roles, setRoles] = useState('Employee');
    const [log, setLog] = useState("");
    const [alertComponent, setAlertComponent] = useState(null);
    const { id } = useParams()
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({ resolver: yupResolver(employeeValidationYup()) });
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        setRoles(e.target.value);
        setValue("role", e.target.value, { shouldValidate: true })
    }

    const onSubmit = (data) => {
        data.birthdate = dayjs(data.birthdate).format("YYYY-MM-DD");
        let employee;

        if (id) {
            employee = {
                code: id,
                person: {
                    dni: data.dni,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    birthdate: data.birthdate,
                    address: data.address,
                    nationality: data.nationality,
                    user: {
                        username: data.username,
                        password: data.password,
                        email: data.email,
                        cellphone: data.cellphone,
                        role: data.role
                    }
                },
                job: data.job,
                income: data.income
            };

            EmployeeService.updateEmployee(employee, id, AES.decrypt(sessionStorage.getItem('token'), "patito").toString(enc.Utf8)).then(r => {
                if (r) {
                    document.getElementById("dni").value = "";
                    document.getElementById("firstName").value = "";
                    document.getElementById("lastName").value = "";
                    document.getElementById("address").value = "";
                    document.getElementById("nationality").value = "";
                    document.getElementById("username").value = "";
                    document.getElementById("password").value = "";
                    document.getElementById("email").value = "";
                    document.getElementById("cellphone").value = "";
                    setRoles('Employee');
                    document.getElementById("job").value = "";
                    document.getElementById("income").value = "";
                    setLog("Success");
                } else setLog("Failed")
            }).catch(e => console.log(e));
        } else {
            employee = {
                person: {
                    dni: data.dni,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    birthdate: data.birthdate,
                    address: data.address,
                    nationality: data.nationality,
                    user: {
                        username: data.username,
                        password: data.password,
                        email: data.email,
                        cellphone: data.cellphone,
                        role: data.role
                    }
                },
                job: data.job,
                income: data.income
            };

            EmployeeService.createEmployee(employee, AES.decrypt(sessionStorage.getItem('token'), "patito").toString(enc.Utf8)).then(r => {
                if (r.data.value) {
                    document.getElementById("dni").value = "";
                    document.getElementById("firstName").value = "";
                    document.getElementById("lastName").value = "";
                    document.getElementById("address").value = "";
                    document.getElementById("nationality").value = "";
                    document.getElementById("username").value = "";
                    document.getElementById("password").value = "";
                    document.getElementById("email").value = "";
                    document.getElementById("cellphone").value = "";
                    setRoles('Employee');
                    document.getElementById("job").value = "";
                    document.getElementById("income").value = "";
                    setLog("Success");
                } else setLog("Failed")
            }).catch(e => handleOpen());
        }
    }

    const linkUserWithEmployee = (data) => {
        handleClose();
        data.birthdate = dayjs(data.birthdate).format("YYYY-MM-DD");
        let employee;

        employee = {
            person: {
                user: {
                    role: data.role
                }
            },
            job: data.job,
            income: data.income
        };

        EmployeeService.createEmployeeAndUpdateUser(employee, data.dni, AES.decrypt(sessionStorage.getItem('token'), "patito").toString(enc.Utf8)).then(r => {
            console.log(r);
            if (r) {
                document.getElementById("dni").value = "";
                document.getElementById("firstName").value = "";
                document.getElementById("lastName").value = "";
                document.getElementById("address").value = "";
                document.getElementById("nationality").value = "";
                document.getElementById("username").value = "";
                document.getElementById("password").value = "";
                document.getElementById("email").value = "";
                document.getElementById("cellphone").value = "";
                setRoles('Employee');
                document.getElementById("job").value = "";
                document.getElementById("income").value = "";
                setLog("Success");
                
            } else setLog("Failed")
        }).catch(e => console.log(e));
    }

    useEffect(() => {
        if (log === "Success") {
            if (id) {
                setAlertComponent(
                    <Alert severity="success" sx={{ width: "96%", mt: 2, '*': { width: "auto" } }}>
                        ¡Empleado actualizado con éxito! Ve a gestión de empleados para visualizarlo.
                    </Alert>
                );
            } else {
                setAlertComponent(
                    <Alert severity="success" sx={{ width: "96%", mt: 2, '*': { width: "auto" } }}>
                        ¡Empleado creado con éxito! Ve a gestión de empleados para visualizarlo.
                    </Alert>
                );
            }
        } else if (log === "Failed") {
            setAlertComponent(
                <Alert severity="error" sx={{ width: "96%", mt: 2, '*': { width: "auto" } }}>
                    ¡Algo salió mal! Vuelve a intentarlo.
                </Alert>
            );
        }

        if (id) {
            EmployeeService.getEmployeeById(id, AES.decrypt(sessionStorage.getItem('token'), "patito").toString(enc.Utf8)).then(r => {
                document.getElementById("dni").value = r.data.person.dni;
                setValue("dni", r.data.person.dni);
                document.getElementById("firstName").value = r.data.person.firstName;
                setValue("firstName", r.data.person.firstName);
                document.getElementById("lastName").value = r.data.person.lastName;
                setValue("lastName", r.data.person.lastName);
                document.getElementById("birthdate").value = r.data.person.birthdate;
                setValue("birthdate", r.data.person.birthdate);
                document.getElementById("address").value = r.data.person.address;
                setValue("address", r.data.person.address);
                document.getElementById("nationality").value = r.data.person.nationality;
                setValue("nationality", r.data.person.nationality);
                document.getElementById("username").value = r.data.person.user.username;
                setValue("username", r.data.person.user.username);
                document.getElementById("password").value = r.data.person.user.password;
                setValue("password", r.data.person.user.password);
                document.getElementById("email").value = r.data.person.user.email;
                setValue("email", r.data.person.user.email);
                document.getElementById("cellphone").value = r.data.person.user.cellphone;
                setValue("cellphone", r.data.person.user.cellphone);
                setRoles(r.data.person.user.role);
                setValue("role", r.data.person.user.role);
                document.getElementById("job").value = r.data.job;
                setValue("job", r.data.job);
                document.getElementById("income").value = r.data.income;
                setValue("income", r.data.income);
            }).catch(e => console.log(e));
        }
    }, [log]);

    if (sessionStorage.getItem('token')) {
        const token = AES.decrypt(sessionStorage.getItem('token'), "patito");
        const rol = jwtDecode(token.toString(enc.Utf8));

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
                                ¡Ese DNI ya existe!
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }} align="center">
                                ¿Deseas que ese registro se convierta en {getValues("role") == "Admin" ? "Administrador" : "Empleado"}?
                            </Typography>
                            <Box>
                                <button style={{ margin: "1% 0" }} className="btnWarning" onClick={handleClose}>Cancelar</button>
                                <button style={{ margin: "1% 0", width: "100%" }} className="btnAdd" onClick={handleSubmit(data => linkUserWithEmployee(data))}>Confirmar</button>
                            </Box>
                        </Box>
                    </Modal>
                    <Header variant={2} />
                    <FormControl sx={{ width: "80%", margin: "5% 8%", background: "white", padding: 2, borderRadius: 3, boxShadow: "1px 1px 20px #333" }}>
                        <Alert severity="warning" sx={{ width: "96%", mt: 2, mb: 1, '*': { width: "auto" } }}>
                            ¡Atención! Ten cuidado al momento de ingresar el DNI, dado que no se podrá modificar en un futuro. Para modificarlo tendrá que rehacer el empleado desde 0 eliminando su registro.
                        </Alert>
                        <Typography variant="h5" sx={{ textAlign: "center", color: "black", padding: "1% 0" }}>{id ? "Actualizar Empleado" : "Crear Empleado"}</Typography>
                        <hr />
                        <Box sx={{ display: "flex", flexWrap: "wrap", margin: "2% 5%", maxWidth: "90%", justifyContent: "center" }} component="form" onSubmit={handleSubmit(data => onSubmit(data))}>
                            <Typography variant="h6" sx={{ textAlign: "center", color: "black", borderBottom: "1px solid black", width: "50%", margin: "0 25% 5% 25%" }}>Datos de la persona</Typography>
                            <TextField
                                id="dni"
                                label="DNI de la persona"
                                variant="filled"
                                type="text"
                                InputProps={{ disableUnderline: true }}
                                disabled={id ? true : false}
                                {...register("dni")}
                                error={errors.dni?.message}
                                helperText={errors.dni?.message}
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
                                {...register("firstName")}
                                InputProps={{ disableUnderline: true }}
                                error={errors.firstName?.message}
                                helperText={errors.firstName?.message}
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
                                {...register("lastName")}
                                InputProps={{ disableUnderline: true }}
                                error={errors.lastName?.message}
                                helperText={errors.lastName?.message}
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
                                    {...register("birthdate")}
                                    InputProps={{ disableUnderline: true }}
                                    error={errors.birthdate?.message}
                                    helperText={errors.birthdate?.message}
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
                                {...register("address")}
                                InputProps={{ disableUnderline: true }}
                                error={errors.address?.message}
                                helperText={errors.address?.message}
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
                                {...register("nationality")}
                                InputProps={{ disableUnderline: true }}
                                error={errors.nationality?.message}
                                helperText={errors.nationality?.message}
                                sx={{
                                    width: "47%",
                                    mt: "1%",
                                    height: "0",
                                    border: "2px solid #CCC",
                                    borderRadius: 2,
                                }}
                            />
                            <Typography variant="h6" sx={{ textAlign: "center", color: "black", borderBottom: "1px solid black", width: "50%", margin: "5% 25%" }}>Datos del usuario</Typography>
                            <TextField
                                id="username"
                                label="Nombre de usuario"
                                variant="filled"
                                type="text"
                                {...register("username")}
                                InputProps={{ disableUnderline: true }}
                                error={errors.username?.message}
                                helperText={errors.username?.message}
                                sx={{
                                    width: "47%",
                                    mr: "1%",
                                    border: "2px solid #CCC",
                                    borderRadius: 2,
                                }}
                            />
                            <TextField
                                id="password"
                                label="Contraseña"
                                type="text"
                                variant="filled"
                                {...register("password")}
                                InputProps={{ disableUnderline: true }}
                                error={errors.password?.message}
                                helperText={errors.password?.message}
                                sx={{
                                    width: "47%",
                                    height: "0",
                                    ml: "2%",
                                    border: "2px solid #CCC",
                                    borderRadius: 2,
                                }}
                            />
                            <TextField
                                id="email"
                                label="Email"
                                type="text"
                                variant="filled"
                                {...register("email")}
                                InputProps={{ disableUnderline: true }}
                                error={errors.email?.message}
                                helperText={errors.email?.message}
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
                                {...register("cellphone")}
                                InputProps={{ disableUnderline: true }}
                                error={errors.cellphone?.message}
                                helperText={errors.cellphone?.message}
                                sx={{
                                    width: "47%",
                                    ml: "2%",
                                    mt: "3%",
                                    height: "0",
                                    border: "2px solid #CCC",
                                    borderRadius: 2,
                                }}
                            />
                            <FormControl variant="filled" error={errors.type?.message} sx={{
                                width: "47%",
                                mr: "3%",
                                height: "56px",
                                mt: "3%",
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
                                <InputLabel id="demo-simple-select-filled-label">Rol del usuario</InputLabel>
                                <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="role"
                                    value={roles}
                                    onChange={handleChange}
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                maxWidth: "10%"
                                            }
                                        }
                                    }}
                                >
                                    <MenuItem value={"Employee"}>Empleado</MenuItem>
                                    <MenuItem value={"Admin"}>Administrador</MenuItem>
                                </Select>
                                <FormHelperText sx={{ width: "90%" }}>{errors.type?.message}</FormHelperText>
                            </FormControl>
                            <Typography variant="h6" sx={{ textAlign: "center", color: "black", borderBottom: "1px solid black", width: "50%", margin: "5% 25%" }}>Datos acerca del empleado</Typography>
                            <TextField
                                id="job"
                                label="Puesto"
                                variant="filled"
                                type="text"
                                {...register("job")}
                                InputProps={{ disableUnderline: true }}
                                error={errors.job?.message}
                                helperText={errors.job?.message}
                                sx={{
                                    width: "47%",
                                    mr: "1%",
                                    border: "2px solid #CCC",
                                    borderRadius: 2,
                                }}
                            />
                            <TextField
                                id="income"
                                label="Ingresos"
                                type="text"
                                variant="filled"
                                {...register("income")}
                                InputProps={{ disableUnderline: true }}
                                error={errors.income?.message}
                                helperText={errors.income?.message}
                                sx={{
                                    width: "47%",
                                    height: "0",
                                    ml: "2%",
                                    border: "2px solid #CCC",
                                    borderRadius: 2,
                                }}
                            />
                            <button style={{ width: "50%", margin: "5% 25% 0 25%" }} className="btnAdd" type="submit">{id ? "Actualizar empleado" : "Crear empleado"}</button>
                        </Box>
                        {alertComponent}
                    </FormControl>
                    <Footer />
                </>
            );
        } else return window.location.href = "/employee/home";
    } else
        return window.location.href = "/user/login";
}