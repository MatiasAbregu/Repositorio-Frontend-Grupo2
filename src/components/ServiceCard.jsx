import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function ServiceCard({ info, variant }) {
  if (variant === "package") {
    return (
      <Link to={`${info.packageInfo.code}`} information={info}>
        <Card sx={{ maxWidth: 260 }}>
          <CardContent sx={{display: "flex", flexWrap: "wrap", maxWidth: 216}}>
            {info.services.map(s => <CardMedia sx={{ height: 100, width: 108 }} src={s.img} title={s.img} component="img" />)}
          </CardContent>
          <hr />
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
        <Card sx={{ maxWidth: 265 }}>
          <CardMedia sx={{ height: 190 }} src={info.img} title={info.name} component="img" />
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
