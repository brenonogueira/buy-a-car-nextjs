import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import api from "../../services/api";
import Photos from "./ModalPhoto";
import ModalPhoto from "./ModalPhoto";
import {
  useSelector,
  useDispatch,
  DefaultRootState,
  RootStateOrAny,
} from "react-redux";
import Head from "next/head";
import { toast } from "react-toastify";

export default function NewCar() {
  const router = useRouter();
  const [model, setModel] = useState("");
  const [model_year, setModelYear] = useState("");
  const [manufacture_year, setManufactureYear] = useState("");
  const [make, setMake] = useState("");
  const [car_value, setCarValue] = useState("");
  const [description, setDescription] = useState("");
  const [user_id, setUserId] = useState(1);
  const [token, setToken] = useState(null);
  const [car_submited, setCarSubmited] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const rd_user = useSelector((state) => state.userReducer);


  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .post("car", {
        model: model,
        model_year: model_year,
        manufacture_year: manufacture_year,
        make: make,
        car_value: +car_value,
        car_description: description,
        userId: rd_user?.index?.id,
      })
      .then((res) => {
        setCarSubmited(res.data);
        // alert('Carro adicionado')
        setOpen(true)
      })
      .catch((err) => {
        toast.error('Erro ao inserir anúncio. Tente novamente')
      });
  };

  useEffect(() => {
    setToken(sessionStorage.getItem("access_token"));
    // console.log("aa");
  }, [token]);

  //  useEffect(() => {
  //    console.log(token)
  //   if(token) {
  //     router.push('new-car')
  //   } else {
  //     router?.push('/sign-in')
  //   }
  // }, [])

  return (
    <>
      <Head>
        <title>Buy a car! - Inserir Anúncio</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {token ? (
        <div className="container mx-auto flex justify-center  ">
          <div className="lg:block sm: mt-4	 box-border p-5 border w-3/4	">
            <h1 className="font-sans text-xl font-light text-center	mb-3 m-auto ..">
              Novo Anúncio
            </h1>
            {/* <TextField
              fullWidth
              required
              id="outlined-required"
              label="Modelo"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            /> */}

            <input
              className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600"
              id="username"
              type="text"
              placeholder="Modelo"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />

            <div className="sm:block lg:flex">

              <input
                className="mt-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600"
                id="username"
                type="text"
                placeholder="Ano do Modelo"
                value={model_year}
                onChange={(e) => setModelYear(e.target.value)}
              />

              {/* <TextField
                // className="mt-4 lg:mr-2"s
                sx={{ mt: 2 }}
                required
                fullWidth
                id="outlined-required"
                label="Ano do Modelo"
                value={model_year}
                onChange={(e) => setModelYear(e.target.value)}
              /> */}
              {/* <TextField
                sx={{ mt: 2,  , ml: 2}}
                required
                fullWidth
                id="outlined-required"
                label="Ano de Fabricação"
                value={manufacture_year}
                onChange={(e) => setManufactureYear(e.target.value)}
              /> */}
              <input
                className="mt-4 lg:ml-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600"
                type="text"
                placeholder="Ano de Fabricação"
                value={manufacture_year}
                onChange={(e) => setManufactureYear(e.target.value)}
              />
            </div>

            <input
              className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600"
              type="text"
              placeholder="Marca"
              value={make}
              onChange={(e) => setMake(e.target.value)}
            />

            {/* <TextField
              sx={{ mt: 2 }}
              fullWidth
              required
              id="outlined-required"
              label="Marca"
              value={make}
              onChange={(e) => setMake(e.target.value)}
            /> */}

            <input
              className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600"
              type="text"
              placeholder="Valor: 200000"
              value={car_value}
              onChange={(e) => setCarValue(e.target.value)}
            />

            {/* <TextField
              sx={{ mt: 2 }}
              fullWidth
              required
              id="outlined-required"
              label="Valor"
              value={car_value}
              onChange={(e) => setCarValue(e.target.value)}
            /> */}

            <textarea
              className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600"
              type="textfield"
              rows={4}
              placeholder="Descrição do seu carro"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {/* 
            <TextField
              sx={{ mt: 2 }}
              id="filled-multiline-static"
              label="Descrição"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            /> */}
            <div className="flex">
              <Button
                onClick={handleSubmit}
                fullWidth
                sx={{ m: 2 }}
                variant="contained"
              >
                Cadastrar
              </Button>
            </div>
          </div>
          <ModalPhoto setOpen={setOpen} open={open} car_submited={car_submited} />
        </div>
      ) : (
        <div style={{ height: "100vh" }} className=" flex justify-center">
          <div className="flex items-center	">
            <div className="" >
              <h1 style={{textAlign: 'center'}}>VOCÊ PRECISA ESTAR AUTENTICADO(A) PARA CADASTRAR UM CARRO</h1>
              <br />
              <br />
              <div style={{ textAlign: "center" }}>
                <button
                  onClick={() => router?.push("/sign-in")}
                  variant="contained"
                  className="ml-4  bg-blue-400 hover:bg-blue-700 py-3 px-6"
                  size="small"
                >
                  ENTRAR
                </button>
                <button
                  className="ml-4 bg-blue-400 hover:bg-blue-700 py-3 px-6"
                  size="small"
                  onClick={() => router?.push("/sign-up")}
                  variant="contained"
                >
                  CRIAR CONTA
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
