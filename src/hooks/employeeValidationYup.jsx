import * as yup from "yup";

export const employeeValidationYup = () => {

    const schema = yup.object().shape({
        dni: yup.number().positive("Solo números positivos.").required("Debe ingresar un valor.").typeError("Solo números enteros."),
        firstName: yup.string().required("Debe rellenar este campo."),
        lastName: yup.string().required("Debe rellenar este campo."),
        birthdate: yup.date().required("Debes seleccionar una fecha.").typeError("Debe ser una fecha válida."),
        address: yup.string().required("Debe rellenar este campo."),
        nationality: yup.string().required("Debe rellenar este campo."),
        username: yup.string().required("Debe rellenar este campo."),
        password: yup.string().min(4, "Debe tener minimo 4 caracteres.").required("Debe rellenar este campo."),
        email: yup.string().email("Debe contener un @.").required("Debe rellenar este campo."),
        cellphone: yup.number().positive("Solo números positivos").required("Debe rellenar este campo.").typeError("Solo números enteros."),
        role: yup.string().oneOf(["Employee", "Admin"], "Por favor selecciona uno de los tipos existentes.").default("Employee").required('Selecciona un rol.'),
        job: yup.string().required("Debe rellenar este campo."),
        income:  yup.number().integer("Debe ser un número entero.").min(0, "Debe ser un número positivo o 0").required("Introduce un precio").typeError("Debe ser un número válido y positivo."),
    });

    return schema;
}