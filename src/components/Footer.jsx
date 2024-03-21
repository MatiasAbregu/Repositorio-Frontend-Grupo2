import * as React from "react";
import Grid from "@mui/material/Grid";
import MailIcon from "@mui/icons-material/Mail";
import {
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Instagram, WhatsApp } from "@mui/icons-material";

export default function Footer() {
  return (
    <Grid container component="footer" sx={{backgroundColor:"#4ea365", display: "flex", flexDirection: "row", flexWrap: "nowrap", alignItems: "center"}}>
      <Grid item sm={12} md={6} sx={{width: "100%", mt: 2, ml: 3}}>
        <Typography component={"p"}>¡Siguenos en nuestras redes!</Typography>
        <List>
          <ListItemButton alignItems="center" sx={{width: "80%"}}>
            <MailIcon></MailIcon>
            <ListItemText primary="¡Contactanos vía mail!" />
          </ListItemButton>
          <ListItemButton alignItems="center" sx={{width: "80%"}}>
            <Instagram></Instagram>
            <ListItemText primary="¡Siguenos en nuestro instagram!" />
          </ListItemButton>
          <ListItemButton alignItems="center" sx={{width: "80%"}}>
            <WhatsApp></WhatsApp>
            <ListItemText primary="¡Escribenos en Whatsapp!"/>
          </ListItemButton>
        </List>
      </Grid>  
      <Typography component={"h1"} fontSize={20} mt={1} width={"80%"} fontFamily={"Protest Revolution"}>© Derechos reservados a Hackacode y al grupo participante N°2</Typography>
    </Grid>
  );
}
