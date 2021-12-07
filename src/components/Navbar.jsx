import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
// import MenuIcon from '@mui/icons-material/Menu';
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/router";
import {
  useSelector,
  useDispatch,
  DefaultRootState,
  RootStateOrAny,
} from "react-redux";
import userActions from "../store/actions/userActions";
import { FaCarSide, FaChevronDown } from 'react-icons/fa'

const Navbar = () => {
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const dispatch = useDispatch();
  const rd_user = useSelector((state) => state.userReducer);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // // if (typeof window !== "undefined") {
  // //   var tokenUser = sessionStorage.getItem("access_token");
  // // }

  // console.log(tokenUser);
  // if (typeof window !== "undefined") {
  //   var tokenUser = sessionStorage.getItem("access_token");
  // }

  // React.useEffect(() => {
  //   dispatch(userActions.profile(tokenUser));
  // }, []);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Button
            onClick={() => router?.push("/")}
            variant="h6"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            className="font-bold"
          >

            <span className="text-3xl">Buy a Car</span>
            <FaCarSide size={40} className="ml-1" color="black" />
          </Button>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              {/* <MenuIcon /> */}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {/* <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Início</Typography>
                <Typography textAlign="center">Início</Typography>
              </MenuItem> */}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            onClick={() => router?.push("/")}
          >
            BUY A CAR!
            <FaCarSide size={40} className="ml-1" color="black" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex", justifyContent: 'flex-end' } }}>
            <button
              onClick={() => router?.push("/new-car")}
              // sx={{ my: 2, color: "white", display: "block" }}
              className="ml-4 bg-blue-800 hover:bg-blue-700 py-3 px-6"
              size="small"
            >
              Anuncie seu Carro
            </button>
            <button
              onClick={() => router?.push("/dashboard")}
              // sx={{ my: 2, color: "white", display: "block" }}
              className="ml-4 block bg-blue-400 hover:bg-blue-700 py-3 px-6"
              size="small"
            >
              Dashboard
            </button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }}}>
                <FaChevronDown />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
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
              <MenuItem onClick={handleCloseNavMenu}>
                <Button
                  onClick={() => router?.push("/dashboard")}
                  sx={{ my: 2, color: "dark", display: "block" }}
                // className="ml-4 bg-blue-400 hover:bg-blue-700"
                >
                  Dashboard
                </Button>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Button
                  onClick={() => router?.push("/new-car")}
                  sx={{ my: 2, color: "dark", display: "block" }}
                // className="ml-4 bg-blue-800 hover:bg-blue-700 opacity"
                >
                  Anuncie seu Carro
                </Button>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
