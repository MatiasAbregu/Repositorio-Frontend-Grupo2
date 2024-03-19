import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function ServiceCard({ info }) {
  return (
    <Link to={`${info.code}`} information={info}>
      <Card sx={{ maxWidth: 260 }}>
        <CardMedia sx={{ height: 190 }} src={info.img} title={info.name} component="img" />
        <CardContent sx={{ height: 80 }}>
          <Typography gutterBottom variant="h6" component="div">
            {info.name}
          </Typography>
          <Typography gutterBottom variant="caption" component="div">
            ${info.price}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            component="div"
            sx={{ height: 60, width: 170, overflow: "hidden" }}
          >
            {info.desc}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
