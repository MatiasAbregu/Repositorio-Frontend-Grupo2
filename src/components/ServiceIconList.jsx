import { Box, Grid } from "@mui/material";
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import DirectionsTransitFilledIcon from "@mui/icons-material/DirectionsTransitFilled";
import FestivalIcon from "@mui/icons-material/Festival";
import HikingIcon from "@mui/icons-material/Hiking";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ContactsIcon from '@mui/icons-material/Contacts';

import { Link } from "react-router-dom";
DirectionsCarIcon;

const ServiceIconList = ({ type }) => {
  const styles = {
    link: {
      textDecoration: "none",
      textAlign: "center",
      color: "#EAE4FA",
    },
    icon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  if (type == 1) {
    return (
      <>
        <Grid
          container
          spacing={1}
          sx={{
            p: 1,
            pl: { xs: 3, md: 20, lg: 30 },
            pr: { xs: 3, md: 20, lg: 30 },
            backgroundColor: "#64aad3",
            borderBottom: 3,
            borderBlockColor: "#EAE4FA",
          }}
          columns={5}
        >
          <Grid item xs={1}>
            <Box sx={styles.icon}>
              <Link style={styles.link} to="/employee/services">
                <ManageAccountsIcon></ManageAccountsIcon>
                <p style={{ margin: 0, fontSize: "smaller" }}>Servicios</p>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={1}>
            <Box sx={styles.icon}>
              <Link style={styles.link} to="/employee/employees">
                <AssignmentIndIcon></AssignmentIndIcon>
                <p style={{ margin: 0, fontSize: "smaller" }}>Empleados</p>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={1}>
            <Box sx={styles.icon}>
              <Link style={styles.link} to="/employee/packages">
                <CardGiftcardIcon></CardGiftcardIcon>
                <p style={{ margin: 0, fontSize: "smaller" }}>Paquetes</p>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={1}>
            <Box sx={styles.icon}>
              <Link style={styles.link} to="/employee/sales">
                <MonetizationOnIcon></MonetizationOnIcon>
                <p style={{ margin: 0, fontSize: "smaller" }}>Ventas</p>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={1}>
            <Box sx={styles.icon}>
              <Link style={styles.link} to="/employee/clients">
                <ContactsIcon></ContactsIcon>
                <p style={{ margin: 0, fontSize: "smaller" }}>Clientes</p>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  } else {
    return (
      <>
        <Grid
          container
          spacing={1}
          sx={{
            p: 1,
            pl: { xs: 3, md: 10, lg: 20 },
            pr: { xs: 3, md: 10, lg: 20 },
            backgroundColor: "#64aad3",
            borderBottom: 3,
            borderBlockColor: "#EAE4FA",
          }}
          columns={8}
        >
          <Grid item xs={1}>
            <Box sx={styles.icon}>
              <Link style={styles.link} to="/service/hotels">
                <LocalHotelIcon></LocalHotelIcon>
                <p style={{ margin: 0, fontSize: "smaller" }}>Hoteles</p>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={1}>
            <Box sx={styles.icon}>
              <Link style={styles.link} to="/service/car-rent">
                <DirectionsCarIcon></DirectionsCarIcon>
                <p style={{ margin: 0, fontSize: "smaller" }}>Autos</p>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={1}>
            <Box sx={styles.icon}>
              <Link style={styles.link} to="/service/plane-tickets">
                <AirplanemodeActiveIcon></AirplanemodeActiveIcon>
                <p style={{ margin: 0, fontSize: "smaller" }}>Vuelos</p>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={1}>
            <Box sx={styles.icon}>
              <Link style={styles.link} to="/service/bus-tickets">
                <DirectionsBusIcon></DirectionsBusIcon>
                <p style={{ margin: 0, fontSize: "smaller" }}>Colectivos</p>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={1}>
            <Box sx={styles.icon}>
              <Link style={styles.link} to="/service/events-tickets">
                <FestivalIcon></FestivalIcon>
                <p style={{ margin: 0, fontSize: "smaller" }}>Eventos</p>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={1}>
            <Box sx={styles.icon}>
              <Link style={styles.link} to="/service/train-tickets">
                <DirectionsTransitFilledIcon></DirectionsTransitFilledIcon>
                <p style={{ margin: 0, fontSize: "smaller" }}>Trenes</p>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={1}>
            <Box sx={styles.icon}>
              <Link style={styles.link} to="/service/excursion">
                <HikingIcon></HikingIcon>
                <p style={{ margin: 0, fontSize: "smaller" }}>Excursiones</p>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={1}>
            <Box sx={styles.icon}>
              <Link style={styles.link} to="/packages">
                <CardGiftcardIcon></CardGiftcardIcon>
                <p style={{ margin: 0, fontSize: "smaller" }}>Paquetes</p>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  }
};

export default ServiceIconList;
