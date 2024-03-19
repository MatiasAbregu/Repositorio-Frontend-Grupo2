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
          columns={4}
        >
          <Grid item xs={1}>
            <Box sx={styles.icon}>
              <Link style={styles.link} to="/employee/services">
                <ManageAccountsIcon></ManageAccountsIcon>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={1}>
            <Box sx={styles.icon}>
              <Link style={styles.link} to="/employee/employees">
                <AssignmentIndIcon></AssignmentIndIcon>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={1}>
            <Box sx={styles.icon}>
              <Link style={styles.link} to="/employee/packages">
                <CardGiftcardIcon></CardGiftcardIcon>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={1}>
            <Box sx={styles.icon}>
              <Link style={styles.link} to="/employee/sales">
                <MonetizationOnIcon></MonetizationOnIcon>
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
            pl: { xs: 3, md: 20, lg: 30 },
            pr: { xs: 3, md: 20, lg: 30 },
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
              </Link>
            </Box>
          </Grid>
          <Grid item xs={1}>
            <Box sx={styles.icon}>
              <Link style={styles.link} to="/service/car-rent">
                <DirectionsCarIcon></DirectionsCarIcon>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={1}>
            <Box sx={styles.icon}>
              <Link style={styles.link} to="/service/plane-tickets">
                <AirplanemodeActiveIcon></AirplanemodeActiveIcon>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={1}>
            <Box sx={styles.icon}>
              <Link style={styles.link} to="/service/bus-tickets">
                <DirectionsBusIcon></DirectionsBusIcon>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={1}>
            <Box sx={styles.icon}>
              <Link style={styles.link} to="/service/events-tickets">
                <FestivalIcon></FestivalIcon>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={1}>
            <Box sx={styles.icon}>
              <Link style={styles.link} to="/service/train-tickets">
                <DirectionsTransitFilledIcon></DirectionsTransitFilledIcon>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={1}>
            <Box sx={styles.icon}>
              <Link style={styles.link} to="/service/excursion">
                <HikingIcon></HikingIcon>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={1}>
            <Box sx={styles.icon}>
              <Link style={styles.link} to="/packages">
                <CardGiftcardIcon></CardGiftcardIcon>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  }
};

export default ServiceIconList;
