import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Link from "@mui/material/Link";
import { useRouter } from "next/router";
import api from "../services/api";
import PlaceholderCar from "../../public/placeholderca.png";

export default function CardCar({ car }) {
  const [arquivo, setArquivo] = React.useState();
  const router = useRouter();
  console.log(car);

  // React.useEffect(() => {
  //   api.get(`http://localhost:3333/photos/download?id=${3}&photo_name=palio`).then((res) => {
  //     setArquivo(res.data)
  //   })
  // }, [])

  // React.useEffect(() => {
  //   console.log(arquivo)
  // }, [arquivo])

  return (
    <div className="flex justify-center">
      <Card sx={{ maxWidth: 400 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            width="480"
            height="480"
            image={car.photos?.length > 0 ? car.photos[0].url : PlaceholderCar}
            alt="car"
          />

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {car.model} -{" "}
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(car.car_value)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {car.car_description}
            </Typography>
          </CardContent>
          <CardActions className="flex ">
            <button
              onClick={() => router?.push(`/car/${car.id}`)}
              className="bg-blue-400 text-white hover:text-current rounded-full py-3 px-6"
              size="small"
            >
              Detalhes
            </button>
          </CardActions>
        </CardActionArea>
      </Card>
    </div>
  );
}
