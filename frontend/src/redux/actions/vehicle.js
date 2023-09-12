import axios from "axios";
import { server } from "server";

export const createVehicle = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "loadVehicleCreateRequest",
    });
    const config = { Headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      `${server}/vehicle/create-vehicle`,
      newForm,
      config
    );
    dispatch({
      type: "loadVehicleCreateSuccess",
      payload: data.vehicle,
    });
  } catch (error) {
    dispatch({
      type: "loadVehicleCreateFailed",
      payload: error.response.data.message,
    });
  }
};
