import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
// import IconButton from '@mui/material/IconButton';
// import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import api from "../../services/api";

import Box from "@mui/material/Box";
// import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
const Input = styled("input")({
  display: "none",
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalPhoto({ setOpen, open, car_submited }) {
  const [imagem, setImagem] = useState(""); //nova imagem
  const router = useRouter();
  const [car_from_previous_page, setCarFromPreviousPage] = useState({});
  const handleClose = () => setOpen(false);

  useEffect(() => {
    console.log(car_submited);
  }, []);

  useEffect(() => {
    console.log(imagem);
  }, []);

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    // setStatus({ formSave: true });
    const formData = new FormData();
    const headers = { "Content-Type": "application/json" }; //indicando que os dados serão enviados em JSON
    formData.append("image", imagem); //coluna 'imagem' recebe o imagem do front (useState)
    await api
      .post(
        `photos/upload?car_id=${car_submited.id}&user_id=${car_submited.userId}&photo_name=${car_submited.model}`,
        formData,
        { headers }
      )
      .then((res) => {
       toast.success('Imagem inserida com sucesso!')
        router?.push("/");
      })
      .catch((err) => {
        toast.error('Falha ao inserir imagem. Tente Novamente')
      });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="container mx-auto lg:flex justify-center sm:block  ">
            <label
              htmlFor="contained-button-file"
              className="lg:flex justify-between  sm:block mt-3 w-3/4"
            >
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/png, image/jpeg"
                onChange={(e) => setImagem(e.target.files[0])}
                className="lg:pt-20 sm: "
              />
              <div>
                {imagem ? (
                  <img
                    src={URL.createObjectURL(imagem)}
                    alt="Imagem anuncio"
                    width="400"
                    heigh="400"
                  />
                ) : (
                  "SEM IMAGEM PRÉVIA"
                )}
              </div>
            </label>
          </div>
          <div className="container mx-auto flex justify-center ">
            <Button
              onClick={handleImageSubmit}
              variant="contained"
              component="span"
              className="mt-4"
            >
              Enviar
            </Button>
          </div>
        </Box>
        {/* */}
      </Modal>
    </div>
  );
}
