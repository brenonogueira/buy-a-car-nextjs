import Head from "next/head";
import { useEffect, useState } from "react";
import CardCar from "../components/CardCar";
import api from "../services/api";
import {
  useSelector,
  useDispatch,
  DefaultRootState,
  RootStateOrAny,
} from "react-redux";
import userActions from "../store/actions/userActions";

export default function Home() {
  const [data_car, setData_car] = useState([]);
  const dispatch = useDispatch();
  const rd_user = useSelector((state) => state.userReducer);

  if (typeof window !== "undefined") {
    var tokenUser = sessionStorage.getItem("access_token");
  }

  // console.log(tokenUser)

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     var tokenUser = sessionStorage.getItem("access_token");
  //   }
  //   console.log(rd_user?.index);
  //   dispatch(userActions.profile(tokenUser))
  // }, []);

  useEffect(() => {
    api.get("car").then((res) => {
      setData_car(res.data);
    });
   
  }, []);

  return (
    <div className="container mx-auto ">
      <div className=" p-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
        {data_car
          ? data_car.map((car) => {
              return <CardCar car={car} />;
            })
          : null}
      </div>
    </div>
  );
}
