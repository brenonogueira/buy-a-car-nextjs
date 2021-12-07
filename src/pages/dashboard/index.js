import { useState, useEffect, useLayoutEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import { FaBars } from "react-icons/fa";
import { mainListItems } from "../../components/ListItems";
import api from "../../services/api";
// import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  useSelector,
  useDispatch,
  DefaultRootState,
  RootStateOrAny,
} from "react-redux";
import userActions from "../../store/actions/userActions";
import { useRouter } from "next/router";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import Head from "next/head";
import ModalDelete from "./ModalDelele";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const mdTheme = createTheme();

export default function Dashboard() {
  if (typeof window !== "undefined") {
    var tokenUser = sessionStorage.getItem("access_token");
  }

  const [token, setToken] = useState(null);
  const [user_data, setUserData] = useState([]);
  const [userId, setUserId] = useState();
  const [open, setOpen] = useState(true);
  const [car_id, setCarId] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  // const [token, setToken] = useState(null);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    setToken(tokenUser);
    // dispatch(userActions.profile())
    console.log("aa");
  }, [tokenUser]);

  const rd_user = useSelector((state) => state.userReducer);

  const id_user = rd_user?.index?.id;

  useEffect(() => {
    // console.log(token);
    if (tokenUser) {
      dispatch(userActions.profile());
    } else {
      router.push("/sign-in");
    }
  }, []);

  useEffect(() => {
    if (rd_user?.index?.id) {
      dispatch(userActions.profile_cars(rd_user?.index?.id));
    }
  }, [rd_user]);



  // const delete_car = (id) => {
  //   api
  //     .delete(`car/${id}`)
  //     .then((res) => {
  //       toast.success("Carro apagado com sucesso");
  //       dispatch(userActions.profile_cars(rd_user?.index?.id));
  //     })
  //     .catch((err) => {
  //       toast.error("Erro ao apagar carro. Tente novamente");
  //     });
  // };

  //   useEffect(() => {
  //   if(rd_user.index?.id) {
  //       dispatch(userActions.profile_cars(userId))
  //     }
  // }, [])

  return (
    <>
     <Head>
        <title>Buy a car! - Painel de  Controle</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {token ? (
        <ThemeProvider theme={mdTheme}>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="absolute" sx={{ display: "none" }} open={open}>
              <Toolbar
                sx={{
                  pr: "24px",
                  pt: "20px", // keep right padding when drawer closed
                }}
              >
                <IconButton
                  edge="start"
                  color="primary"
                  aria-label="open drawer"
                  onClick={toggleDrawer}
                  sx={{
                    marginRight: "36px",
                    ...(open && { display: "none" }),
                  }}
                >
                  <FaBars size={20} color="red" />
                </IconButton>
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  sx={{ flexGrow: 1 }}
                >
                  Dashboard
                </Typography>
                <IconButton color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    {/* <NotificationsIcon /> */}
                  </Badge>
                </IconButton>
              </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
              <Toolbar
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  px: [1],
                }}
              >
                <IconButton onClick={toggleDrawer}>
                  <FaBars size={20} color="blue" />
                </IconButton>
              </Toolbar>
              <Divider />
              <List>{mainListItems}</List>
              <Divider />
              {/* <List>{secondaryListItems}</List> */}
            </Drawer>
            <Box
              component="main"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                height: "100vh",
                overflow: "auto",
              }}
            >
              <Toolbar />
              <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                  {/* Chart */}
                  <Grid item xs={12} md={8} lg={12}>
                    <Paper
                    // sx={{
                    //   p: 2,
                    //   display: "flex",
                    //   flexDirection: "column",
                    //   height: 240,
                    // }}
                    >
                      <button onClick={() => {setOpenModal(true)}}>aaaa</button>
                      <TableContainer component={Paper}>
                        <Table
                          sx={{ minWidth: 400 }}
                          aria-label="customized table"
                        >
                          <TableHead>
                            <TableRow>
                              <StyledTableCell>Id</StyledTableCell>
                              <StyledTableCell>Modelo</StyledTableCell>
                              <StyledTableCell>Marca</StyledTableCell>
                              <StyledTableCell>Ano</StyledTableCell>
                              <StyledTableCell>Ações</StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rd_user.show_cars?.car.map((car) => (
                              <StyledTableRow key={car?.id}>
                                <StyledTableCell>{car.id}</StyledTableCell>
                                <StyledTableCell>{car.model}</StyledTableCell>
                                <StyledTableCell>{car?.make}</StyledTableCell>
                                <StyledTableCell>
                                  {car.model_year}
                                </StyledTableCell>
                                <StyledTableCell className="lg:flex sm:block">
                                  <button onClick={() => {
                                   setCarId(car.id); setOpenModal(true)
                                  }} className="lg: mt-2 sm: ml-0">
                                    <FaTrashAlt

                                      color="red"
                                      size={18}

                                    />
                                  </button>

                                  <button onClick={() => router?.push(`/edit-car/${car.id}`)} className="lg:ml-2 mt-2 sm: ml-0">
                                    <FaEdit
                                      color="blue"
                                      size={18}

                                    />
                                  </button>
                                </StyledTableCell>
                              </StyledTableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </Grid>
                </Grid>
                {/* <Copyright sx={{ pt: 4 }} /> */}
              </Container>
            </Box>
          </Box>
          <ModalDelete setOpenModal={setOpenModal} openModal={openModal} car_id={car_id} />
        </ThemeProvider>
      ) : (
        "SEM ACESSO"
      )}
    </>
  );
}
