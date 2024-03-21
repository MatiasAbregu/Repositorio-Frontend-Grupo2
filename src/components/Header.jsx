import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import ServiceIconList from "./ServiceIconList";
import { jwtDecode } from 'jwt-decode';
import { AES, enc } from "crypto-js";

const styles = {
  boxLogoBig: { display: { xs: "none", md: "flex" }, width: 200, mt: 1 },
  logoTextBig: {
    mr: 2,
    display: { xs: "none", md: "flex" },
    fontFamily: "Protest Revolution",
    fontWeight: 700,
    letterSpacing: ".3rem",
    color: "inherit",
    textDecoration: "none",
  },
  smallRender: {
    display: { xs: "flex", md: "none" },
    alignItems: "center",
    justifyContent: "center",
    width: 200,
  },
  boxLogoSmall: {
    width: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexFlow: "row-reverse",
  },
  logoTextSmall: {
    mr: 1,
    display: { xs: "flex", md: "none" },
    flexGrow: 1,
    fontFamily: "monospace",
    fontWeight: 700,
    letterSpacing: ".1rem",
    color: "inherit",
    textDecoration: "none",
  },
  userLogoBox: {
    flexGrow: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "right",
  },
};

export default function Header({ variant }) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  let settings = [
    { name: "Registrarse", link: "/user/register" },
    { name: "Ingresar", link: "/user/login" },
  ];

  if (sessionStorage.getItem('username')) {
    settings = settings.filter(s => s.name !== "Ingresar" && s.name !== "Registrarse");

    if (sessionStorage.getItem('token')) {
      try {
        const decryptToken = AES.decrypt(sessionStorage.getItem('token'), "patito");
        const decodeToken = jwtDecode(decryptToken.toString(enc.Utf8));
        if (decodeToken.role == "Admin" || decodeToken.role == "Employee") {
          settings.push({ name: "Inicio", link: '/' })
          settings.push({ name: "Administrar datos", link: "/employee/home" })
        }
      } catch (error) { console.log(error); }
    }
    settings.push({ name: "Cerrar sesión", link: "/logout" });
  }

  if (variant == 1) {
    return (
      <>
        <AppBar position="static" sx={{ backgroundColor: "#64aad3" }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box sx={styles.boxLogoBig}>
                <img src="/travelskyLogo.png" />
              </Box>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={styles.logoTextBig}
              >
                TRAVSKY
              </Typography>

              <Box sx={styles.smallRender}>
                <Box sx={styles.boxLogoSmall}>
                  <img src="/travelskyLogo.png" />
                </Box>
              </Box>

              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={styles.logoTextSmall}
              >
                TRAVSKY
              </Typography>
              <Box sx={styles.userLogoBox}>
                <Tooltip>
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ pr: 1, width: 42, height: 42 }}
                  >
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: 5, width: 300 }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {sessionStorage.getItem('username') && (
                    <MenuItem sx={{ "&:hover": { backgroundColor: "#FFF", cursor: "default" } }}>
                      <Typography variant="body1" textAlign="center" >
                        ¡Bienvenido {sessionStorage.getItem('username')}!
                      </Typography>
                    </MenuItem>
                  )}
                  {
                    sessionStorage.getItem('username') && (<hr />)
                  }
                  {settings.map((setting) => (
                    <Link to={setting.link} key={setting.name}>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting.name}</Typography>
                      </MenuItem>
                    </Link>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <ServiceIconList></ServiceIconList>
      </>
    );
  } else if (variant == 2) {
    return (<>
      <AppBar position="static" sx={{ backgroundColor: "#64aad3" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={styles.boxLogoBig}>
              <img src="/travelskyLogo.png" />
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={styles.logoTextBig}
            >
              TRAVSKY
            </Typography>

            <Box sx={styles.smallRender}>
              <Box sx={styles.boxLogoSmall}>
                <img src="/travelskyLogo.png" />
              </Box>
            </Box>

            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={styles.logoTextSmall}
            >
              TRAVSKY
            </Typography>
            <Box sx={styles.userLogoBox}>
              <Tooltip>
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ pr: 1, width: 42, height: 42 }}
                >
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: 5, width: 300 }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {sessionStorage.getItem('username') && (
                  <MenuItem sx={{ "&:hover": { backgroundColor: "#FFF", cursor: "default" } }}>
                    <Typography variant="body1" textAlign="center" >
                      ¡Bienvenido {sessionStorage.getItem('username')}!
                    </Typography>
                  </MenuItem>
                )}
                {
                  sessionStorage.getItem('username') && (<hr />)
                }
                {settings.map((setting) => (
                  <Link to={setting.link} key={setting.name}>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting.name}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <ServiceIconList type={1}></ServiceIconList>
    </>);
  } else {
    return (
      <>
        <AppBar position="static" sx={{ backgroundColor: "#64aad3", height: 80 }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box sx={styles.boxLogoBig}>
                <img src="/travelskyLogo.png" />
              </Box>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={styles.logoTextBig}
              >
                TRAVSKY
              </Typography>

              <Box sx={styles.smallRender}>
                <Box sx={styles.boxLogoSmall}>
                  <img src="/travelskyLogo.png" />
                </Box>
              </Box>

              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={styles.logoTextSmall}
              >
                TRAVSKY
              </Typography>
              <Box sx={styles.userLogoBox}>
                <Tooltip>
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ pr: 1, width: 42, height: 42 }}
                  >
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: 5, width: 300 }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {sessionStorage.getItem('username') && (
                    <MenuItem sx={{ "&:hover": { backgroundColor: "#FFF", cursor: "default" } }}>
                      <Typography variant="body1" textAlign="center" >
                        ¡Bienvenido {sessionStorage.getItem('username')}!
                      </Typography>
                    </MenuItem>
                  )}
                  {
                    sessionStorage.getItem('username') && (<hr />)
                  }
                  {settings.map((setting) => (
                    <Link to={setting.link} key={setting.name}>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting.name}</Typography>
                      </MenuItem>
                    </Link>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </>
    );
  }
}