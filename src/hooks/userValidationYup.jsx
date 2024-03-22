import * as yup from "yup";

/**
 * Función que devuelve un esquema de validación Yup para datos de usuario.
 * @returns {yup.ObjectSchema<object>} Esquema de validación Yup para datos de usuario.
 */
const userValidationYup = () => {

  const schema = yup.object().shape({
    name: yup.string().required("Debe rellenar este campo."),
    last_name: yup.string().required("Debe rellenar este campo."),
    dni: yup.number().required("Debe rellenar este campo.").typeError("Solo números enteros."),
    phone: yup.number().required("Debe rellenar este campo.").typeError("Solo números enteros."),
    address: yup.string().required("Debe rellenar este campo."),
    nationality: yup.string().required("Debe rellenar este campo."),
    user_name: yup.string().required("Debe rellenar este campo."),
    email: yup.string().email("Debe contener un @.").required("Debe rellenar este campo."),
    password: yup.string().min(4, "Debe tener minimo 4 caracteres.").required("Debe rellenar este campo."),
    postEmployee: yup.string(),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Las contraseñas no coinciden."),
    birthdate: yup.date().required().typeError("Debe registrar una fecha."),
  });

  return schema;
};

export default userValidationYup;