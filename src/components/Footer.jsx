import * as React from "react";
import Grid from "@mui/material/Grid";
import MailIcon from "@mui/icons-material/Mail";
import {
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Instagram, WhatsApp } from "@mui/icons-material";


export default function Footer() {
  return (
    <Grid container component="footer" sx={{backgroundColor:"#ddabab"}}>
      <Grid item sm={12} md={6}>
        <List>
          <ListItemButton alignItems="center">
            <MailIcon></MailIcon>
            <ListItemText primary="Sent mail" />
          </ListItemButton>
          <ListItemButton alignItems="center">
            <Instagram></Instagram>
            <ListItemText primary="Instagram" />
          </ListItemButton>
          <ListItemButton alignItems="center">
            <WhatsApp></WhatsApp>
            <ListItemText primary="WhatsApp"/>
          </ListItemButton>
        </List>
      </Grid>
      <Grid item sm={12} md={6}>
      <List>
          <ListItemButton alignItems="center">
            <MailIcon></MailIcon>
            <ListItemText primary="Contacto" />
          </ListItemButton>
          <ListItemButton alignItems="center">
            <Instagram></Instagram>
            <ListItemText primary="mail" />
          </ListItemButton>
          <ListItemButton alignItems="center">
            <WhatsApp></WhatsApp>
            <ListItemText primary="instagram"/>
          </ListItemButton>
        </List>
        
      </Grid>
    </Grid>
  );
}
