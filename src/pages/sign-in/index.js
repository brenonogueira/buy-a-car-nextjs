import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import api from "../../services/api";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import {
  useSelector,
  useDispatch,
  DefaultRootState,
  RootStateOrAny,
} from "react-redux";
import userActions from "../../store/actions/userActions";

function Copyright(props) {
  return (
    <Typography
    variant="body2"
    color="text.secondary"
    align="center"
    {...props}
  >
    {"Copyright © "}
    <Link color="inherit" href="/">
      Buy a Car Web App 
    </Link>
    {/* <Typography>Breno Nogueira Araújo</Typography> */}
    {new Date().getFullYear()}
    {"."}
  </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
 
  const handleSubmit = (event) => {
    event.preventDefault();

    api
      .post("v1/auth/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        toast.success('Seja bem-vindo(a)')
        // console.log(res.data.access_token);
        sessionStorage.setItem("access_token", res.data.access_token);
        dispatch(userActions.profile())
        dispatch(userActions.profile_cars(res.data.id))
        router?.push('/')
      })
      .catch((err) => {
        toast.error('Erro ao entrar. Verifique seus dados e tente novamente!')
      });
    }

    useEffect(() => {
     setToken(sessionStorage.getItem('access_token'))
     console.log('aa')
    }, [token])

    useEffect(() => {
      if(token) {
        router?.push('/')
      }
    }, [token])

    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              {/* <LockOutlinedIcon /> */}
            </Avatar> 
            <Typography component="h1" variant="h5">
            ENTRAR
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
             
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
               ENTRAR
              </Button>
              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link onClick={() => {router?.push('/sign-up') }} variant="body2">
                    {"Não tem conta? Inscreva-se"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    );
  };

