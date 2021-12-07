import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FaWhatsapp } from "react-icons/fa";

export default function CardCarId({ car }) {
  React.useEffect(() => {
    console.log(car);
  }, [car]);

  async function sendMessage() {
    var text = await `Olá, tenho interesse em seu carro!\n
    *modelo*: ${car.model}\n
    *marca*: ${car.make}\n
    *valor*: ${car.car_value} 
    *************************** \n
    Anúncio visto em Buy A Car WebApp!
    `;
    console.log(text);
    text = window.encodeURIComponent(text);
    const apiWhats = "https://api.whatsapp.com/send";
    let url = `${apiWhats}?phone=55${car.user_phone}&text=${text}`;
    window.open(url, "_blank");
  }

  return (
    <div>
      <CardContent>
        <Typography className="mb-5" variant="h5" component="div">
          {car.model} - Valor:{" "}
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(car.car_value)}
        </Typography>
        <p className="subpixel-antialiased font-sans">
          <strong>Ano:</strong> {car.model_year}
        </p>
        <p className="subpixel-antialiased font-sans">
          <strong>Ano de Fabricação:</strong> {car.manufacture_year}
        </p>
        <p className="subpixel-antialiased font-sans">
          <strong>Marca:</strong> {car.make}
        </p>
        <p className="subpixel-antialiased mt-5 font-sans ">
          <strong>Descrição:</strong> <br />
          {car.car_description}
        </p>

        <div>
          <button onClick={sendMessage} className="mt-10 flex items-center rounded-full py-2 px-5 bg-blue-400 ">
            <FaWhatsapp size={80} color="green" />
            <span className="ml-3 text-lg font-bold">FALE COM O VENDEDOR</span>
          </button>
        </div>
      </CardContent>
    </div>
  );
}
