import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import api from '../../services/api';
import { toast } from 'react-toastify';
import {
  useSelector,
  useDispatch,
  DefaultRootState,
  RootStateOrAny,
} from "react-redux";
import userActions from "../../store/actions/userActions";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalDelete({setOpenModal, openModal, car_id}) {
  const dispatch = useDispatch();
  const handleClose = () => setOpenModal(false);
  const rd_user = useSelector((state) => state.userReducer);
  const delete_car = () => {
    api
      .delete(`car/${car_id}`)
      .then((res) => {
        toast.success("Carro apagado com sucesso");
        dispatch(userActions.profile_cars(rd_user?.index?.id));
        handleClose()
      })
      .catch((err) => {
        toast.error("Erro ao apagar carro. Tente novamente");
      });
  };

  return (
    <div>
   
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <h1 style={{textAlign: 'center', marginBottom: '20px'}}>TEM CERTEZA QUE DESEJA DELETAR ESTE ANÚNCIO?</h1>
          <div style={{ textAlign: "center" }}>
                <button
                  onClick={() => {delete_car(car_id); }}
                  variant="contained"
                  className="ml-4 text-white bg-red-400 hover:bg-red-700 py-3 px-6"
                  size="small"
                >
                  DELETAR
                </button>
                <button
                  className="ml-4 bg-blue-400 hover:bg-blue-700 py-3 px-6"
                  size="small"
                  onClick={handleClose}
                  variant="contained"
                >
                 CANCELAR
                </button>
                </div>
        </Box>
      </Modal>
    </div>
  );
}