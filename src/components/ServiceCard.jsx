import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

/**
 * Componente que representa una tarjeta de servicio o paquete.
 * @param {object} props - Propiedades del componente.
 * @param {object} props.info - Información del paquete o servicio a mostrar en la tarjeta.
 * @param {string} props.variant - Variante del paquete o servicio (puede ser un paquete o un servicio).
 * @returns {JSX.Element} Elemento JSX que representa la tarjeta de servicio.
 */
export default function ServiceCard({ info, variant }) {
  if (variant === "package") {
    return (
      <Link to={`${info.packageInfo.code}`} information={info}>
        {/* Tarjeta */}
        <Card sx={{ maxWidth: 260 }} >

          {/* Cargado de imagenes */}
          <CardContent sx={{display: "flex", flexWrap: "wrap", maxWidth: 216}}>
            {info.services.map(s => <CardMedia sx={{ height: 100, width: 108 }} src={s.img} title={s.img} component="img" />)}
          </CardContent>
          <hr />

          {/* El resto de información del paquete */}
          <CardContent sx={{ minHeight: 200 }}>
            <Typography gutterBottom variant="h6" component="div">
              {info.packageInfo.name}
            </Typography>
            <Typography gutterBottom variant="caption" component="div">
              Precio: ${info.services.reduce((totalPrice, service) => totalPrice + service.price, 0) * 0.9}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              component="div"
              sx={{ height: 80, width: 170, overflow: "hidden" }}
            >
              Servicios:
              <br />
              {info.services.map(s => <>-{s.name} <br /></>)}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    );
  } else {
    return (
      <Link to={`${info.code}`} information={info}>
        {/* Tarjeta */}
        <Card sx={{ maxWidth: 265 }}>

          {/* Imagen de la tarjeta */}
          <CardMedia sx={{ height: 190 }} src={info.img} title={info.name} component="img" />

          {/* El resto de la información de la tarjeta */}
          <CardContent sx={{ height: 200 }}>
            <Typography gutterBottom variant="h6" component="div" maxWidth={230}>
              {info.name}
            </Typography>
            <Typography gutterBottom variant="caption" component="div">
              Precio: ${info.price}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              component="div"
              sx={{ height: 80, width: 170, overflow: "hidden" }}
            >
              {info.desc}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    );
  }
}
