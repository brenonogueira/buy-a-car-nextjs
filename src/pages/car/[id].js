import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "../../services/api";
import Image from "next/image";
import CardCarId from "../../components/CardCarId";
import placeholderCar from '../../../public/placeholderca.png'

export default function Car() {
  const [car, setCar] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      api.get(`car/${id}`).then((res) => {
        setCar(res.data);
      });
    }
  }, [id]);

  useEffect(() => {
    // console.log(car);
  }, [car]);

  return (
    <div className="container mx-auto ">
      <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4 md:grid-cols-2 ">
        <div class=" ml-auto p-4	 col-span-1 ...">
          {car ? (
            <Image
            className="rounded-lg"
              src={
                car.array_fotos?.length > 0
                  ? car.array_fotos[0].url
                  : placeholderCar
              }
              // className={styles.img}
              width="500"
              height="400"
              alt="Breno Nogueira Araújo"
            />
          ) : null}
        </div>
        <div class="p-10 mr-8	">
          <CardCarId car={car} />
        </div>
      </div>
    </div>
  );
}
