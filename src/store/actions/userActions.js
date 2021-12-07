import api from "../../services/api";

const profile = () => {
 
    var tokenUser = sessionStorage.getItem("access_token");
  

  return async (dispatch) => {
    await api.get("v1/auth/profile", { headers: { Authorization: `Bearer ${tokenUser}` }}).then((res) => {// console.log(res.data)
      dispatch(add_data_profile(res.data));
    });
  };
};

const profile_cars = (id) => {
  return async (dispatch) => {
   await  api.get(`user/${id}`).then((res) => {// console.log(res.data)
      dispatch(add_data_profile_cars(res.data));
    });
  };
}

const add_data_profile = (values) => { return { type: "PROFILE", values }};
const add_data_profile_cars = (values) => { return { type: "PROFILE_CARS", values }};

export default {
  profile,
  add_data_profile,
  profile_cars,
  add_data_profile_cars
};
