import * as yup from "yup";

export const serviceValidationYup = () =>{

    const schema = yup.object().shape({
        name: yup.string().required("Debes ingresar un valor."),
        img: yup.string().required("Debes ingresar una URL."),
        destination: yup.string().required("Debes ingresar un destino"),
        date: yup.date().required("Debes seleccionar una fecha.").typeError("Debe ser una fecha válida."),
        type: yup.string().oneOf(["Hoteles", "Autos", "Aviones", "Colectivos", "Eventos", "Trenes", "Excursiones"], "Por favor selecciona uno de los tipos existentes").default("Hoteles").required('Selecciona un tipo de servicio.'),
        price: yup.number().positive("Solo números positivos.").required("Introduce un precio").typeError("Debe ser un número válido y positivo."),
        desc: yup.string().required("Debes ingresar una descripción")
    });

    return schema;
}